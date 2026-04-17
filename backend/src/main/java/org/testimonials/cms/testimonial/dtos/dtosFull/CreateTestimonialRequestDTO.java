package org.testimonials.cms.testimonial.dtos.dtosFull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.testimonials.cms.media.dto.MediaRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTestimonialRequestDTO {
    private TestimonialRequestDTO testimonial;
    private VisitorRequestDTO visitor;
    private MediaRequestDTO media;
    private String shareCode;
}
