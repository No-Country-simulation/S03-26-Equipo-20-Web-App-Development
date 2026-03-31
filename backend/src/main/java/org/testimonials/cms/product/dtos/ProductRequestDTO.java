package org.testimonials.cms.product.dtos;

import jakarta.validation.constraints.NotBlank;

public record ProductRequestDTO(
        @NotBlank(message = "El nombre es requerido")
        String name,
        @NotBlank(message = "El nombre es requerido")
        String description,
        @NotBlank(message = "La foto es requerida")
        String picture
    ) {
}
