package org.testimonials.cms.product.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.cloudinary.dto.CloudinaryUploadResponseDTO;
import org.testimonials.cms.cloudinary.service.CloudinaryService;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.product.dtos.ProductRequestDTO;
import org.testimonials.cms.product.dtos.ProductResponseDTO;
import org.testimonials.cms.product.exception.ProductNotFound;
import org.testimonials.cms.product.mapper.ProductMapper;
import org.testimonials.cms.product.model.Product;
import org.testimonials.cms.product.repository.IProductRepository;
import org.testimonials.cms.product.service.IProductService;
import org.testimonials.cms.security.model.CustomUserPrincipal;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {
    private final IProductRepository IProductRepository;

    private final ProductMapper productMapper;

    private final CloudinaryService cloudinaryService;

    @Override
    @Transactional
    public ProductResponseDTO createProduct(CustomUserPrincipal customUserPrincipal, ProductRequestDTO productRequestDTO) {
        // 1. Mapear datos básicos (picture sigue siendo null aquí)
        Product product = productMapper.toProduct(productRequestDTO);

        // 2. Lógica de subida corregida: !isEmpty()
        // Verificamos que no sea nulo Y que contenga datos
        if (productRequestDTO.picture() != null && !productRequestDTO.picture().isEmpty()) {
            try {
                // Usamos el nuevo CloudinaryService inyectado
                CloudinaryUploadResponseDTO response = cloudinaryService.uploadImage(productRequestDTO.picture());

                // 3. Asignamos la URL a la entidad
                product.setPicture(response.secureUrl());
                product.setPublicId(response.publicId());
            } catch (IOException e) {
                // Manejo de error de entrada/salida de bytes
                throw new RuntimeException("Error técnico al procesar los bytes de la imagen", e);
            } catch (Exception e) {
                // Otros errores
                throw new RuntimeException("Error inesperado al subir la imagen a Cloudinary", e);
            }
        }

        // 4. Seteamos createdBy y organization_id, y los guardamos
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

        if (productRequestDTO.picture() != null && !productRequestDTO.picture().isEmpty()) {
            try {
                // Usamos el nuevo CloudinaryService inyectado
                CloudinaryUploadResponseDTO response = cloudinaryService.uploadImage(productRequestDTO.picture());

                // 3. Asignamos la URL a la entidad
                productNotModified.setPicture(response.secureUrl());
            } catch (IOException e) {
                // Manejo de error de entrada/salida de bytes
                throw new RuntimeException("Error técnico al procesar los bytes de la imagen", e);
            } catch (Exception e) {
                // Otros errores
                throw new RuntimeException("Error inesperado al subir la imagen a Cloudinary", e);
            }
        }

        Product productModified = IProductRepository.save(productNotModified);

        return productMapper.toProductDTO(productModified);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID idProduct) {
        Optional<Product> productFound = IProductRepository.findById(idProduct);

        if (productFound.isEmpty()) throw ProductNotFound.of(idProduct);

        try {
            cloudinaryService.deleteFile(productFound.get().getPublicId());
        } catch (IOException e) {
            throw new RuntimeException("Error al eliminar la imagen de este producto: "+idProduct);
        }

        IProductRepository.deleteById(idProduct);

    }
}
