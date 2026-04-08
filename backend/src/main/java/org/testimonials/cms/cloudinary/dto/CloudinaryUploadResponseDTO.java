package org.testimonials.cms.cloudinary.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CloudinaryUploadResponseDTO(
        @JsonProperty("public_id")
        String publicId,

        @JsonProperty("secure_url")
        String secureUrl)
    {

}
