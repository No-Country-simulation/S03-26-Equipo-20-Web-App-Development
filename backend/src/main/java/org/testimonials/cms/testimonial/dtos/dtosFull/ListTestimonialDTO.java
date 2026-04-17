package org.testimonials.cms.testimonial.dtos.dtosFull;

import org.testimonials.cms.testimonial.model.TestimonialStatus;

import java.time.LocalDateTime;

public record ListTestimonialDTO(
        String title,
        String content,
        TestimonialStatus status,
        LocalDateTime createdAt
    ) {
}
