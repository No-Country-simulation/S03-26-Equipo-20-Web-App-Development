package org.testimonials.cms.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import org.testimonials.cms.tag.model.Tag;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "Product")
@Table(
        name = "products",
        indexes = {
                @Index(name = "idx_products_organization_id", columnList = "organization_id"),
                @Index(name = "idx_products_share_code", columnList = "share_code")
        }
)
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "name", nullable = false)
    private String name;
    private String description;
    private String picture;
    @Column(name = "public_id")
    private String publicId;
    @Column(name = "share_code", nullable = false, unique = true)
    private String shareCode;
    @JoinColumn(name = "created_by")
    @ManyToOne(fetch = FetchType.LAZY)
    private User createdBy;
    @TenantId
    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", insertable = false, updatable = false)
    private Organization organization;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "product_tags",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"),
            uniqueConstraints = @UniqueConstraint(name = "uk_product_tag", columnNames = {"product_id", "tag_id"}),
            indexes = {
                    @Index(name = "idx_product_tags_tag", columnList = "tag_id")
            }
    )
    private List<Tag> tags = new ArrayList<>();
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
