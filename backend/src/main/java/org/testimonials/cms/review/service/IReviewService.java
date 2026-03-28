package org.testimonials.cms.review.service;

import org.testimonials.cms.review.dtos.EditReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewResponseDTO;

import java.util.List;
import java.util.UUID;

public interface IReviewService {
    ReviewResponseDTO createReview(ReviewRequestDTO reviewRequestDTO);
    List<ReviewResponseDTO> listAllReviews();
    ReviewResponseDTO listReview(UUID id);
    ReviewResponseDTO updateReview(UUID id, EditReviewRequestDTO editReviewRequestDTO);
    void deleteReview(UUID id);
}
