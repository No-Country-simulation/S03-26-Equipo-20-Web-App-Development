package org.testimonials.cms.organization.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record OrganizationRequestDTO(
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
        String password
    ) {
}
