package org.testimonials.cms.testimonial.dtos.dtosFull;

import org.testimonials.cms.media.dto.MediaResponseDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.visitor.dtos.VisitorResponseDTO;

public record CreateTestimonialResponseDTO(
        TestimonialResponseDTO testimonial,
        VisitorResponseDTO visitor,
        MediaResponseDTO media
    ) {
}
