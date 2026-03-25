package org.testimonials.cms.testimonial.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.testimonial.dtos.EditTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.exceptions.TestimonialNotFound;
import org.testimonials.cms.testimonial.mapper.TestimonialMapper;
import org.testimonials.cms.testimonial.model.Testimonial;
import org.testimonials.cms.testimonial.model.TestimonialStatus;
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
        testimonial.setStatus(TestimonialStatus.PENDING);
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
    public TestimonialResponseDTO updateTestimonial(UUID id, EditTestimonialRequestDTO editTestimonialRequestDTO) {
        Optional<Testimonial> testimonialFound = testimonialRepository.findById(id);

        if (testimonialFound.isEmpty()) throw TestimonialNotFound.of(id);

        Testimonial testimonialNotModified = testimonialRepository.getReferenceById(id);

        if (editTestimonialRequestDTO.title() != null) testimonialNotModified.setTitle(editTestimonialRequestDTO.title());
        if (editTestimonialRequestDTO.content() != null) testimonialNotModified.setContent(editTestimonialRequestDTO.content());
        if (editTestimonialRequestDTO.visitorName() != null) testimonialNotModified.setVisitorName(editTestimonialRequestDTO.visitorName());
        if (editTestimonialRequestDTO.status() != null) testimonialNotModified.setStatus(editTestimonialRequestDTO.status());

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
