package org.testimonials.cms.media.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.time.LocalDateTime;

@Order(11)
@RestControllerAdvice
public class MediaExceptionHandler {

    @ExceptionHandler(MediaNotFound.class)
    ProblemDetail handleMediaNotFoundException(MediaNotFound e, HttpServletRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("Media not found");
        problemDetail.setType(URI.create("http://localhost:8080/errors/media-not-found"));
        problemDetail.setInstance(URI.create(request.getRequestURI()));
        problemDetail.setProperty("errorCategory", "Repository");
        problemDetail.setProperty("errorCode", "MEDIA_NOT_FOUND");
        problemDetail.setProperty("timestamp", LocalDateTime.now());
        return problemDetail;
    }
}
