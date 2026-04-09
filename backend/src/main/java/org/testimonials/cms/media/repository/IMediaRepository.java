package org.testimonials.cms.media.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.media.model.Media;

import java.util.List;
import java.util.UUID;

@Repository
public interface IMediaRepository extends JpaRepository<Media, UUID> {
    List<Media> findByTestimonialId(UUID testimonialId);
}
