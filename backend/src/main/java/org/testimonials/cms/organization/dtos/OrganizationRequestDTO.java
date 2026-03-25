package org.testimonials.cms.organization.dtos;

import jakarta.validation.constraints.NotBlank;

public record OrganizationRequestDTO(
        @NotBlank
        String name,
        @NotBlank
        String logo
    ) {
}
