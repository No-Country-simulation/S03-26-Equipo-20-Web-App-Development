package org.testimonials.cms.media.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MediaRequestDTO {
    @NotNull(message = "La URL es requerida")
    private MultipartFile url;
}
