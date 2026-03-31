package org.testimonials.cms.testimonial.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.testimonial.dtos.EditTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.service.ITestimonialService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/testimonials")
public class TestimonialController {
    private final ITestimonialService ITestimonialService;

    @PostMapping("/register")
    public ResponseEntity<TestimonialResponseDTO> createTestimonial(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal, @RequestBody @Valid TestimonialRequestDTO testimonialRequestDTO) {
        TestimonialResponseDTO testimonialResponseDTO = ITestimonialService.createTestimonial(customUserPrincipal, testimonialRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(testimonialResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<TestimonialResponseDTO>> listAllTestimonials() {
        List<TestimonialResponseDTO> testimonialResponseDTO = ITestimonialService.listAllTestimonials();

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialResponseDTO> listTestimonial(@PathVariable UUID id) {
        TestimonialResponseDTO testimonialResponseDTO = ITestimonialService.listTestimonial(id);

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonialResponseDTO> updateTestimonial(@PathVariable UUID id, @RequestBody @Valid EditTestimonialRequestDTO editTestimonialRequestDTO) {
        TestimonialResponseDTO testimonialResponseDTO = ITestimonialService.updateTestimonial(id, editTestimonialRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable UUID id) {
        ITestimonialService.deleteTestimonial(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
