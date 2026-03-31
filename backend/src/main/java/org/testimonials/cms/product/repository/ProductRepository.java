package org.testimonials.cms.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.testimonials.cms.product.model.Product;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
}
