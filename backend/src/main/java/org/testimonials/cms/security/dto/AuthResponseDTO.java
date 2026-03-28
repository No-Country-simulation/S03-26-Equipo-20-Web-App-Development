package org.testimonials.cms.security.dto;

public record AuthResponseDTO(
        OrganizationAuthResponseDTO organization,
        String token
) {
}
