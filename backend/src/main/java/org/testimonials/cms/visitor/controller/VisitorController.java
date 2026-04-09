package org.testimonials.cms.visitor.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.swagger.docs.DefaultApiResponses;
import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;
import org.testimonials.cms.visitor.dtos.VisitorResponseDTO;
import org.testimonials.cms.visitor.service.IVisitorService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/visitors")
@Tag(name = "Visitors", description = "Gestión de visitantes")
public class VisitorController implements DefaultApiResponses {
    private final IVisitorService visitorService;

    @GetMapping
    @Operation(
            summary = "Listar todos los visitantes",
            description = "Obtiene una lista de todos los visitantes",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de visitantes obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = VisitorResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<List<VisitorResponseDTO>> listAllVisitors() {
        List<VisitorResponseDTO> visitorResponseDTO = visitorService.listAllVisitors();

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @GetMapping("/{idVisitor}")
    @Operation(
            summary = "Obtener un visitante",
            description = "Obtiene los detalles de un visitante por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Visitante obtenido exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = VisitorResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<VisitorResponseDTO> listVisitor(@PathVariable UUID idVisitor) {
        VisitorResponseDTO visitorResponseDTO = visitorService.listVisitor(idVisitor);

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @PutMapping("/{idVisitor}")
    @Operation(
            summary = "Actualizar un visitante",
            description = "Actualiza los datos de un visitante existente",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Visitante actualizado exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = VisitorResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<VisitorResponseDTO> updateVisitor(@PathVariable UUID idVisitor, @RequestBody @Valid VisitorRequestDTO visitorRequestDTO) {
        VisitorResponseDTO visitorResponseDTO = visitorService.updateVisitor(idVisitor, visitorRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(visitorResponseDTO);
    }

    @DeleteMapping("/{idVisitor}")
    @Operation(
            summary = "Eliminar un visitante",
            description = "Elimina un visitante por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Visitante eliminado exitosamente"
                    )
            }
    )
    public ResponseEntity<VisitorResponseDTO> deleteVisitor(@PathVariable UUID idVisitor) {
        visitorService.deleteVisitor(idVisitor);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
