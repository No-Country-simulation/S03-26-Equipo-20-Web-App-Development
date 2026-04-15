package org.testimonials.cms.tag.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.swagger.docs.DefaultApiResponses;
import org.testimonials.cms.tag.dto.TagRequestDTO;
import org.testimonials.cms.tag.dto.TagResponseDTO;
import org.testimonials.cms.tag.service.ITagService;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/tags")
@Tag(name = "Tags", description = "Gestión de etiquetas")
public class TagController implements DefaultApiResponses {
    private final ITagService tagService;

    @PostMapping("/register")
    @Operation(
            summary = "Crear etiqueta",
            description = "Crea una nueva etiqueta asociada a la organización del usuario autenticado",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Etiqueta creada exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = TagResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<TagResponseDTO> createTag(
            @AuthenticationPrincipal CustomUserPrincipal customUserPrincipal,
            @RequestBody @Valid TagRequestDTO tagRequestDTO) {
        TagResponseDTO tagResponseDTO = tagService.createTag(customUserPrincipal, tagRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(tagResponseDTO);
    }

    @GetMapping
    @Operation(
            summary = "Listar todas las etiquetas",
            description = "Obtiene una lista paginada de todas las etiquetas con su usageCount",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de etiquetas obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = TagResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<Page<TagResponseDTO>> listAllTags(
            @AuthenticationPrincipal CustomUserPrincipal customUserPrincipal,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<TagResponseDTO> page = tagService.listAllTags(customUserPrincipal, pageable);

        return ResponseEntity.status(HttpStatus.OK).body(page);
    }

    @GetMapping("/{idTag}")
    @Operation(
            summary = "Obtener una etiqueta",
            description = "Obtiene los detalles de una etiqueta por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Etiqueta obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = TagResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<TagResponseDTO> listTag(
            @PathVariable UUID idTag,
            @AuthenticationPrincipal CustomUserPrincipal customUserPrincipal) {
        TagResponseDTO tagResponseDTO = tagService.listTag(idTag, customUserPrincipal.organizationId());

        return ResponseEntity.status(HttpStatus.OK).body(tagResponseDTO);
    }

    @PutMapping("/{idTag}")
    @Operation(
            summary = "Actualizar una etiqueta",
            description = "Actualiza los datos de una etiqueta existente",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Etiqueta actualizada exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = TagResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<TagResponseDTO> updateTag(
            @PathVariable UUID idTag,
            @RequestBody @Valid TagRequestDTO tagRequestDTO) {
        TagResponseDTO tagResponseDTO = tagService.updateTag(idTag, tagRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(tagResponseDTO);
    }

    @DeleteMapping("/{idTag}")
    @Operation(
            summary = "Eliminar una etiqueta",
            description = "Elimina una etiqueta por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Etiqueta eliminada exitosamente"
                    )
            }
    )
    public ResponseEntity<Void> deleteTag(@PathVariable UUID idTag) {
        tagService.deleteTag(idTag);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}