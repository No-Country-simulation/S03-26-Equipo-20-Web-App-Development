package org.testimonials.cms.security.exception;

public class SecurityInvalidJwtException extends RuntimeException {
    public SecurityInvalidJwtException(String message) {
        super(message);
    }
}
