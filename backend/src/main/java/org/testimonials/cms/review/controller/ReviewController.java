package org.testimonials.cms.review.controller;

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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.review.dtos.EditReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewResponseDTO;
import org.testimonials.cms.review.service.IReviewService;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.swagger.docs.DefaultApiResponses;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/reviews")
@Tag(name = "Reviews", description = "Gestión de reseñas")
public class ReviewController implements DefaultApiResponses {
    private final IReviewService reviewService;

    @PostMapping("/register")
    @Operation(
            summary = "Crear una reseña",
            description = "Crea una nueva reseña asociada al usuario autenticado",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Reseña creada exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ReviewResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<ReviewResponseDTO> createReview(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal, @RequestBody @Valid ReviewRequestDTO reviewRequestDTO) {
        ReviewResponseDTO reviewResponseDTO = reviewService.createReview(customUserPrincipal, reviewRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(reviewResponseDTO);
    }

    @GetMapping
    @Operation(
            summary = "Listar todas las reseñas",
            description = "Obtiene una lista de todas las reseñas",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de reseñas obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ReviewResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<List<ReviewResponseDTO>> listAllReviews() {
        List<ReviewResponseDTO> reviewResponseDTO = reviewService.listAllReviews();

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @GetMapping("/{idReview}")
    @Operation(
            summary = "Obtener una reseña",
            description = "Obtiene los detalles de una reseña por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Reseña obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ReviewResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<ReviewResponseDTO> listReview(@PathVariable UUID idReview) {
        ReviewResponseDTO reviewResponseDTO = reviewService.listReview(idReview);

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @PutMapping("/{idReview}")
    @Operation(
            summary = "Actualizar una reseña",
            description = "Actualiza los datos de una reseña existente",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Reseña actualizada exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ReviewResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<ReviewResponseDTO> updateReview(@PathVariable UUID idReview, @RequestBody @Valid EditReviewRequestDTO editReviewRequestDTO) {
        ReviewResponseDTO reviewResponseDTO = reviewService.updateReview(idReview, editReviewRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @DeleteMapping("/{idReview}")
    @Operation(
            summary = "Eliminar una reseña",
            description = "Elimina una reseña por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Reseña eliminada exitosamente"
                    )
            }
    )
    public ResponseEntity<Void> deleteReview(@PathVariable UUID idReview) {
        reviewService.deleteReview(idReview);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
