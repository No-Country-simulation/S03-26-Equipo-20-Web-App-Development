package org.testimonials.cms.organization.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.organization.dtos.OrganizationRequestDTO;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.organization.exception.OrganizationNotFound;
import org.testimonials.cms.organization.mapper.OrganizationMapper;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.organization.repository.OrganizationRepository;
import org.testimonials.cms.organization.service.IOrganizationService;
import org.testimonials.cms.security.model.*;
import org.testimonials.cms.security.services.IJwtService;
import org.testimonials.cms.security.services.IMembershipService;
import org.testimonials.cms.security.services.IRoleService;
import org.testimonials.cms.security.services.IUserService;

import java.util.*;

@Service
@AllArgsConstructor
public class OrganizationServiceImpl implements IOrganizationService {
    private final OrganizationRepository organizationRepository;

    private final OrganizationMapper organizationMapper;
    private final PasswordEncoder passwordEncoder;
    private final IUserService userService;
    private final IRoleService roleService;
    private final IMembershipService membershipService;
    private final IJwtService jwtService;

    @Override
    @Transactional
    public OrganizationResponseDTO createOrganization(OrganizationRequestDTO organizationRequestDTO) {
        Organization organization = organizationMapper.toOrganization(organizationRequestDTO);
        Organization newOrganization = organizationRepository.save(organization);
        User user = new User();
        user.setName(organizationRequestDTO.username());
        user.setEmail(organizationRequestDTO.email());
        user.setPassword(passwordEncoder.encode(organizationRequestDTO.password()));
        User newUSer = userService.createUser(user);
        Membership membership = new Membership();
        membership.setOrganization(newOrganization);
        membership.setUser(newUSer);
        Role role = roleService.findRoleByName("OWNER");
        membership.setRoles(new HashSet<>(List.of(role)));
        membership.setStatus(MembershipStatus.ACTIVE);
        membership.setType(MembershipType.OWNER);
        membershipService.createNewMembership(membership);
        String jwt = jwtService.generateJwt(
                Map.of("orgID",newOrganization.getId(),
                "roles",membership.getRoles().stream().map(Role::getRoleName).toList())
                , newUSer.getEmail());
        return new OrganizationResponseDTO(newOrganization.getId(),newOrganization.getName(), newOrganization.getLogo(), jwt);
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
