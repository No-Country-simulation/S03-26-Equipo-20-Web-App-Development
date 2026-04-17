package org.testimonials.cms.testimonial.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.util.List;
import java.util.UUID;

public interface ITestimonialRepository extends JpaRepository<Testimonial, UUID> {
    @Query("SELECT t FROM Testimonial t " +
            "JOIN FETCH t.visitor v " +
            "LEFT JOIN FETCH t.medias m")
    List<Testimonial> findAllWithRelations();

    // Versión con Paginación
    @Query(value = "SELECT t FROM Testimonial t " +
            "JOIN FETCH t.visitor v " +
            "LEFT JOIN FETCH t.medias m",
            countQuery = "SELECT count(t) FROM Testimonial t")
    Page<Testimonial> findAllWithRelationsPageable(Pageable pageable);
}
