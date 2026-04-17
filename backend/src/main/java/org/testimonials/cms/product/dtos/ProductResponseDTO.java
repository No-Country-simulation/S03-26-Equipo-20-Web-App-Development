package org.testimonials.cms.product.dtos;

import org.testimonials.cms.product.model.Product;
import org.testimonials.cms.tag.dto.TagResponseDTO;

import java.util.List;
import java.util.UUID;

public record ProductResponseDTO(
        UUID id,
        String name,
        String description,
        String picture,
        String publicId,
        String shareCode,
        List<TagResponseDTO> tags
) {
    public ProductResponseDTO(Product product) {
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPicture(),
                product.getPublicId(),
                product.getShareCode(),
                product.getTags() != null
                        ? product.getTags().stream()
                          .map(t -> new TagResponseDTO(t.getId(), t.getName(), 0, t.getCreatedAt(), t.getUpdatedAt()))
                          .toList()
                        : List.of()
        );
    }
}
