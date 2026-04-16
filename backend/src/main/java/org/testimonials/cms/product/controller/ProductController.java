package org.testimonials.cms.product.controller;

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
import org.testimonials.cms.product.dtos.ProductRequestDTO;
import org.testimonials.cms.product.dtos.ProductResponseDTO;
import org.testimonials.cms.product.dtos.ProductUpdateDTO;
import org.testimonials.cms.product.service.IProductService;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.swagger.docs.DefaultApiResponses;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/products")
@Tag(name = "Products", description = "Gestión de productos")
public class ProductController implements DefaultApiResponses {
    private final IProductService productService;

    @PostMapping("/register")
    @Operation(
            summary = "Crear producto",
            description = "Crea un nuevo producto asociado al usuario autenticado",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Producto creado exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ProductResponseDTO.class)
                            )
                    )
            }
    )

    public ResponseEntity<ProductResponseDTO> createProduct(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal, @ModelAttribute @Valid ProductRequestDTO productRequestDTO) {
        ProductResponseDTO productResponseDTO = productService.createProduct(customUserPrincipal, productRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(productResponseDTO);
    }

    @GetMapping
    @Operation(
            summary = "Listar todos los productos",
            description = "Obtiene una lista de todos los productos",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de productos obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ProductResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<List<ProductResponseDTO>> listAllProducts() {
        List<ProductResponseDTO> productResponseDTOS = productService.listAllProducts();

        return ResponseEntity.status(HttpStatus.OK).body(productResponseDTOS);
    }

    @GetMapping("/{idProduct}")
    @Operation(
            summary = "Obtener un producto",
            description = "Obtiene los detalles de un producto por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Producto obtenido exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ProductResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<ProductResponseDTO> listProduct(@PathVariable UUID idProduct) {
        ProductResponseDTO productResponseDTO = productService.listProduct(idProduct);

        return ResponseEntity.status(HttpStatus.OK).body(productResponseDTO);
    }

    @PutMapping("/{idProduct}")
    @Operation(
            summary = "Actualizar un producto",
            description = "Actualiza los datos de un producto existente",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Producto actualizado exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ProductResponseDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable UUID idProduct, @ModelAttribute @Valid ProductUpdateDTO productRequestDTO) {
        ProductResponseDTO productResponseDTO = productService.updateProduct(idProduct, productRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(productResponseDTO);
    }

    @DeleteMapping("/{idProduct}")
    @Operation(
            summary = "Eliminar un producto",
            description = "Elimina un producto por su ID",
            security = @SecurityRequirement(name = "cookieAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Producto eliminado exitosamente"
                    )
            }
    )
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID idProduct) {
        productService.deleteProduct(idProduct);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
