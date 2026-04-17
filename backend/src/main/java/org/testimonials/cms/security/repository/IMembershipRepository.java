package org.testimonials.cms.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.security.model.Membership;

import java.util.UUID;

@Repository
public interface IMembershipRepository extends JpaRepository<Membership, UUID> {
}
