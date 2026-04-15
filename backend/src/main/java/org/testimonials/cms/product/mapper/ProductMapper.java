package org.testimonials.cms.product.mapper;

import org.mapstruct.Mapper;
import org.testimonials.cms.product.dtos.ProductRequestDTO;
import org.testimonials.cms.product.dtos.ProductResponseDTO;
import org.testimonials.cms.product.model.Product;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(ProductRequestDTO productRequestDTO);

    ProductResponseDTO toProductDTO(Product product);

    List<ProductResponseDTO> toProductDTO(List<Product> products);
}
