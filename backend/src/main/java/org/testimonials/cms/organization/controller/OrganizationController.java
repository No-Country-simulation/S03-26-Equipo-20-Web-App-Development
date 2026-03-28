package org.testimonials.cms.organization.controller;

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

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/organizations")
public class OrganizationController {

    private final IOrganizationService IOrganizationService;

    @GetMapping("/getAll")
    public ResponseEntity<List<OrganizationResponseDTO>> listAllOrganizations() {
        List<OrganizationResponseDTO> organizationResponseDTO = IOrganizationService.listAllOrganizations();

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @GetMapping("/getOnly")
    public ResponseEntity<OrganizationResponseDTO> listOrganization(@AuthenticationPrincipal CustomUserPrincipal userPrincipal) {
        OrganizationResponseDTO organizationResponseDTO = IOrganizationService.listOrganization(userPrincipal.organizationId());

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @PutMapping
    public ResponseEntity<OrganizationResponseDTO> updateOrganization(@AuthenticationPrincipal CustomUserPrincipal userPrincipal, @RequestBody @Valid OrganizationRequestDTO organizationRequestDTO) {
        OrganizationResponseDTO organizationResponseDTO = IOrganizationService.updateOrganization(userPrincipal.organizationId(), organizationRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteOrganization(@AuthenticationPrincipal CustomUserPrincipal userPrincipal) {
        IOrganizationService.deleteOrganization(userPrincipal.organizationId());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
