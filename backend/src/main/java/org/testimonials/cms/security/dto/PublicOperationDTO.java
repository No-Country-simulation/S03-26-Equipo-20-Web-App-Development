package org.testimonials.cms.security.dto;

public record PublicOperationDTO(
        String basePath,
        String path,
        String httpMethod
) {
}
