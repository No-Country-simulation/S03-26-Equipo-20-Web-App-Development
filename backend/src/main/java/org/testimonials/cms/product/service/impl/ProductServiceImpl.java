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
import org.testimonials.cms.product.repository.IProductRepository;
import org.testimonials.cms.product.service.IProductService;
import org.testimonials.cms.security.model.CustomUserPrincipal;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements IProductService {
    private final IProductRepository IProductRepository;

    private final ProductMapper productMapper;

    @Override
    @Transactional
    public ProductResponseDTO createProduct(CustomUserPrincipal customUserPrincipal, ProductRequestDTO productRequestDTO) {
        Product product = productMapper.toProduct(productRequestDTO);
        product.setCreatedBy(customUserPrincipal.user());
        product.setOrganization(new Organization(customUserPrincipal.organizationId()));
        Product newProduct = IProductRepository.save(product);
        return productMapper.toProductDTO(newProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> listAllProducts() {
        return productMapper.toProductDTO(IProductRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponseDTO listProduct(UUID idProduct) {
        Optional<Product> productFound = IProductRepository.findById(idProduct);

        if (productFound.isEmpty()) throw ProductNotFound.of(idProduct);

        return productMapper.toProductDTO(IProductRepository.getReferenceById(idProduct));
    }

    @Override
    @Transactional
    public ProductResponseDTO updateProduct(UUID idProduct, ProductRequestDTO productRequestDTO) {
        Optional<Product> productFound = IProductRepository.findById(idProduct);

        if (productFound.isEmpty()) throw ProductNotFound.of(idProduct);

        Product productNotModified = IProductRepository.getReferenceById(idProduct);

        if (productRequestDTO.name() != null) productNotModified.setName(productRequestDTO.name());
        if (productRequestDTO.description() != null) productNotModified.setDescription(productRequestDTO.description());
        if (productRequestDTO.picture() != null) productNotModified.setPicture(productRequestDTO.picture());

        Product productModified = IProductRepository.save(productNotModified);

        return productMapper.toProductDTO(productModified);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID idProduct) {
        Optional<Product> productFound = IProductRepository.findById(idProduct);

        if (productFound.isEmpty()) throw ProductNotFound.of(idProduct);

        IProductRepository.deleteById(idProduct);

    }
}
