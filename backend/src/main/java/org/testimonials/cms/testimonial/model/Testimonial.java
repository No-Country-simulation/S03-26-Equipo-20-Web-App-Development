package org.testimonials.cms.testimonial.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.TenantId;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.testimonials.cms.media.model.Media;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.review.model.Review;
import org.testimonials.cms.visitor.model.Visitor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity(name = "Testimonial")
@Table(
        name = "testimonials",
        indexes = {
                @Index(name = "idx_testimonials_org", columnList = "organization_id")
        }
)
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "title", nullable = false)
    private String title;
    private String content;
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", columnDefinition = "testimonial_status")
    private TestimonialStatus status;
    @OneToMany(mappedBy = "testimonial", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Review> reviews;
    @TenantId
    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", insertable = false, updatable = false)
    private Organization organization;
    @JoinColumn(name = "visitor_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Visitor visitor;
    @OneToMany(mappedBy = "testimonial", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Media> medias;
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
