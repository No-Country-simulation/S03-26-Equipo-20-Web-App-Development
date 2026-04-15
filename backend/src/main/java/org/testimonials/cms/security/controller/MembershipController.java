package org.testimonials.cms.security.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.testimonials.cms.security.model.MembershipType;
import org.testimonials.cms.swagger.docs.DefaultApiResponses;

@RestController
@RequestMapping("/api/v1/membership")
@Tag(name = "Membership", description = "Gestión de membresías")
public class MembershipController implements DefaultApiResponses {

    @GetMapping("/types")
    @Operation(
            summary = "Obtener tipos de membresía asignables",
            description = "Retorna los tipos de membresía disponibles para asignar (ADMIN, STAFF). Excluye OWNER."
    )
    public ResponseEntity<MembershipType[]> getMembershipTypes() {
        return ResponseEntity.ok(MembershipType.getAssignableTypes());
    }
}
