package org.testimonials.cms.product.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.testimonials.cms.product.dtos.ProductRequestDTO;
import org.testimonials.cms.product.dtos.ProductResponseDTO;
import org.testimonials.cms.product.service.IProductService;
import org.testimonials.cms.security.model.CustomUserPrincipal;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {
    private final IProductService productService;

    @PostMapping("/register")
    public ResponseEntity<ProductResponseDTO> createProduct(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal, @RequestBody @Valid ProductRequestDTO productRequestDTO) {
        ProductResponseDTO productResponseDTO = productService.createProduct(customUserPrincipal, productRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(productResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> listAllProducts() {
        List<ProductResponseDTO> productResponseDTOS = productService.listAllProducts();

        return ResponseEntity.status(HttpStatus.OK).body(productResponseDTOS);
    }

    @GetMapping("/{idProduct}")
    public ResponseEntity<ProductResponseDTO> listProduct(@PathVariable UUID idProduct) {
        ProductResponseDTO productResponseDTO = productService.listProduct(idProduct);

        return ResponseEntity.status(HttpStatus.OK).body(productResponseDTO);
    }

    @PutMapping("/{idProduct}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable UUID idProduct, @RequestBody @Valid ProductRequestDTO productRequestDTO) {
        ProductResponseDTO productResponseDTO = productService.updateProduct(idProduct, productRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(productResponseDTO);
    }

    @DeleteMapping("/{idProduct}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID idProduct) {
        productService.deleteProduct(idProduct);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
