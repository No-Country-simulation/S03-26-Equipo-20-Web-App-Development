package org.testimonials.cms.product.dtos;

import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProductUpdateDTO(
        @NotBlank(message = "El nombre es requerido")
        String name,
        @NotBlank(message = "El nombre es requerido")
        String description,
        MultipartFile picture,
        List<String> tags
    ) {
}
