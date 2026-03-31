package org.testimonials.cms.security.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.security.dto.*;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.security.services.IAuthenticationService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @Value("${cookie.jwt.expiration-in-days}")
    private Long cookieExpiration;

    @PostMapping("/login")
    public ResponseEntity<OrganizationAuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {
        AuthResponseDTO authResponseDTO = authenticationService.login(loginRequestDTO);
        ResponseCookie cookie = ResponseCookie.from("jwt", authResponseDTO.token())
                .httpOnly(true)
                .secure(false) // poner true en producción (https)
                .path("/")
                .maxAge(86400L * cookieExpiration)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body(authResponseDTO.organization());
    }

    @PostMapping("/register-org")
    public ResponseEntity<OrganizationAuthResponseDTO> registerOrganization(
            @RequestBody @Valid OrganizationRegisterDTO organizationRegisterDTO) {
        AuthResponseDTO authResponseDTO = authenticationService.registerOrganization(organizationRegisterDTO);
        ResponseCookie cookie = ResponseCookie.from("jwt", authResponseDTO.token())
                .httpOnly(true)
                .secure(false) // poner true en producción (https)
                .path("/")
                .maxAge(86400L * cookieExpiration)
                .sameSite("Lax")
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body(authResponseDTO.organization());
    }

    @GetMapping("/me")
    public ResponseEntity<OrganizationAuthResponseDTO> me(@AuthenticationPrincipal CustomUserPrincipal userPrincipal){
        return ResponseEntity.ok(authenticationService.me(userPrincipal));
    }

    @PostMapping("/register-members")
    public ResponseEntity<AddMembersResponseDTO> addMembers(
            @RequestBody @Valid AddMembersRequestDTO request,
            @AuthenticationPrincipal CustomUserPrincipal principal) {

        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.registerMembers(request,principal));
    }
}
