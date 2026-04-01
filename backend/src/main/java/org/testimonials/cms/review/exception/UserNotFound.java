package org.testimonials.cms.review.exception;

import java.util.UUID;

public class UserNotFound extends RuntimeException {
    public UserNotFound(UUID id) {super("User not found with id: " + id);}

    public static UserNotFound of(UUID id) {
        return new UserNotFound(id);
    }
}
