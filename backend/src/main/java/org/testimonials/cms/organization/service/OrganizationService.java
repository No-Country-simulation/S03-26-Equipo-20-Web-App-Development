package org.testimonials.cms.organization.service;

import org.testimonials.cms.organization.dtos.OrganizationRequestDTO;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;

import java.util.List;
import java.util.UUID;

public interface OrganizationService {
    List<OrganizationResponseDTO> listAllOrganizations();
    OrganizationResponseDTO listOrganization(UUID id);
    OrganizationResponseDTO updateOrganization(UUID id, OrganizationRequestDTO organizationRequestDTO);
    void deleteOrganization(UUID id);
}
