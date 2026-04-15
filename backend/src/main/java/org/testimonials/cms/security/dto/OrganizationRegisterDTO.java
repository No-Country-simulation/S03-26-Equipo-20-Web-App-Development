package org.testimonials.cms.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record OrganizationRegisterDTO(
        @NotBlank
        String name,
        @NotBlank
        String logo,
        @NotBlank
        String username,
        @NotBlank
        @Email
        String email,
        @NotBlank
        String password,
        @NotBlank
        String repeatPassword
) {
}
