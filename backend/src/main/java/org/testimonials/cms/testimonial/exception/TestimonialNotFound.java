package org.testimonials.cms.testimonial.exception;

import java.util.UUID;

public class TestimonialNotFound extends RuntimeException {
    public TestimonialNotFound(UUID id) {
        super("Testimonial not found with id: " + id);
    }

    public static TestimonialNotFound of(UUID id) {
        return new TestimonialNotFound(id);
    }
}
