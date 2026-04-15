package org.testimonials.cms.review.exception;

import java.util.UUID;

public class ReviewAlreadyExists extends RuntimeException {
    public ReviewAlreadyExists(UUID id) {
        super("Reviewer already exists with id: " + id);
    }

    public static ReviewAlreadyExists of(UUID id) {
        return new ReviewAlreadyExists(id);
    }
}
