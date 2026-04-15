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

//    @PostMapping
//    public ResponseEntity<VisitorResponseDTO> createVisitor(@RequestBody @Valid VisitorRequestDTO visitorRequestDTO) {
//        VisitorResponseDTO visitorResponseDTO = visitorService.createVisitor(visitorRequestDTO);
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(visitorResponseDTO);
//    }

    @GetMapping
    public ResponseEntity<List<VisitorResponseDTO>> listAllVisitors() {
        List<VisitorResponseDTO> visitorResponseDTO = visitorService.listAllVisitors();

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitorResponseDTO> listVisitor(@PathVariable UUID id) {
        VisitorResponseDTO visitorResponseDTO = visitorService.listVisitor(id);

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VisitorResponseDTO> updateVisitor(@PathVariable UUID id, @RequestBody @Valid VisitorRequestDTO visitorRequestDTO) {
        VisitorResponseDTO visitorResponseDTO = visitorService.updateVisitor(id, visitorRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<VisitorResponseDTO> deleteVisitor(@PathVariable UUID id) {
        visitorService.deleteVisitor(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
