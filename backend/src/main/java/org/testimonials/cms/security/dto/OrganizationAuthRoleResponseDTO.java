package org.testimonials.cms.security.dto;

import java.util.UUID;

public record OrganizationAuthRoleResponseDTO(
        UUID id,
        String name,
        String logo,
        String userEmail,
        String userName,
        String role
    ) {
}
