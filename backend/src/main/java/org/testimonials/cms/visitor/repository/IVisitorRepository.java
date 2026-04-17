package org.testimonials.cms.visitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.visitor.model.Visitor;

import java.util.UUID;

@Repository
public interface IVisitorRepository extends JpaRepository<Visitor, UUID> {
    @Modifying
    @Query(value = "INSERT INTO visitors (id, name, email, created_at) VALUES (gen_random_uuid(), :name, :email, CURRENT_TIMESTAMP)", nativeQuery = true)
    void insertVisitor(@Param("name") String name, @Param("email") String email);

    @Query(value = "SELECT * FROM visitors WHERE email = :email ORDER BY created_at DESC LIMIT 1", nativeQuery = true)
    Visitor findByEmailNative(@Param("email") String email);
}
