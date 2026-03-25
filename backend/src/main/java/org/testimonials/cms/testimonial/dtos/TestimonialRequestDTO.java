package org.testimonials.cms.testimonial.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.testimonials.cms.testimonial.model.TestimonialStatus;

public record TestimonialRequestDTO(
        @NotBlank
        String title,
        @NotBlank
        String content,
        @NotBlank
        String visitorName,
        @NotBlank
        String approvedBy
    ) {
}
