package org.testimonials.cms.testimonial.dtos.dtosFull;

import java.util.UUID;

public record ListTestimonialsDTO(
        UUID id,
        ListTestimonialDTO testimonial,
        ListVisitorDTO visitor,
        ListMediaDTO media
    ) {
}
