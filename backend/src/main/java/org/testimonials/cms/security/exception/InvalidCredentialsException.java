package org.testimonials.cms.security.exception;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }

    public static InvalidCredentialsException of() {
        return new InvalidCredentialsException("Invalid email or password");
    }
}
