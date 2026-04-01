package org.testimonials.cms.security.dto;

import java.util.UUID;

public record OrganizationAuthResponseDTO(
        UUID id,
        String name,
        String logo,
        String userEmail,
        String userName
) {
}
