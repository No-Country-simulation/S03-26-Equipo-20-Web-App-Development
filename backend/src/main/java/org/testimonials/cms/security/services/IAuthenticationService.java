package org.testimonials.cms.security.services;

import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.security.dto.LoginRequestDTO;

public interface IAuthenticationService {
    OrganizationResponseDTO login(LoginRequestDTO loginRequestDTO);
}
