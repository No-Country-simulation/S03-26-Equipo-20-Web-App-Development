package org.testimonials.cms.tag.dto;

import jakarta.validation.constraints.NotBlank;

public record TagRequestDTO(
        @NotBlank(message = "El nombre es requerido")
        String name
) {
}
