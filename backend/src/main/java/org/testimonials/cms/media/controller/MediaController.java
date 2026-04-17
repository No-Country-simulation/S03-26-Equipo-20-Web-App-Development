package org.testimonials.cms.media.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.testimonials.cms.media.dto.MediaResponseDTO;
import org.testimonials.cms.media.service.IMediaService;
import org.testimonials.cms.swagger.docs.DefaultApiResponses;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/medias")
@Tag(name = "Medias", description = "Gestión de archivos multimedia")
public class MediaController implements DefaultApiResponses {
    private final IMediaService mediaService;

    @GetMapping
    @Operation(
            summary = "Listar todos los archivos multimedia",
            description = "Obtiene una lista de todos los archivos multimedia de la organización",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de archivos multimedia obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = MediaResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<List<MediaResponseDTO>> listAllMedias() {
        List<MediaResponseDTO> mediaResponseDTOS = mediaService.listAllMedias();

        return ResponseEntity.status(HttpStatus.OK).body(mediaResponseDTOS);
    }

    @GetMapping("/{idMedia}")
    @Operation(
            summary = "Obtener un archivo multimedia",
            description = "Obtiene los detalles de un archivo multimedia por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Archivo multimedia obtenido exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = MediaResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<MediaResponseDTO> listMedia(@PathVariable UUID idMedia) {
        MediaResponseDTO mediaResponseDTO = mediaService.listMedia(idMedia);

        return ResponseEntity.status(HttpStatus.OK).body(mediaResponseDTO);
    }
}
