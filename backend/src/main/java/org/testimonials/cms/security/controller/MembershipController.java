package org.testimonials.cms.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.testimonials.cms.security.model.MembershipType;

@RestController
@RequestMapping("/api/v1/membership")
public class MembershipController {

    @GetMapping("/types")
    public ResponseEntity<MembershipType[]> getMembershipTypes() {
        return ResponseEntity.ok(MembershipType.getAssignableTypes());
    }
}
