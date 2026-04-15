package org.testimonials.cms.review.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TenantId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.security.model.User;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "Review")
@Table(
        name = "reviews",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_review_testimonial_reviewer", columnNames = {"testimonial_id", "reviewer_id"})
        },
        indexes = {
                @Index(name = "idx_reviews_org", columnList = "organization_id"),
                @Index(name = "idx_reviews_testimonial", columnList = "testimonial_id")
        }
)
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Enumerated(EnumType.STRING)
    private ReviewStatus status;
    @Column(columnDefinition = "TEXT")
    private String comment;
    @JoinColumn(name = "testimonial_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Testimonial testimonial;
    @JoinColumn(name = "reviewer_id",nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private User reviewer;
    @TenantId
    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", insertable = false, updatable = false)
    private Organization organization;
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
