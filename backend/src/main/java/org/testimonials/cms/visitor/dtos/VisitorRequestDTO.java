package org.testimonials.cms.visitor.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record VisitorRequestDTO(
        @NotBlank(message = "Name is required")
        String name,
        @Email
        @NotBlank(message = "email is required")
        String email
    ) {
}
