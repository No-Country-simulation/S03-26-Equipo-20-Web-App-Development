package org.testimonials.cms.tag.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TenantId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.testimonials.cms.product.model.Product;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "Tag")
@Table(
        name = "tags",
        indexes = {
                @Index(name = "idx_tags_org", columnList = "organization_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_tag_org_name", columnNames = {"organization_id", "name"})
        }
)
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @TenantId
    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @JsonIgnore
    @ManyToMany(mappedBy = "tags")
    private List<Product> products = new ArrayList<>();

    @Transient
    private int usageCount;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
