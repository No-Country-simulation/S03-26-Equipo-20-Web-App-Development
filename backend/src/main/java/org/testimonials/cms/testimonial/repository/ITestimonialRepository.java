package org.testimonials.cms.testimonial.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.util.UUID;

@Repository
public interface ITestimonialRepository extends JpaRepository<Testimonial, UUID> {
    @Query("""
        SELECT t FROM Testimonial t
        JOIN FETCH t.visitor v
        LEFT JOIN FETCH t.medias m
        WHERE t.id = :idTestimonio
    """)
    Testimonial findAllWithRelations(@Param("idTestimonial") String idTestimonial);

    // Versión con Paginación
    @Query(value = "SELECT t FROM Testimonial t " +
            "JOIN FETCH t.visitor v " +
            "LEFT JOIN FETCH t.medias m",
            countQuery = "SELECT count(t) FROM Testimonial t")
    Page<Testimonial> findAllWithRelationsPageable(Pageable pageable);

    @Modifying
    @Query(value = "INSERT INTO testimonials (id, title, content, status, visitor_id, organization_id, product_id, created_at, updated_at) VALUES (gen_random_uuid(), :title, :content, 'PENDING', :visitorId, :organizationId, :productId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", nativeQuery = true)
    void insertTestimonial(@Param("title") String title, @Param("content") String content, @Param("visitorId") UUID visitorId, @Param("organizationId") UUID organizationId, @Param("productId") UUID productId);

    @Query(value = "SELECT * FROM testimonials WHERE visitor_id = :visitorId ORDER BY created_at DESC LIMIT 1", nativeQuery = true)
    Testimonial findByVisitorIdNative(@Param("visitorId") UUID visitorId);
}
