package org.testimonials.cms.security.services;

import org.testimonials.cms.security.dto.*;
import org.testimonials.cms.security.model.CustomUserPrincipal;

public interface IAuthenticationService {
    AuthResponseDTO login(LoginRequestDTO loginRequestDTO);

    AuthResponseDTO registerOrganization(OrganizationRegisterDTO organizationRegisterDTO);

    OrganizationAuthResponseDTO me(CustomUserPrincipal userPrincipal);

    AddMembersResponseDTO registerMembers(AddMembersRequestDTO membersRequestDTO, CustomUserPrincipal principal);
}
