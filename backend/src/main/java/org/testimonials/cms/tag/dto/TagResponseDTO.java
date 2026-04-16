package org.testimonials.cms.tag.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record TagResponseDTO(
        UUID id,
        String name,
        long usageCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
