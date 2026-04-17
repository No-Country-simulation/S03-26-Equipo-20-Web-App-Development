package org.testimonials.cms.testimonial.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.testimonial.dtos.EditTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.ListTestimonialsDTO;

import java.util.List;
import java.util.UUID;

public interface ITestimonialService {
    CreateTestimonialResponseDTO createTestimonial(CustomUserPrincipal customUserPrincipal,
                                                   CreateTestimonialRequestDTO createTestimonialRequestDTO);
    List<TestimonialResponseDTO> listAllTestimonials();
    Page<ListTestimonialsDTO> getAllTestimonials(Pageable pageable);
    TestimonialResponseDTO listTestimonial(UUID idTestimonial);
    TestimonialResponseDTO updateTestimonial(UUID idTestimonial, EditTestimonialRequestDTO editTestimonialRequestDTO);
    void deleteTestimonial(UUID idTestimonial);
}
