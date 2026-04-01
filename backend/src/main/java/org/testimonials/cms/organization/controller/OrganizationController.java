package org.testimonials.cms.organization.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.organization.dtos.OrganizationRequestDTO;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.organization.service.IOrganizationService;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.swagger.docs.DefaultApiResponses;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/organizations")
@Tag(name = "Organizations", description = "Gestión de organizaciones")
public class OrganizationController implements DefaultApiResponses {

    private final IOrganizationService organizationService;

    @GetMapping("/getAll")
    @Operation(summary = "Listar todas las organizaciones")
    public ResponseEntity<List<OrganizationResponseDTO>> listAllOrganizations() {
        List<OrganizationResponseDTO> organizationResponseDTO = organizationService.listAllOrganizations();

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @GetMapping("/getOnly")
    @Operation(summary = "Obtener organización del usuario autenticado")
    public ResponseEntity<OrganizationResponseDTO> listOrganization(@AuthenticationPrincipal CustomUserPrincipal userPrincipal) {
        OrganizationResponseDTO organizationResponseDTO = organizationService.listOrganization(userPrincipal.organizationId());

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @PutMapping
    @Operation(
            summary = "Actualizar organización",
            description = "Actualiza la información de la organización del usuario autenticado",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = OrganizationRequestDTO.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Organización actualizada exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = OrganizationResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<OrganizationResponseDTO> updateOrganization(@AuthenticationPrincipal CustomUserPrincipal userPrincipal, @RequestBody @Valid OrganizationRequestDTO organizationRequestDTO) {
        OrganizationResponseDTO organizationResponseDTO = organizationService.updateOrganization(userPrincipal.organizationId(), organizationRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @DeleteMapping
    @Operation(
            summary = "Eliminar organización",
            description = "Elimina la organización del usuario autenticado y todos sus datos asociados"
    )
    public ResponseEntity<Void> deleteOrganization(@AuthenticationPrincipal CustomUserPrincipal userPrincipal) {
        organizationService.deleteOrganization(userPrincipal.organizationId());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
