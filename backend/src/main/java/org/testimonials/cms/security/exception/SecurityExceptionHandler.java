package org.testimonials.cms.security.exception;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;

@Order(1)
@RestControllerAdvice
public class SecurityExceptionHandler {
    @ExceptionHandler(InvalidCredentialsException.class)
    ProblemDetail handleInvalidCredentialsException(InvalidCredentialsException e) {
        e.printStackTrace();
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.getMessage());
        problemDetail.setTitle("Invalid credentials");
        problemDetail.setType(URI.create("/errors/invalid-credentials"));
        problemDetail.setProperty("errorCategory", "Authentication");
        return problemDetail;
    }

    @ExceptionHandler(BadCredentialsException.class)
    ProblemDetail handleBadCredentialsException(BadCredentialsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.getMessage());
        problemDetail.setTitle("Authentication failed");
        problemDetail.setType(URI.create("/errors/bad-credentials"));
        problemDetail.setProperty("errorCategory", "Authentication");
        return problemDetail;
    }
}
