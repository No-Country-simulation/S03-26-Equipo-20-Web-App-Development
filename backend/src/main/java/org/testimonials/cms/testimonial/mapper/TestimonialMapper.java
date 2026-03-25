package org.testimonials.cms.testimonial.mapper;

import org.mapstruct.Mapper;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestimonialMapper {
    Testimonial toTestimonial(TestimonialRequestDTO dto);

    TestimonialResponseDTO toTestimonialDTO(Testimonial testimonial);

    List<TestimonialResponseDTO> toTestimonialListDTOs(List<Testimonial> testimonials);
}
