package org.testimonials.cms.tag.dto;

import org.testimonials.cms.tag.model.Tag;

import java.time.LocalDateTime;
import java.util.UUID;

public record TagResponseDTO(
        UUID id,
        String name,
        UUID organizationId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public TagResponseDTO(Tag tag) {
        this(tag.getId(), tag.getName(), tag.getOrganizationId(), tag.getCreatedAt(), tag.getUpdatedAt());
    }
}
