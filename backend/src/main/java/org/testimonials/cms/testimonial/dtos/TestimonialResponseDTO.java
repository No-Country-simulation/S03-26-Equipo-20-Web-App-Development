package org.testimonials.cms.testimonial.dtos;

import org.testimonials.cms.testimonial.model.Testimonial;
import org.testimonials.cms.testimonial.model.TestimonialStatus;

import java.util.UUID;

public record TestimonialResponseDTO(
        UUID id,
        String title,
        String content,
        String visitorName,
        TestimonialStatus status,
        String approvedBy
    ) {
    public TestimonialResponseDTO(Testimonial testimonial) {
        this(testimonial.getId(), testimonial.getTitle(), testimonial.getContent(), testimonial.getVisitorName(),
                testimonial.getStatus(), testimonial.getApprovedBy());
    }
}
