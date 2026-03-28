package org.testimonials.cms.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.testimonials.cms.review.model.Review;

import java.util.UUID;

public interface IReviewRepository extends JpaRepository<Review, UUID> {
}
