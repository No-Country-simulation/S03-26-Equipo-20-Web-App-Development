package org.testimonials.cms.review.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.testimonials.cms.review.model.ReviewStatus;

import java.util.UUID;

public record ReviewRequestDTO(
        @NotNull
        ReviewStatus status,
        @NotBlank
        String comment,
        @NotNull
        UUID testimonial,
        @NotNull
        UUID reviewer
        ) {
}
