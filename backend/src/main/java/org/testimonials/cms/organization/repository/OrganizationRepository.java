package org.testimonials.cms.organization.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.testimonials.cms.organization.model.Organization;

import java.util.UUID;

public interface OrganizationRepository extends JpaRepository<Organization, UUID> {
}
