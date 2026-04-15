package org.testimonials.cms.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.testimonials.cms.review.model.Review;
import org.testimonials.cms.security.model.User;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.util.UUID;

public interface IReviewRepository extends JpaRepository<Review, UUID> {
    boolean existsByTestimonialAndReviewer(Testimonial testimonial, User reviewer);
}
