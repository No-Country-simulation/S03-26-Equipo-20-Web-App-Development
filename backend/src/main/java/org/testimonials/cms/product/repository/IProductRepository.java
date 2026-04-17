package org.testimonials.cms.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.product.model.Product;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IProductRepository extends JpaRepository<Product, UUID> {
    @Query(value = """
            SELECT
                p.name AS name,
                p.picture AS picture,
                p.description AS description
            FROM products p
            WHERE p.share_code = :shareCode
            """, nativeQuery = true)
    Optional<ProductPublicProjection> findPublicByShareCodeNative(@Param("shareCode") String shareCode);

    @Query(value = "SELECT COUNT(*) > 0 FROM products WHERE share_code = :shareCode", nativeQuery = true)
    boolean existsByShareCode(@Param("shareCode") String shareCode);

    @Query(value = "SELECT organization_id FROM products WHERE share_code = :shareCode", nativeQuery = true)
    Optional<UUID> findOrganizationIdByShareCode(@Param("shareCode") String shareCode);

    Optional<Product> findByShareCode(String shareCode);

    @Query(value = "SELECT id, name, description, picture, public_id, share_code, organization_id, created_by, created_at, updated_at FROM products WHERE share_code = :shareCode", nativeQuery = true)
    Optional<Product> findProductByShareCodeNative(@Param("shareCode") String shareCode);
}
