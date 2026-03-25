package org.testimonials.cms.organization.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(OrganizationNotFound.class)
    ProblemDetail handleOrganizationNotFoundException(OrganizationNotFound e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("Organization not found");
        problemDetail.setType(URI.create("/errors/organization-not-found"));
        problemDetail.setProperty("errorCategory", "Repository");
        return problemDetail;
    }
}
