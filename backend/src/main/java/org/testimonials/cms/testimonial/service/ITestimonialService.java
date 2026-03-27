package org.testimonials.cms.testimonial.service;

import org.testimonials.cms.testimonial.dtos.EditTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ITestimonialService {
    TestimonialResponseDTO createTestimonial(TestimonialRequestDTO testimonialRequestDTO);
    List<TestimonialResponseDTO> listAllTestimonials();
    TestimonialResponseDTO listTestimonial(UUID id);
    TestimonialResponseDTO updateTestimonial(UUID id, EditTestimonialRequestDTO editTestimonialRequestDTO);
    void deleteTestimonial(UUID id);
}
