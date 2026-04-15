package org.testimonials.cms.media.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TenantId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.testimonials.cms.media.enums.MediaProvider;
import org.testimonials.cms.media.enums.MediaType;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "Media")
@Table(
        name = "medias",
        indexes = {
                @Index(name = "idx_medias_org", columnList = "organization_id"),
                @Index(name = "idx_medias_testimonial", columnList = "testimonial_id")
        }
)
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "testimonial_id")
    private Testimonial testimonial;

    @TenantId
    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", insertable = false, updatable = false)
    private Organization organization;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaProvider provider;

    @Column(nullable = false)
    private String url;

    @Column(name = "public_id")
    private String publicId;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    private Integer duration;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
