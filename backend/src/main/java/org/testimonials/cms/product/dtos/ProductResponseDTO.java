package org.testimonials.cms.product.dtos;

import org.testimonials.cms.product.model.Product;

import java.util.UUID;

public record ProductResponseDTO(
        UUID id,
        String name,
        String description,
        String picture
    ) {
    public ProductResponseDTO(Product product) {
        this(product.getId(), product.getName(), product.getDescription(), product.getPicture());
    }
}
