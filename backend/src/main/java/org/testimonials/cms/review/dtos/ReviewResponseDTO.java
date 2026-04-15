package org.testimonials.cms.review.dtos;

import org.testimonials.cms.review.model.Review;
import org.testimonials.cms.review.model.ReviewStatus;

import java.util.UUID;

public record ReviewResponseDTO(
        UUID id,
        ReviewStatus status,
        String comment,
        UUID testimonial,
        UUID reviewer
    ) {
    public ReviewResponseDTO(Review review) {
        this(review.getId(), review.getStatus(), review.getComment(),
                review.getTestimonial().getId(), review.getReviewer().getId());
    }
}
