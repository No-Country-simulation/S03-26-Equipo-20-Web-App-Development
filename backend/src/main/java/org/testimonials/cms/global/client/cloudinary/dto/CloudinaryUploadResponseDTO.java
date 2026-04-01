package org.testimonials.cms.global.client.cloudinary.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CloudinaryUploadResponseDTO {

    @JsonProperty("public_id")
    private String publicId;

    @JsonProperty("secure_url")
    private String secureUrl;
}
