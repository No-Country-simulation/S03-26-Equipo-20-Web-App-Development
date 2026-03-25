package org.testimonials.cms.testimonial.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.exceptions.TestimonialNotFound;
import org.testimonials.cms.testimonial.mapper.TestimonialMapper;
import org.testimonials.cms.testimonial.model.Testimonial;
import org.testimonials.cms.testimonial.repository.TestimonialRepository;
import org.testimonials.cms.testimonial.service.TestimonialService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TestimonialServiceImpl implements TestimonialService {
    private final TestimonialRepository testimonialRepository;

    private final TestimonialMapper testimonialMapper;

    @Override
    @Transactional
    public TestimonialResponseDTO createTestimonial(TestimonialRequestDTO testimonialRequestDTO) {
        Testimonial testimonial = testimonialMapper.toTestimonial(testimonialRequestDTO);
        Testimonial newTestimonial = testimonialRepository.save(testimonial);
        return testimonialMapper.toTestimonialDTO(newTestimonial);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestimonialResponseDTO> listAllTestimonials() {
        return testimonialMapper.toTestimonialListDTOs(testimonialRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public TestimonialResponseDTO listTestimonial(UUID id) {
        Optional<Testimonial> testimonialFound = testimonialRepository.findById(id);

        if (testimonialFound.isEmpty()) throw TestimonialNotFound.of(id);

        return testimonialMapper.toTestimonialDTO(testimonialRepository.getReferenceById(id));
    }

    @Override
    @Transactional
    public TestimonialResponseDTO updateTestimonial(UUID id, TestimonialRequestDTO testimonialRequestDTO) {
        Optional<Testimonial> testimonialFound = testimonialRepository.findById(id);

        if (testimonialFound.isEmpty()) throw TestimonialNotFound.of(id);

        Testimonial testimonialNotModified = testimonialRepository.getReferenceById(id);

        if (testimonialRequestDTO.title() != null) testimonialNotModified.setTitle(testimonialRequestDTO.title());
        if (testimonialRequestDTO.content() != null) testimonialNotModified.setContent(testimonialRequestDTO.content());
        if (testimonialRequestDTO.visitorName() != null) testimonialNotModified.setVisitorName(testimonialRequestDTO.visitorName());
        if (testimonialRequestDTO.status() != null) testimonialNotModified.setStatus(testimonialRequestDTO.status());

        Testimonial testimonialModified = testimonialRepository.save(testimonialNotModified);

        return testimonialMapper.toTestimonialDTO(testimonialModified);
    }

    @Override
    @Transactional
    public void deleteTestimonial(UUID id) {
        Optional<Testimonial> testimonialFound = testimonialRepository.findById(id);

        if (testimonialFound.isEmpty()) throw TestimonialNotFound.of(id);

        testimonialRepository.deleteById(id);
    }
}
