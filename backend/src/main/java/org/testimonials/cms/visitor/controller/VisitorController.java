package org.testimonials.cms.visitor.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;
import org.testimonials.cms.visitor.dtos.VisitorResponseDTO;
import org.testimonials.cms.visitor.service.IVisitorService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/visitors")
public class VisitorController {
    private final IVisitorService visitorService;

    @GetMapping
    public ResponseEntity<List<VisitorResponseDTO>> listAllVisitors() {
        List<VisitorResponseDTO> visitorResponseDTO = visitorService.listAllVisitors();

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @GetMapping("/{idVisitor}")
    public ResponseEntity<VisitorResponseDTO> listVisitor(@PathVariable UUID idVisitor) {
        VisitorResponseDTO visitorResponseDTO = visitorService.listVisitor(idVisitor);

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @PutMapping("/{idVisitor}")
    public ResponseEntity<VisitorResponseDTO> updateVisitor(@PathVariable UUID idVisitor, @RequestBody @Valid VisitorRequestDTO visitorRequestDTO) {
        VisitorResponseDTO visitorResponseDTO = visitorService.updateVisitor(idVisitor, visitorRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @DeleteMapping("/{idVisitor}")
    public ResponseEntity<VisitorResponseDTO> deleteVisitor(@PathVariable UUID idVisitor) {
        visitorService.deleteVisitor(idVisitor);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
