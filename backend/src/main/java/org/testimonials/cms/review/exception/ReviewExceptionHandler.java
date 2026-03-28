package org.testimonials.cms.review.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.time.LocalDateTime;

@Order(4)
@RestControllerAdvice
public class ReviewExceptionHandler {
    @ExceptionHandler(ReviewNotFound.class)
    ProblemDetail handleReviewNotFoundException(ReviewNotFound e, HttpServletRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("Review not found");
        problemDetail.setType(URI.create("http://localhost:8080/errors/review-not-found"));
        problemDetail.setInstance(URI.create(request.getRequestURI()));
        problemDetail.setProperty("errorCategory", "Repository");
        problemDetail.setProperty("errorCode", "REVIEW_NOT_FOUND");
        problemDetail.setProperty("timestamp", LocalDateTime.now());
        return problemDetail;
    }

    @ExceptionHandler(UserNotFound.class)
    ProblemDetail handleUserNotFoundException(UserNotFound e, HttpServletRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("User not found");
        problemDetail.setType(URI.create("http://localhost:8080/errors/user-not-found"));
        problemDetail.setInstance(URI.create(request.getRequestURI()));
        problemDetail.setProperty("errorCategory", "Repository");
        problemDetail.setProperty("errorCode", "USER_NOT_FOUND");
        problemDetail.setProperty("timestamp", LocalDateTime.now());
        return problemDetail;
    }
}
