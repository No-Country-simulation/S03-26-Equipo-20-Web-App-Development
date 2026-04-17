package org.testimonials.cms.review.service;

import org.testimonials.cms.review.dtos.EditReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewResponseDTO;
import org.testimonials.cms.security.model.CustomUserPrincipal;

import java.util.List;
import java.util.UUID;

public interface IReviewService {
    ReviewResponseDTO createReview(CustomUserPrincipal customUserPrincipal, ReviewRequestDTO reviewRequestDTO);
    List<ReviewResponseDTO> listAllReviews();
    ReviewResponseDTO listReview(UUID idReview);
    ReviewResponseDTO updateReview(UUID idReview, EditReviewRequestDTO editReviewRequestDTO);
    void deleteReview(UUID idReview);
}
