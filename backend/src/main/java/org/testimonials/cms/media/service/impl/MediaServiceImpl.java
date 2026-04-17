package org.testimonials.cms.media.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.cloudinary.dto.CloudinaryUploadResponseDTO;
import org.testimonials.cms.cloudinary.service.CloudinaryService;
import org.testimonials.cms.media.dto.MediaRequestDTO;
import org.testimonials.cms.media.dto.MediaResponseDTO;
import org.testimonials.cms.media.enums.MediaProvider;
import org.testimonials.cms.media.enums.MediaType;
import org.testimonials.cms.media.exception.MediaNotFound;
import org.testimonials.cms.media.mapper.MediaMapper;
import org.testimonials.cms.media.model.Media;
import org.testimonials.cms.media.repository.IMediaRepository;
import org.testimonials.cms.media.service.IMediaService;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.testimonial.repository.ITestimonialRepository;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaServiceImpl implements IMediaService {
    private final IMediaRepository mediaRepository;
    private final MediaMapper mediaMapper;
    private final CloudinaryService cloudinaryService;
    private final ITestimonialRepository testimonialRepository;

    @Override
    @Transactional
    public MediaResponseDTO createMedia(CustomUserPrincipal customUserPrincipal, MediaRequestDTO mediaRequestDTO) {

        Media media = mediaMapper.toMedia(mediaRequestDTO);
        media.setProvider(MediaProvider.CLOUDINARY);
        media.setType(MediaType.IMAGE);
        media.setOrganizationId(customUserPrincipal.organizationId());

        Media newMedia = mediaRepository.save(media);
        return mediaMapper.toMediaDTO(newMedia);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MediaResponseDTO> listAllMedias() {
        return mediaMapper.toMediaDTO(mediaRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public MediaResponseDTO listMedia(UUID idMedia) {
        return mediaRepository.findById(idMedia)
                .map(mediaMapper::toMediaDTO)
                .orElseThrow(() -> MediaNotFound.of(idMedia));
    }

    @Override
    @Transactional
    public MediaResponseDTO updateMedia(UUID idMedia, MediaRequestDTO mediaRequestDTO) {
        Media media = mediaRepository.findById(idMedia)
                .orElseThrow(() -> MediaNotFound.of(idMedia));


        if (mediaRequestDTO.getYoutubeUrl() != null && mediaRequestDTO.getYoutubeUrl().isEmpty()) {
            try {
                if (media.getPublicId() != null) {
                    cloudinaryService.deleteFile(media.getPublicId());
                }

                CloudinaryUploadResponseDTO response = cloudinaryService.uploadImage(mediaRequestDTO.getImageFile());

                media.setUrl(response.secureUrl());
                media.setPublicId(response.publicId());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Media updatedMedia = mediaRepository.save(media);
        return mediaMapper.toMediaDTO(updatedMedia);
    }

    @Override
    @Transactional
    public void deleteMedia(UUID idMedia) {
        Media media = mediaRepository.findById(idMedia)
                .orElseThrow(() -> MediaNotFound.of(idMedia));

        if (media.getProvider() == MediaProvider.CLOUDINARY && media.getPublicId() != null) {
            try {
                cloudinaryService.deleteFile(media.getPublicId());
            } catch (IOException e) {
                throw new RuntimeException("Error al eliminar el archivo de Cloudinary: " + idMedia);
            }
        }

        mediaRepository.deleteById(idMedia);
    }
}
