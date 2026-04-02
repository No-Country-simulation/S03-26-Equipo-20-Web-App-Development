package org.testimonials.cms.testimonial.service;

import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.EditTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ITestimonialService {
    CreateTestimonialResponseDTO createTestimonial(CustomUserPrincipal customUserPrincipal,
                                                   CreateTestimonialRequestDTO createTestimonialRequestDTO);
    List<TestimonialResponseDTO> listAllTestimonials();
    TestimonialResponseDTO listTestimonial(UUID idTestimonial);
    TestimonialResponseDTO updateTestimonial(UUID idTestimonial, EditTestimonialRequestDTO editTestimonialRequestDTO);
    void deleteTestimonial(UUID idTestimonial);
}
