package org.testimonials.cms.product.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.cloudinary.dto.CloudinaryUploadResponseDTO;
import org.testimonials.cms.cloudinary.service.CloudinaryService;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.product.dtos.ProductRequestDTO;
import org.testimonials.cms.product.dtos.ProductResponseDTO;
import org.testimonials.cms.product.dtos.ProductUpdateDTO;
import org.testimonials.cms.product.exception.ProductNotFound;
import org.testimonials.cms.product.mapper.ProductMapper;
import org.testimonials.cms.product.model.Product;
import org.testimonials.cms.product.repository.IProductRepository;
import org.testimonials.cms.product.service.IProductService;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.tag.model.Tag;
import org.testimonials.cms.tag.repository.ITagRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {
    private final IProductRepository productRepository;

    private final ProductMapper productMapper;

    private final CloudinaryService cloudinaryService;

    private final ITagRepository tagRepository;

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
        product.setShareCode(NanoIdUtils.randomNanoId());
        product.setCreatedBy(customUserPrincipal.user());
        product.setOrganization(new Organization(customUserPrincipal.organizationId()));

        Product newProduct = productRepository.save(product);

        // 5. Procesar tags (findOrCreate)
        if (productRequestDTO.tags() != null && !productRequestDTO.tags().isEmpty()) {
            UUID orgId = customUserPrincipal.organizationId();
            List<Tag> productTags = new ArrayList<>();

            for (String tagName : productRequestDTO.tags()) {
                Tag tag = tagRepository.findByNameIgnoreCaseAndOrganizationId(tagName.trim(), orgId)
                        .orElseGet(() -> {
                            Tag newTag = new Tag();
                            newTag.setName(tagName.trim());
                            newTag.setOrganizationId(orgId);
                            return tagRepository.save(newTag);
                        });
                productTags.add(tag);
            }

            newProduct.setTags(productTags);
            newProduct = productRepository.save(newProduct);
        }

        return productMapper.toProductDTO(newProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> listAllProducts() {
        return productMapper.toProductDTO(productRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponseDTO listProduct(UUID idProduct) {
        Optional<Product> productFound = productRepository.findById(idProduct);

        if (productFound.isEmpty()) throw ProductNotFound.of(idProduct);

        return productMapper.toProductDTO(productRepository.getReferenceById(idProduct));
    }

    @Override
    @Transactional
    public ProductResponseDTO updateProduct(UUID idProduct,ProductUpdateDTO productUpdateDTO) {
        Product productFound = productRepository.findById(idProduct)
                .orElseThrow(() -> ProductNotFound.of(idProduct));

        Product productNotModified = productRepository.getReferenceById(idProduct);

        if (productUpdateDTO.name() != null) productNotModified.setName(productUpdateDTO.name());
        if (productUpdateDTO.description() != null) productNotModified.setDescription(productUpdateDTO.description());

        if (productUpdateDTO.picture() != null && !productUpdateDTO.picture().isEmpty()) {
            try {

                if (productFound.getPicture() != null) {
                    cloudinaryService.deleteFile(productFound.getPublicId());
                }

                CloudinaryUploadResponseDTO response = cloudinaryService.uploadImage(productUpdateDTO.picture());

                productNotModified.setPicture(response.secureUrl());
                productNotModified.setPublicId(response.publicId());
            } catch (IOException e) {
                throw new RuntimeException("Error técnico al procesar los bytes de la imagen", e);
            } catch (Exception e) {
                throw new RuntimeException("Error inesperado al subir la imagen a Cloudinary", e);
            }
        }

        // Procesar tags
        if (productUpdateDTO.tags() != null && !productUpdateDTO.tags().isEmpty()) {
            UUID orgId = productNotModified.getOrganizationId();
            List<Tag> productTags = new ArrayList<>();

            for (String tagName : productUpdateDTO.tags()) {
                Tag tag = tagRepository.findByNameIgnoreCaseAndOrganizationId(tagName.trim(), orgId)
                        .orElseGet(() -> {
                            Tag newTag = new Tag();
                            newTag.setName(tagName.trim());
                            newTag.setOrganizationId(orgId);
                            return tagRepository.save(newTag);
                        });
                productTags.add(tag);
            }

            productNotModified.setTags(productTags);
        }

        Product productModified = productRepository.save(productNotModified);

        return productMapper.toProductDTO(productModified);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID idProduct) {
        Optional<Product> productFound = productRepository.findById(idProduct);

        if (productFound.isEmpty()) throw ProductNotFound.of(idProduct);

        String publicId = productFound.get().getPublicId();
        if (publicId != null && !publicId.isEmpty()) {
            try {
                cloudinaryService.deleteFile(publicId);
            } catch (IOException e) {
                // Imagen huérfana en Cloudinary, continuar con eliminación
            }
        }

        productRepository.deleteById(idProduct);
    }
}
