package org.testimonials.cms.organization.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.organization.dtos.OrganizationRequestDTO;
import org.testimonials.cms.organization.dtos.OrganizationResponseDTO;
import org.testimonials.cms.organization.service.OrganizationService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/organizations")
public class OrganizationController {
    private final OrganizationService organizationService;

    @PostMapping
    public ResponseEntity<OrganizationResponseDTO> createOrganization(@RequestBody @Valid OrganizationRequestDTO organizationRequestDTO) {
         OrganizationResponseDTO organizationResponseDTO = organizationService.createOrganization(organizationRequestDTO);

         return ResponseEntity.status(HttpStatus.CREATED).body(organizationResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<OrganizationResponseDTO>> listAllOrganizations() {
        List<OrganizationResponseDTO> organizationResponseDTO = organizationService.listAllOrganizations();

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrganizationResponseDTO> listOrganization(@PathVariable UUID id) {
        OrganizationResponseDTO organizationResponseDTO = organizationService.listOrganization(id);

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrganizationResponseDTO> updateOrganization(@PathVariable UUID id, @RequestBody @Valid OrganizationRequestDTO organizationRequestDTO) {
        OrganizationResponseDTO organizationResponseDTO = organizationService.updateOrganization(id, organizationRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(organizationResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganization(@PathVariable UUID id) {
        organizationService.deleteOrganization(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
