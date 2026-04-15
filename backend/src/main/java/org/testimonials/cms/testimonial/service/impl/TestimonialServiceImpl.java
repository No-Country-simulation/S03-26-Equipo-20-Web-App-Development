package org.testimonials.cms.testimonial.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.cloudinary.dto.CloudinaryUploadResponseDTO;
import org.testimonials.cms.cloudinary.service.CloudinaryService;
import org.testimonials.cms.media.enums.MediaProvider;
import org.testimonials.cms.media.enums.MediaType;
import org.testimonials.cms.media.mapper.MediaMapper;
import org.testimonials.cms.media.model.Media;
import org.testimonials.cms.media.repository.IMediaRepository;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.testimonial.dtos.EditTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialResponseDTO;
import org.testimonials.cms.testimonial.exception.TestimonialNotFound;
import org.testimonials.cms.testimonial.mapper.TestimonialMapper;
import org.testimonials.cms.testimonial.model.Testimonial;
import org.testimonials.cms.testimonial.model.TestimonialStatus;
import org.testimonials.cms.testimonial.repository.ITestimonialRepository;
import org.testimonials.cms.testimonial.service.ITestimonialService;
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

        Media media = mediaMapper.toMedia(createTestimonialRequestDTO.getMedia());
        media.setTestimonial(newTestimonial);
        media.setOrganizationId(customUserPrincipal.organizationId());
        media.setOrganization(new Organization(customUserPrincipal.organizationId()));
        media.setType(MediaType.IMAGE);
        media.setProvider(MediaProvider.CLOUDINARY);

        if (createTestimonialRequestDTO.getMedia().getUrl() != null && !createTestimonialRequestDTO.getMedia().getUrl().isEmpty()) {
            try {
                CloudinaryUploadResponseDTO response = cloudinaryService.uploadImage(createTestimonialRequestDTO.getMedia().getUrl());

                media.setUrl(response.secureUrl());
                media.setPublicId(response.publicId());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Media newMedia = mediaRepository.save(media);

        return testimonialMapper.toCreateTestimonialDTO(newTestimonial, newVisitor, newMedia);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestimonialResponseDTO> listAllTestimonials() {
        return testimonialMapper.toTestimonialListDTOs(testimonialRepository.findAll());
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
