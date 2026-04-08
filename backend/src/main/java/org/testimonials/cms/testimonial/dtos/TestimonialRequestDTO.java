package org.testimonials.cms.testimonial.dtos;

import jakarta.validation.constraints.NotBlank;

public record TestimonialRequestDTO(
        @NotBlank
        String title,
        @NotBlank
        String content
    ) {
}
