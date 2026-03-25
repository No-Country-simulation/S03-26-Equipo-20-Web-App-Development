package org.testimonials.cms.organization.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.organization.dtos.OrganizationRequestDTO;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.organization.exceptions.OrganizationNotFound;
import org.testimonials.cms.organization.mapper.OrganizationMapper;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.organization.repository.OrganizationRepository;
import org.testimonials.cms.organization.service.OrganizationService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationRepository organizationRepository;

    private final OrganizationMapper organizationMapper;

    @Override
    @Transactional
    public OrganizationResponseDTO createOrganization(OrganizationRequestDTO organizationRequestDTO) {
        Organization organization = organizationMapper.toOrganization(organizationRequestDTO);
        Organization newOrganization = organizationRepository.save(organization);
        return organizationMapper.toOrganizationDTO(newOrganization);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrganizationResponseDTO> listAllOrganizations() {
        return organizationMapper.toOrganizationListDTOs(organizationRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public OrganizationResponseDTO listOrganization(UUID id) {
        Optional<Organization> organizationFound = organizationRepository.findById(id);

        if (organizationFound.isEmpty()) throw OrganizationNotFound.of(id);

        return organizationMapper.toOrganizationDTO(organizationRepository.getReferenceById(id));
    }

    @Override
    @Transactional
    public OrganizationResponseDTO updateOrganization(UUID id, OrganizationRequestDTO organizationRequestDTO) {
        Optional<Organization> organizationFound = organizationRepository.findById(id);

        if (organizationFound.isEmpty()) throw OrganizationNotFound.of(id);

        Organization organizationNotModified = organizationRepository.getReferenceById(id);

        if (organizationRequestDTO.name() != null) organizationNotModified.setName(organizationRequestDTO.name());
        if (organizationRequestDTO.logo() != null) organizationNotModified.setLogo(organizationRequestDTO.logo());

        Organization organizationModified = organizationRepository.save(organizationNotModified);

        return organizationMapper.toOrganizationDTO(organizationModified);
    }

    @Override
    @Transactional
    public void deleteOrganization(UUID id) {
        Optional<Organization> organizationFound = organizationRepository.findById(id);

        if (organizationFound.isEmpty()) throw OrganizationNotFound.of(id);

        organizationRepository.deleteById(id);
    }
}
