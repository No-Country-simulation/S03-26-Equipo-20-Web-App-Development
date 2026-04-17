package org.testimonials.cms.product.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProductRequestDTO(
        @NotBlank(message = "El nombre es requerido")
        String name,
        @NotBlank(message = "El nombre es requerido")
        String description,
        @NotNull(message = "La foto es requerida")
        MultipartFile picture,
        List<String> tags
) {
}
