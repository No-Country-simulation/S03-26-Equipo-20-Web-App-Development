package org.testimonials.cms.review.dtos;

import jakarta.validation.constraints.NotBlank;

public record EditReviewRequestDTO(
        @NotBlank
        String comment
    ) {
}
