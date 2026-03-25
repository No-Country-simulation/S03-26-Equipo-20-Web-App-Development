package org.testimonials.cms.testimonial.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.util.UUID;

public interface TestimonialRepository extends JpaRepository<Testimonial, UUID> {
}
