package org.testimonials.cms.media.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.testimonials.cms.media.enums.MediaProvider;
import org.testimonials.cms.media.enums.MediaType;

import java.util.UUID;

public record MediaRequestDTO(
        @NotNull(message = "El testimonio es requerido")
        UUID testimonialId,

        @NotNull(message = "El tipo es requerido")
        MediaType type,

        @NotNull(message = "El proveedor es requerido")
        MediaProvider provider,

        @NotBlank(message = "La URL es requerida")
        String url,

        String publicId,

        String thumbnailUrl,

        Integer duration
) {
}
