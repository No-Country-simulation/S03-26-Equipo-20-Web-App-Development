package org.testimonials.cms.security.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import org.testimonials.cms.swagger.docs.DefaultApiResponses;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Autenticación y gestión de usuarios")
public class AuthenticationController implements DefaultApiResponses {

    private final IAuthenticationService authenticationService;

    @Value("${cookie.jwt.expiration-in-days}")
    private Long cookieExpiration;

    @PostMapping("/login")
    @Operation(
            summary = "Iniciar sesión",
            description = "Autentica un usuario y retorna un token JWT en cookie si las credenciales son válidas",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LoginRequestDTO.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Autenticación exitosa",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = OrganizationAuthResponseDTO.class)
                            )
                    )
            }
    )
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
    @Operation(
            summary = "Registrar organización con Owner",
            description = "Crea una nueva organización junto con su usuario Owner inicial",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = OrganizationRegisterDTO.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Organización y Owner creados exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = OrganizationAuthResponseDTO.class)
                            )
                    )
            }
    )
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
    @Operation(
            summary = "Obtener usuario autenticado",
            description = "Retorna la información del usuario actualmente autenticado y su organización"
    )
    public ResponseEntity<OrganizationAuthResponseDTO> me(@AuthenticationPrincipal CustomUserPrincipal userPrincipal){
        return ResponseEntity.ok(authenticationService.me(userPrincipal));
    }

    @PostMapping("/register-members")
    @Operation(
            summary = "Registrar miembros en la organización",
            description = "Permite al Owner agregar múltiples ADMIN o STAFF a su organización. Retorna resultado parcial (exitosos y fallidos)",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AddMembersRequestDTO.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Miembros procesados (exitosos y/o fallidos)",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = AddMembersResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<AddMembersResponseDTO> addMembers(
            @RequestBody @Valid AddMembersRequestDTO request,
            @AuthenticationPrincipal CustomUserPrincipal principal) {

        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.registerMembers(request,principal));
    }
}
