package org.testimonials.cms.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.security.model.User;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IUserRepository extends JpaRepository<User, UUID> {
    @Query("""
                SELECT DISTINCT u FROM User u
                LEFT JOIN FETCH u.memberships m
                LEFT JOIN FETCH m.organization
                LEFT JOIN FETCH m.roles r
                LEFT JOIN FETCH r.operations o
                LEFT JOIN FETCH o.module
                WHERE u.email = :email
            """)
    Optional<User> findByEmailWithMemberships(String email);

    boolean existsByEmail(String email);

    @Query("""
            SELECT m.type FROM User u
            JOIN u.memberships m
            WHERE u.email = :email
        """)
    String findRoleByEmailWithMembership(@Param("email") String email);
}
