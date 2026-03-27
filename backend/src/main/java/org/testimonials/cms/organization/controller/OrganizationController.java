package org.testimonials.cms.organization.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.organization.dtos.OrganizationRequestDTO;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.organization.service.IOrganizationService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/organizations")
public class OrganizationController {

    private final IOrganizationService IOrganizationService;

    @GetMapping
    public ResponseEntity<List<OrganizationResponseDTO>> listAllOrganizations() {
        List<OrganizationResponseDTO> organizationResponseDTO = IOrganizationService.listAllOrganizations();

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @GetMapping
    public ResponseEntity<OrganizationResponseDTO> listOrganization(@PathVariable UUID id) {
        OrganizationResponseDTO organizationResponseDTO = IOrganizationService.listOrganization(id);

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @PutMapping
    public ResponseEntity<OrganizationResponseDTO> updateOrganization(@PathVariable UUID id, @RequestBody @Valid OrganizationRequestDTO organizationRequestDTO) {
        OrganizationResponseDTO organizationResponseDTO = IOrganizationService.updateOrganization(id, organizationRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteOrganization(@PathVariable UUID id) {
        IOrganizationService.deleteOrganization(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
