package org.testimonials.cms.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.tag.model.Tag;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ITagRepository extends JpaRepository<Tag, UUID> {
    Optional<Tag> findByNameAndOrganizationId(String name, UUID organizationId);
}
