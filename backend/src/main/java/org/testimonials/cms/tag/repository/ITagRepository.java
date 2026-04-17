package org.testimonials.cms.tag.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.testimonials.cms.tag.dto.TagResponseDTO;
import org.testimonials.cms.tag.model.Tag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ITagRepository extends JpaRepository<Tag, UUID> {
    Optional<Tag> findByNameIgnoreCaseAndOrganizationId(String name, UUID organizationId);
    @Query("""
                SELECT new org.testimonials.cms.tag.dto.TagResponseDTO(
                    t.id,
                    t.name,
                    COUNT(p.id),
                    t.createdAt,
                    t.updatedAt
                )
                FROM Tag t
                LEFT JOIN t.products p
                WHERE t.organizationId = :organizationId
                GROUP BY t.id, t.name, t.createdAt, t.updatedAt
            """)
    Page<TagResponseDTO> findAllWithCount(UUID organizationId, Pageable pageable);

    @Query("""
                SELECT new org.testimonials.cms.tag.dto.TagResponseDTO(
                    t.id,
                    t.name,
                    COUNT(p.id),
                    t.createdAt,
                    t.updatedAt
                )
                FROM Tag t
                LEFT JOIN t.products p
                WHERE t.id = :tagId
                  AND t.organizationId = :organizationId
                GROUP BY t.id, t.name, t.createdAt, t.updatedAt
            """)
    Optional<TagResponseDTO> findByIdWithCount(UUID tagId, UUID organizationId);

    @Query("""
                SELECT new org.testimonials.cms.tag.dto.TagResponseDTO(
                    t.id,
                    t.name,
                    COUNT(p.id),
                    t.createdAt,
                    t.updatedAt
                )
                FROM Tag t
                LEFT JOIN t.products p
                WHERE t.name = :name
                  AND t.organizationId = :organizationId
                GROUP BY t.id, t.name, t.createdAt, t.updatedAt
            """)
    Optional<TagResponseDTO> findByNameWithCount(String name, UUID organizationId);

    @Query("""
                SELECT new org.testimonials.cms.tag.dto.TagResponseDTO(
                    t.id,
                    t.name,
                    COUNT(p.id),
                    t.createdAt,
                    t.updatedAt
                )
                FROM Tag t
                LEFT JOIN t.products p
                WHERE t.organizationId = :organizationId
                GROUP BY t.id, t.name, t.createdAt, t.updatedAt
                ORDER BY COUNT(p.id) DESC
            """)
    List<TagResponseDTO> findTopTagsOrderedByCount(UUID organizationId, Pageable pageable);
}
