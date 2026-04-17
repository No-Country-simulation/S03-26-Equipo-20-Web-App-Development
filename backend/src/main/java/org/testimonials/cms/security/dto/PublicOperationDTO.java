package org.testimonials.cms.security.dto;

public record PublicOperationDTO(
        String fullPath,
        String httpMethod
) {}
