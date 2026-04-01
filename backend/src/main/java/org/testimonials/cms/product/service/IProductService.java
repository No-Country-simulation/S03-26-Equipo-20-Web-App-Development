package org.testimonials.cms.product.service;

import org.testimonials.cms.product.dtos.ProductRequestDTO;
import org.testimonials.cms.product.dtos.ProductResponseDTO;
import org.testimonials.cms.security.model.CustomUserPrincipal;

import java.util.List;
import java.util.UUID;

public interface IProductService {
    ProductResponseDTO createProduct(CustomUserPrincipal customUserPrincipal, ProductRequestDTO productRequestDTO);
    List<ProductResponseDTO> listAllProducts();
    ProductResponseDTO listProduct(UUID id);
    ProductResponseDTO updateProduct(UUID id, ProductRequestDTO productRequestDTO);
    void deleteProduct(UUID id);
}
