package org.testimonials.cms.security.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.security.dto.LoginRequestDTO;
import org.testimonials.cms.security.exception.InvalidCredentialsException;
import org.testimonials.cms.security.model.*;
import org.testimonials.cms.security.services.IAuthenticationService;
import org.testimonials.cms.security.services.IJwtService;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements IAuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final IJwtService jwtService;

    @Override
    @Transactional
    public OrganizationResponseDTO login(LoginRequestDTO loginRequestDTO) {

        CustomUserPrincipal principal = authenticateCurrentUser(loginRequestDTO);

        Membership activeMembership = principal.user().getMemberships().stream()
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

        return new OrganizationResponseDTO(
                activeMembership.getOrganization().getId(),
                activeMembership.getOrganization().getName(),
                activeMembership.getOrganization().getLogo(),
                token);
    }

    private CustomUserPrincipal authenticateCurrentUser(LoginRequestDTO loginRequestDTO) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginRequestDTO.email(), loginRequestDTO.password());
        Authentication authenticated = authenticationManager.authenticate(authentication);
        return (CustomUserPrincipal) authenticated.getPrincipal();
    }
}
