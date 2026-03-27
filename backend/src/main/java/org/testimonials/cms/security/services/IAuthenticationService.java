package org.testimonials.cms.security.services;

import org.testimonials.cms.security.dto.AuthResponseDTO;
import org.testimonials.cms.security.dto.LoginRequestDTO;
import org.testimonials.cms.security.dto.OrganizationRegisterDTO;

public interface IAuthenticationService {
    AuthResponseDTO login(LoginRequestDTO loginRequestDTO);

    AuthResponseDTO registerOrganization(OrganizationRegisterDTO organizationRegisterDTO);
}
