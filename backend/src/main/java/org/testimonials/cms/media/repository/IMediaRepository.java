package org.testimonials.cms.media.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.media.model.Media;

import java.util.List;
import java.util.UUID;

@Repository
public interface IMediaRepository extends JpaRepository<Media, UUID> {

    @Modifying
    @Query(value = "INSERT INTO medias (id, type, provider, url, public_id, testimonial_id, organization_id, created_at) VALUES (gen_random_uuid(), CAST(:type AS media_type), CAST(:provider AS media_provider), :url, :publicId, :testimonialId, :organizationId, CURRENT_TIMESTAMP)", nativeQuery = true)
    void insertMedia(@Param("type") String type, @Param("provider") String provider, @Param("url") String url, @Param("publicId") String publicId, @Param("testimonialId") UUID testimonialId, @Param("organizationId") UUID organizationId);
}
