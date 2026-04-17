package org.testimonials.cms.testimonial.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.testimonials.cms.cloudinary.dto.CloudinaryUploadResponseDTO;
import org.testimonials.cms.cloudinary.service.CloudinaryService;
import org.testimonials.cms.media.enums.MediaProvider;
import org.testimonials.cms.media.enums.MediaType;
import org.testimonials.cms.media.mapper.MediaMapper;
import org.testimonials.cms.media.model.Media;
import org.testimonials.cms.media.repository.IMediaRepository;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.product.model.Product;
import org.testimonials.cms.product.repository.IProductRepository;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.testimonial.dtos.EditTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.ListTestimonialsDTO;
import org.testimonials.cms.testimonial.exception.TestimonialNotFound;
import org.testimonials.cms.testimonial.mapper.TestimonialMapper;
import org.testimonials.cms.testimonial.model.Testimonial;
import org.testimonials.cms.testimonial.model.TestimonialStatus;
import org.testimonials.cms.testimonial.repository.ITestimonialRepository;
import org.testimonials.cms.testimonial.service.ITestimonialService;
import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;
import org.testimonials.cms.visitor.mapper.VisitorMapper;
import org.testimonials.cms.visitor.model.Visitor;
import org.testimonials.cms.visitor.repository.IVisitorRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TestimonialServiceImpl implements ITestimonialService {
    private final ITestimonialRepository testimonialRepository;

    private final IVisitorRepository visitorRepository;

    private final IMediaRepository mediaRepository;

    private final TestimonialMapper testimonialMapper;

    private final VisitorMapper visitorMapper;

    private final MediaMapper mediaMapper;

    private final CloudinaryService cloudinaryService;

    private final IProductRepository productRepository;

    @Override
    @Transactional
    public CreateTestimonialResponseDTO createTestimonial(CustomUserPrincipal customUserPrincipal,
                                                          CreateTestimonialRequestDTO createTestimonialRequestDTO) {
        Visitor visitor = visitorMapper.toVisitor(createTestimonialRequestDTO.getVisitor());
        Visitor newVisitor = visitorRepository.save(visitor);

        Testimonial testimonial = testimonialMapper.toTestimonial(createTestimonialRequestDTO.getTestimonial());
        testimonial.setStatus(TestimonialStatus.PENDING);
        testimonial.setOrganization(new Organization(customUserPrincipal.organizationId()));
        testimonial.setVisitor(newVisitor);
        Testimonial newTestimonial = testimonialRepository.save(testimonial);

        Media newMedia = createAndSaveMedia(createTestimonialRequestDTO, newTestimonial, customUserPrincipal.organizationId());

        return testimonialMapper.toCreateTestimonialDTO(newTestimonial, newVisitor, newMedia);
    }

    @Override
    @Transactional
    public CreateTestimonialResponseDTO createPublicTestimonial(CreateTestimonialRequestDTO createTestimonialRequestDTO) {
        String shareCode = createTestimonialRequestDTO.getShareCode();
        if (shareCode == null || shareCode.isBlank()) {
            throw new RuntimeException("El código del producto es requerido");
        }

        UUID organizationId = productRepository.findOrganizationIdByShareCode(shareCode)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con shareCode: " + shareCode));

        Product product = productRepository.findProductByShareCodeNative(shareCode)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Visitor visitor = createVisitor(createTestimonialRequestDTO);

        visitorRepository.insertVisitor(visitor.getName(), visitor.getEmail());
        Visitor newVisitor = visitorRepository.findByEmailNative(visitor.getEmail());

        testimonialRepository.insertTestimonial(
                createTestimonialRequestDTO.getTestimonial().getTitle(),
                createTestimonialRequestDTO.getTestimonial().getContent(),
                newVisitor.getId(),
                organizationId,
                product.getId()
        );
        Testimonial newTestimonial = testimonialRepository.findByVisitorIdNative(newVisitor.getId());

        Media newMedia = createAndSaveMediaPublic(createTestimonialRequestDTO, newTestimonial.getId(), organizationId);

        return testimonialMapper.toCreateTestimonialDTO(newTestimonial, newVisitor, newMedia);
    }

    private Visitor createVisitor(CreateTestimonialRequestDTO dto) {
        VisitorRequestDTO visitorDTO = dto.getVisitor();

        if (visitorDTO != null &&
                StringUtils.hasText(visitorDTO.getName()) &&
                StringUtils.hasText(visitorDTO.getEmail())) {
            return visitorMapper.toVisitor(visitorDTO);
        }

        String nanoId = NanoIdUtils.randomNanoId();
        Visitor anonymousVisitor = new Visitor();
        anonymousVisitor.setName("user_" + nanoId);
        anonymousVisitor.setEmail(nanoId + "@anonymous.com");
        return anonymousVisitor;
    }

    private Media createAndSaveMedia(CreateTestimonialRequestDTO dto, Testimonial testimonial, UUID organizationId) {
        if (dto.getMedia() == null) {
            return null;
        }

        Media media = new Media();
        media.setTestimonial(testimonial);
        media.setOrganizationId(organizationId);
        media.setOrganization(new Organization(organizationId));

        if (dto.getMedia().getImageFile() != null && !dto.getMedia().getImageFile().isEmpty()) {
            media.setType(MediaType.IMAGE);
            media.setProvider(MediaProvider.CLOUDINARY);
            try {
                CloudinaryUploadResponseDTO response = cloudinaryService.uploadImage(dto.getMedia().getImageFile());
                media.setUrl(response.secureUrl());
                media.setPublicId(response.publicId());
            } catch (Exception e) {
                throw new RuntimeException("Error al subir la imagen", e);
            }
        } else if (StringUtils.hasText(dto.getMedia().getYoutubeUrl())) {
            media.setType(MediaType.VIDEO);
            media.setProvider(MediaProvider.YOUTUBE);
            media.setUrl(dto.getMedia().getYoutubeUrl());
        } else {
            return null;
        }

        return mediaRepository.save(media);
    }

    private Media createAndSaveMediaPublic(CreateTestimonialRequestDTO dto, UUID testimonialId, UUID organizationId) {
        if (dto.getMedia() == null) {
            return null;
        }

        String url;
        String publicId = null;
        String type;
        String provider;

        if (dto.getMedia().getImageFile() != null && !dto.getMedia().getImageFile().isEmpty()) {
            type = "IMAGE";
            provider = "CLOUDINARY";
            try {
                CloudinaryUploadResponseDTO response = cloudinaryService.uploadImage(dto.getMedia().getImageFile());
                url = response.secureUrl();
                publicId = response.publicId();
            } catch (Exception e) {
                throw new RuntimeException("Error al subir la imagen", e);
            }
        } else if (StringUtils.hasText(dto.getMedia().getYoutubeUrl())) {
            type = "VIDEO";
            provider = "YOUTUBE";
            url = dto.getMedia().getYoutubeUrl();
        } else {
            return null;
        }

        mediaRepository.insertMedia(type, provider, url, publicId, testimonialId, organizationId);
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestimonialResponseDTO> listAllTestimonials() {
        return testimonialMapper.toTestimonialListDTOs(testimonialRepository.findAll());
    }

    @Override
    public Page<ListTestimonialsDTO> getAllTestimonials(Pageable pageable) {
        // Traemos las entidades con sus relaciones cargadas
        Page<Testimonial> testimonials = testimonialRepository.findAllWithRelationsPageable(pageable);

        // Mapeamos cada entidad al DTO que espera el frontend
        return testimonials.map(testimonialMapper::toListTestimonialsDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public ListTestimonialsDTO getAllTestimonialsById(UUID idTestimonial) {

        Optional<Testimonial> testimonialFound = testimonialRepository.findById(idTestimonial);

        if (testimonialFound.isEmpty()) throw TestimonialNotFound.of(idTestimonial);

        // Mapeamos cada entidad al DTO que espera el frontend
        return testimonialMapper.toListTestimonialDTO(testimonialRepository.getReferenceById(idTestimonial));
    }

    @Override
    @Transactional(readOnly = true)
    public TestimonialResponseDTO listTestimonial(UUID idTestimonial) {
        Optional<Testimonial> testimonialFound = testimonialRepository.findById(idTestimonial);

        if (testimonialFound.isEmpty()) throw TestimonialNotFound.of(idTestimonial);

        return testimonialMapper.toTestimonialDTO(testimonialRepository.getReferenceById(idTestimonial));
    }

    @Override
    @Transactional
    public TestimonialResponseDTO updateTestimonial(UUID idTestimonial, EditTestimonialRequestDTO editTestimonialRequestDTO) {
        Optional<Testimonial> testimonialFound = testimonialRepository.findById(idTestimonial);

        if (testimonialFound.isEmpty()) throw TestimonialNotFound.of(idTestimonial);

        Testimonial testimonialNotModified = testimonialRepository.getReferenceById(idTestimonial);

        if (editTestimonialRequestDTO.title() != null) testimonialNotModified.setTitle(editTestimonialRequestDTO.title());
        if (editTestimonialRequestDTO.content() != null) testimonialNotModified.setContent(editTestimonialRequestDTO.content());
        if (editTestimonialRequestDTO.status() != null) testimonialNotModified.setStatus(editTestimonialRequestDTO.status());

        Testimonial testimonialModified = testimonialRepository.save(testimonialNotModified);

        return testimonialMapper.toTestimonialDTO(testimonialModified);
    }

    @Override
    @Transactional
    public void deleteTestimonial(UUID idTestimonial) {
        Optional<Testimonial> testimonialFound = testimonialRepository.findById(idTestimonial);

        if (testimonialFound.isEmpty()) throw TestimonialNotFound.of(idTestimonial);

        testimonialRepository.deleteById(idTestimonial);
    }
}
