package org.testimonials.cms.review.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.review.dtos.EditReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewResponseDTO;
import org.testimonials.cms.review.service.IReviewService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final IReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(@RequestBody @Valid ReviewRequestDTO reviewRequestDTO) {
        ReviewResponseDTO reviewResponseDTO = reviewService.createReview(reviewRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(reviewResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> listAllReviews() {
        List<ReviewResponseDTO> reviewResponseDTO = reviewService.listAllReviews();

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> listReview(@PathVariable UUID id) {
        ReviewResponseDTO reviewResponseDTO = reviewService.listReview(id);

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> updateReview(@PathVariable UUID id, @RequestBody @Valid EditReviewRequestDTO editReviewRequestDTO) {
        ReviewResponseDTO reviewResponseDTO = reviewService.updateReview(id, editReviewRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable UUID id) {
        reviewService.deleteReview(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
