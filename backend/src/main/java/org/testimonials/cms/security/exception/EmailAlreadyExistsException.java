package org.testimonials.cms.security.exception;

public class EmailAlreadyExistsException extends RuntimeException {
    private EmailAlreadyExistsException(String message) {
        super(message);
    }

    public static EmailAlreadyExistsException of(String email) {
        return new EmailAlreadyExistsException("Email already exists: " + email);
    }
}
