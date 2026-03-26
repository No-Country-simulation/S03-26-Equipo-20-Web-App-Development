package org.testimonials.cms.security.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.security.dto.LoginRequestDTO;
import org.testimonials.cms.security.services.IAuthenticationService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<OrganizationResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {
        OrganizationResponseDTO loginResponseDTO = authenticationService.login(loginRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(loginResponseDTO);
    }
}
