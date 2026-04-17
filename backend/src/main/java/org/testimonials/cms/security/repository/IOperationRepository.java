package org.testimonials.cms.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.security.model.Operation;

import java.util.List;
import java.util.UUID;

@Repository
public interface IOperationRepository extends JpaRepository<Operation, UUID> {
    List<Operation> findAllByPermitAllIsTrue();
}
