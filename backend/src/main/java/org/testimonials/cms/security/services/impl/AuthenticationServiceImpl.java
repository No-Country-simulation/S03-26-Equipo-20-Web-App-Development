package org.testimonials.cms.security.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.organization.repository.OrganizationRepository;
import org.testimonials.cms.security.dto.*;
import org.testimonials.cms.security.exception.EmailAlreadyExistsException;
import org.testimonials.cms.security.exception.InvalidCredentialsException;
import org.testimonials.cms.security.model.*;
import org.testimonials.cms.security.services.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements IAuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final IJwtService jwtService;
    private final OrganizationRepository organizationRepository;
    private final PasswordEncoder passwordEncoder;
    private final IUserService userService;
    private final IRoleService roleService;
    private final IMembershipService membershipService;

    @Override
    @Transactional
    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {

        CustomUserPrincipal principal = authenticateCurrentUser(loginRequestDTO);

        if (principal == null) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        User user = principal.user();

        Membership activeMembership = user.getMemberships().stream()
                .filter(m -> m.getStatus() == MembershipStatus.ACTIVE)
                .findFirst()
                .orElseThrow(InvalidCredentialsException::of);

        List<String> roles = activeMembership.getRoles().stream()
                .map(Role::getRoleName)
                .toList();

        String token = jwtService.generateJwt(
                Map.of(
                        "orgId", activeMembership.getOrganization().getId(),
                        "roles", roles
                ),
                principal.getUsername()
        );
        OrganizationAuthResponseDTO dto = new OrganizationAuthResponseDTO(
                activeMembership.getOrganization().getId(),
                activeMembership.getOrganization().getName(),
                activeMembership.getOrganization().getLogo(),
                user.getEmail(),
                user.getName()
        );

        return new AuthResponseDTO(dto,token);
    }

    @Override
    @Transactional
    public AuthResponseDTO registerOrganization(OrganizationRegisterDTO dto) {

        if (userService.existsByEmail(dto.email())) {
            throw EmailAlreadyExistsException.of(dto.email());
        }

        Organization organization = new Organization();
        organization.setName(dto.name());
        organization.setLogo(dto.logo());
        Organization newOrganization = organizationRepository.save(organization);

        User user = new User();
        user.setName(dto.username());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        User newUser = userService.createUser(user);

        Membership membership = new Membership();
        membership.setOrganization(newOrganization);
        membership.setUser(newUser);
        Role role = roleService.findRoleByName("OWNER");
        membership.setRoles(new HashSet<>(List.of(role)));
        membership.setStatus(MembershipStatus.ACTIVE);
        membership.setType(MembershipType.OWNER);
        membershipService.createNewMembership(membership);

        String token = jwtService.generateJwt(
                Map.of("orgId", newOrganization.getId(),
                        "roles", membership.getRoles().stream().map(Role::getRoleName).toList()),
                newUser.getEmail());

        OrganizationAuthResponseDTO orgDto = new OrganizationAuthResponseDTO(
                membership.getOrganization().getId(),
                membership.getOrganization().getName(),
                membership.getOrganization().getLogo(),
                user.getEmail(),
                user.getName()
        );

        return new AuthResponseDTO(orgDto,token);
    }

    @Override
    public OrganizationAuthResponseDTO me(CustomUserPrincipal principal) {
        User user = principal.user();

        Membership membership = user.getMemberships().stream()
                .filter(m -> m.getStatus() == MembershipStatus.ACTIVE)
                .findFirst()
                .orElseThrow(InvalidCredentialsException::of);

        return new OrganizationAuthResponseDTO(
                membership.getOrganization().getId(),
                membership.getOrganization().getName(),
                membership.getOrganization().getLogo(),
                user.getEmail(),
                user.getName()
        );
    }

    @Override
    @Transactional
    public AddMembersResponseDTO registerMembers(AddMembersRequestDTO membersRequestDTO, CustomUserPrincipal principal) {
        List<MemberResponseDTO> successful = new ArrayList<>();
        List<FailedMemberDTO> failed = new ArrayList<>();
        List<MemberInputDTO> members = membersRequestDTO.members();
        for (int i = 0; i < members.size(); i++) {
            MemberInputDTO memberInput = members.get(i);
            try {
                MemberResponseDTO result = addSingleMember(new Organization(principal.organizationId()), memberInput);
                successful.add(result);
            } catch (EmailAlreadyExistsException e) {
                failed.add(new FailedMemberDTO(i, memberInput.email(), "Email already exists"));
            } catch (IllegalArgumentException e) {
                failed.add(new FailedMemberDTO(i, memberInput.email(), e.getMessage()));
            } catch (Exception e) {
                failed.add(new FailedMemberDTO(i, memberInput.email(), "Unexpected error: " + e.getMessage()));
            }
        }
        return new AddMembersResponseDTO(successful, failed);
    }

    private CustomUserPrincipal authenticateCurrentUser(LoginRequestDTO loginRequestDTO) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginRequestDTO.email(), loginRequestDTO.password());
        Authentication authenticated = authenticationManager.authenticate(authentication);
        return (CustomUserPrincipal) authenticated.getPrincipal();
    }

    private MemberResponseDTO addSingleMember(Organization organization, MemberInputDTO memberInput) {
        if (memberInput.type() == MembershipType.OWNER) {
            throw new IllegalArgumentException("Cannot add owner members via this endpoint");
        }

        if (userService.existsByEmail(memberInput.email())) {
            throw EmailAlreadyExistsException.of(memberInput.email());
        }

        User user = new User();
        user.setName(memberInput.name());
        user.setEmail(memberInput.email());
        user.setPassword(passwordEncoder.encode(memberInput.password()));
        User newUser = userService.createUser(user);

        Role role = roleService.findRoleByName(memberInput.type().name());

        Membership membership = new Membership();
        membership.setOrganization(organization);
        membership.setUser(newUser);
        membership.setRoles(Set.of(role));
        membership.setStatus(MembershipStatus.ACTIVE);
        membership.setType(memberInput.type());

        membershipService.createNewMembership(membership);

        return new MemberResponseDTO(
                newUser.getId(),
                newUser.getName(),
                newUser.getEmail(),
                memberInput.type(),
                MembershipStatus.ACTIVE
        );
    }
}
