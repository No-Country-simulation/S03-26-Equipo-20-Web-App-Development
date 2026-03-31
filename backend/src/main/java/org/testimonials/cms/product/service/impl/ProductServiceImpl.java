package org.testimonials.cms.product.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.product.dtos.ProductRequestDTO;
import org.testimonials.cms.product.dtos.ProductResponseDTO;
import org.testimonials.cms.product.exception.ProductNotFound;
import org.testimonials.cms.product.mapper.ProductMapper;
import org.testimonials.cms.product.model.Product;
import org.testimonials.cms.product.repository.ProductRepository;
import org.testimonials.cms.product.service.IProductService;
import org.testimonials.cms.review.exception.UserNotFound;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.security.model.User;
import org.testimonials.cms.security.repository.IUserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements IProductService {
    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    @Override
    @Transactional
    public ProductResponseDTO createProduct(CustomUserPrincipal customUserPrincipal, ProductRequestDTO productRequestDTO) {
        Product product = productMapper.toProduct(productRequestDTO);
        product.setCreatedBy(customUserPrincipal.user());
        product.setOrganization(new Organization(customUserPrincipal.organizationId()));
        Product newProduct = productRepository.save(product);
        return productMapper.toProductDTO(newProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> listAllProducts() {
        return productMapper.toProductDTO(productRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponseDTO listProduct(UUID id) {
        Optional<Product> productFound = productRepository.findById(id);

        if (productFound.isEmpty()) throw ProductNotFound.of(id);

        return productMapper.toProductDTO(productRepository.getReferenceById(id));
    }

    @Override
    @Transactional
    public ProductResponseDTO updateProduct(UUID id, ProductRequestDTO productRequestDTO) {
        Optional<Product> productFound = productRepository.findById(id);

        if (productFound.isEmpty()) throw ProductNotFound.of(id);

        Product productNotModified = productRepository.getReferenceById(id);

        if (productRequestDTO.name() != null) productNotModified.setName(productRequestDTO.name());
        if (productRequestDTO.description() != null) productNotModified.setDescription(productRequestDTO.description());
        if (productRequestDTO.picture() != null) productNotModified.setPicture(productRequestDTO.picture());

        Product productModified = productRepository.save(productNotModified);

        return productMapper.toProductDTO(productModified);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID id) {
        Optional<Product> productFound = productRepository.findById(id);

        if (productFound.isEmpty()) throw ProductNotFound.of(id);

        productRepository.deleteById(id);

    }
}
