package org.testimonials.cms.testimonial.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialResponseDTO;
import org.testimonials.cms.testimonial.model.Testimonial;
import org.testimonials.cms.visitor.mapper.VisitorMapper;
import org.testimonials.cms.visitor.model.Visitor;

import java.util.List;

@Mapper(componentModel = "spring", uses = {VisitorMapper.class})
public interface TestimonialMapper {
    Testimonial toTestimonial(TestimonialRequestDTO dto);

    @Mapping(target = "testimonial", source = "testimonial")
    @Mapping(target = "visitor", source = "visitor")
    CreateTestimonialResponseDTO toCreateTestimonialDTO(Testimonial testimonial, Visitor visitor);

    TestimonialResponseDTO toTestimonialDTO(Testimonial testimonial);

    List<TestimonialResponseDTO> toTestimonialListDTOs(List<Testimonial> testimonials);
}
