package org.testimonials.cms.review.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.review.dtos.EditReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewResponseDTO;
import org.testimonials.cms.review.service.IReviewService;
import org.testimonials.cms.security.model.CustomUserPrincipal;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final IReviewService reviewService;

    @PostMapping("/register")
    public ResponseEntity<ReviewResponseDTO> createReview(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal, @RequestBody @Valid ReviewRequestDTO reviewRequestDTO) {
        ReviewResponseDTO reviewResponseDTO = reviewService.createReview(customUserPrincipal, reviewRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(reviewResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> listAllReviews() {
        List<ReviewResponseDTO> reviewResponseDTO = reviewService.listAllReviews();

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @GetMapping("/{idReview}")
    public ResponseEntity<ReviewResponseDTO> listReview(@PathVariable UUID idReview) {
        ReviewResponseDTO reviewResponseDTO = reviewService.listReview(idReview);

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @PutMapping("/{idReview}")
    public ResponseEntity<ReviewResponseDTO> updateReview(@PathVariable UUID idReview, @RequestBody @Valid EditReviewRequestDTO editReviewRequestDTO) {
        ReviewResponseDTO reviewResponseDTO = reviewService.updateReview(idReview, editReviewRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @DeleteMapping("/{idReview}")
    public ResponseEntity<Void> deleteReview(@PathVariable UUID idReview) {
        reviewService.deleteReview(idReview);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
