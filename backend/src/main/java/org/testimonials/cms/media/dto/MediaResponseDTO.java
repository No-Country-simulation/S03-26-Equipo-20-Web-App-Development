package org.testimonials.cms.media.dto;

import org.testimonials.cms.media.enums.MediaProvider;
import org.testimonials.cms.media.enums.MediaType;
import org.testimonials.cms.media.model.Media;

import java.time.LocalDateTime;
import java.util.UUID;

public record MediaResponseDTO(
        UUID id,
        UUID testimonialId,
        UUID organizationId,
        MediaType type,
        MediaProvider provider,
        String url,
        String publicId,
        String thumbnailUrl,
        Integer duration,
        LocalDateTime createdAt
) {
    public MediaResponseDTO(Media media) {
        this(
                media.getId(),
                media.getTestimonial() != null ? media.getTestimonial().getId() : null,
                media.getOrganizationId(),
                media.getType(),
                media.getProvider(),
                media.getUrl(),
                media.getPublicId(),
                media.getThumbnailUrl(),
                media.getDuration(),
                media.getCreatedAt()
        );
    }
}
