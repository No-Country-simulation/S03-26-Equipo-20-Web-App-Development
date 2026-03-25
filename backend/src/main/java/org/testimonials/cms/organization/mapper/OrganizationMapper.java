package org.testimonials.cms.organization.mapper;

import org.mapstruct.Mapper;
import org.testimonials.cms.organization.dtos.OrganizationRequestDTO;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.organization.model.Organization;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrganizationMapper {
    Organization toOrganization(OrganizationRequestDTO dto);

    OrganizationResponseDTO toOrganizationDTO(Organization organization);

    List<OrganizationResponseDTO> toOrganizationListDTOs(List<Organization> organizations);
}
