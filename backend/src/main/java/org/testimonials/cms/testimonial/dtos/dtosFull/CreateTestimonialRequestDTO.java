package org.testimonials.cms.testimonial.dtos.dtosFull;

import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;

public record CreateTestimonialRequestDTO(
        TestimonialRequestDTO testimonial,
        VisitorRequestDTO visitor
    ) {
}
