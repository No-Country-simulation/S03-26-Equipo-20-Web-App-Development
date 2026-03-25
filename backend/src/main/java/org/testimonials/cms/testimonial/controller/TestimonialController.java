package org.testimonials.cms.testimonial.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.service.TestimonialService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/testimonials")
public class TestimonialController {
    private final TestimonialService testimonialService;

    @PostMapping
    public ResponseEntity<TestimonialResponseDTO> createTestimonial(@RequestBody @Valid TestimonialRequestDTO testimonialRequestDTO) {
        TestimonialResponseDTO testimonialResponseDTO = testimonialService.createTestimonial(testimonialRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(testimonialResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<TestimonialResponseDTO>> listAllTestimonials() {
        List<TestimonialResponseDTO> testimonialResponseDTO = testimonialService.listAllTestimonials();

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialResponseDTO> listTestimonial(@PathVariable UUID id) {
        TestimonialResponseDTO testimonialResponseDTO = testimonialService.listTestimonial(id);

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonialResponseDTO> updateTestimonial(@PathVariable UUID id, @RequestBody @Valid TestimonialRequestDTO testimonialRequestDTO) {
        TestimonialResponseDTO testimonialResponseDTO = testimonialService.updateTestimonial(id, testimonialRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable UUID id) {
        testimonialService.deleteTestimonial(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
