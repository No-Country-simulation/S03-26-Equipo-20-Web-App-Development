package org.testimonials.cms.testimonial.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;

@RestControllerAdvice
public class TestimonialExceptionHandler {
    @ExceptionHandler(TestimonialNotFound.class)
    ProblemDetail handleTestimonialNotFoundException(TestimonialNotFound e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("Testimonial not found");
        problemDetail.setType(URI.create("/errors/testimonial-not-found"));
        problemDetail.setProperty("errorCategory", "Repository");
        return problemDetail;
    }
}
