package org.testimonials.cms.organization.dtos;

import org.testimonials.cms.organization.model.Organization;

import java.util.UUID;

public record OrganizationResponseDTO(
        UUID id,
        String name,
        String logo
    ) {

    public OrganizationResponseDTO(Organization organization) {
        this(organization.getId(), organization.getName(), organization.getLogo());
    }
}
