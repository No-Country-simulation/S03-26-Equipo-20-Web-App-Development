package org.testimonials.cms.visitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.testimonials.cms.visitor.model.Visitor;

import java.util.UUID;

public interface IVisitorRepository extends JpaRepository<Visitor, UUID> {
}
