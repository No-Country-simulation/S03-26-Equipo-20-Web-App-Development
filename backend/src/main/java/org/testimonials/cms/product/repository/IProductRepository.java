package org.testimonials.cms.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.testimonials.cms.product.model.Product;

import java.util.List;
import java.util.UUID;

public interface IProductRepository extends JpaRepository<Product, UUID> {
    @Query("""
    SELECT t.id, COUNT(p)
    FROM Product p
    JOIN p.tags t
    WHERE p.organizationId = :organizationId
    GROUP BY t.id
""")
    List<Object[]> countProductsByTagIdGrouped(UUID organizationId);
}
