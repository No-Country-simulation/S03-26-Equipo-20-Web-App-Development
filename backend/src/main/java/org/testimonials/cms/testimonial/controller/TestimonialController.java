package org.testimonials.cms.testimonial.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.swagger.docs.DefaultApiResponses;
import org.testimonials.cms.testimonial.dtos.EditTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.TestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialRequestDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.CreateTestimonialResponseDTO;
import org.testimonials.cms.testimonial.dtos.dtosFull.ListTestimonialsDTO;
import org.testimonials.cms.testimonial.service.ITestimonialService;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/testimonials")
@Tag(name = "Testimonials", description = "Gestión de testimonios")
public class TestimonialController implements DefaultApiResponses {
    private final ITestimonialService testimonialService;

    @PostMapping("/register")
    @Operation(
            summary = "Crear testimonio",
            description = "Crea un nuevo testimonio asociado al usuario autenticado",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Testimonio creado exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = CreateTestimonialResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<CreateTestimonialResponseDTO> createTestimonial(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal,
                                                                          @ModelAttribute @Valid CreateTestimonialRequestDTO createTestimonialRequestDTO) {
        CreateTestimonialResponseDTO testimonialResponseDTO = testimonialService.createTestimonial(customUserPrincipal,
                createTestimonialRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(testimonialResponseDTO);
    }

    @GetMapping
    @Operation(
            summary = "Listar todos los testimonios",
            description = "Obtiene una lista de todos los testimonios",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de testimonios obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = TestimonialResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<List<TestimonialResponseDTO>> listAllTestimonials() {
        List<TestimonialResponseDTO> testimonialResponseDTO = testimonialService.listAllTestimonials();

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<ListTestimonialsDTO>> getTestimonials(@RequestParam(defaultValue = "0") int page,
                                                                     @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        Page<ListTestimonialsDTO> response = testimonialService.getAllTestimonials(pageable);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{idTestimonial}")
    @Operation(
            summary = "Obtener un testimonio",
            description = "Obtiene los detalles de un testimonio por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Testimonio obtenido exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = TestimonialResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<TestimonialResponseDTO> listTestimonial(@PathVariable UUID idTestimonial) {
        TestimonialResponseDTO testimonialResponseDTO = testimonialService.listTestimonial(idTestimonial);

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @PutMapping("/{idTestimonial}")
    @Operation(
            summary = "Actualizar un testimonio",
            description = "Actualiza los datos de un testimonio existente",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Testimonio actualizado exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = TestimonialResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<TestimonialResponseDTO> updateTestimonial(@PathVariable UUID idTestimonial, @RequestBody @Valid EditTestimonialRequestDTO editTestimonialRequestDTO) {
        TestimonialResponseDTO testimonialResponseDTO = testimonialService.updateTestimonial(idTestimonial, editTestimonialRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    }

    @DeleteMapping("/{idTestimonial}")
    @Operation(
            summary = "Eliminar un testimonio",
            description = "Elimina un testimonio por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Testimonio eliminado exitosamente"
                    )
            }
    )
    public ResponseEntity<Void> deleteTestimonial(@PathVariable UUID idTestimonial) {
        testimonialService.deleteTestimonial(idTestimonial);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
