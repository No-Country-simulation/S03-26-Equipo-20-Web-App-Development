package org.testimonials.cms.testimonial.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;
import org.testimonials.cms.media.model.Media;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.ListTestimonialsDTO;
import org.testimonials.cms.testimonial.model.Testimonial;
import org.testimonials.cms.visitor.mapper.VisitorMapper;
import org.testimonials.cms.visitor.model.Visitor;

import java.util.List;

@Mapper(componentModel = "spring", uses = {VisitorMapper.class})
public interface TestimonialMapper {
    Testimonial toTestimonial(TestimonialRequestDTO testimonialRequestDTO);

    @Mapping(target = "testimonial", source = "testimonial")
    @Mapping(target = "visitor", source = "visitor")
    @Mapping(target = "media", source = "media")
    CreateTestimonialResponseDTO toCreateTestimonialDTO(Testimonial testimonial, Visitor visitor, Media media);

    TestimonialResponseDTO toTestimonialDTO(Testimonial testimonial);

    List<TestimonialResponseDTO> toTestimonialListDTOs(List<Testimonial> testimonials);

    @Mapping(target = "id", source = "id")
    // Mapeo de campos directos a TestimonialResponseDTO
    @Mapping(target = "testimonial.title", source = "title")
    @Mapping(target = "testimonial.content", source = "content")
    @Mapping(target = "testimonial.status", source = "status")
    @Mapping(target = "testimonial.createdAt", source = "createdAt")

    // Mapeo de Visitor (Singular)
    @Mapping(target = "visitor.name", source = "visitor.name")
    @Mapping(target = "visitor.email", source = "visitor.email")

    // Mapeo de Media (Tomando el primer elemento de la lista 'medias')
    @Mapping(target = "media.url", expression = "java(testimonial.getMedias() != null && !testimonial.getMedias().isEmpty() ? testimonial.getMedias().get(0).getUrl() : null)")
    ListTestimonialsDTO toListTestimonialsDTO(Testimonial testimonial);
}
