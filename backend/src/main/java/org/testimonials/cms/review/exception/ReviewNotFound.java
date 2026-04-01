package org.testimonials.cms.review.exception;

import java.util.UUID;

public class ReviewNotFound extends RuntimeException {
    public ReviewNotFound(UUID id) {
        super("Review not found with id: " + id);
    }

    public static ReviewNotFound of(UUID id) {
        return new ReviewNotFound(id);
    }
}
