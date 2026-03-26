package org.testimonials.cms.organization.dtos;

import java.util.UUID;

public record OrganizationResponseDTO(
        UUID id,
        String name,
        String logo,
        String jwt
    ) {
}
