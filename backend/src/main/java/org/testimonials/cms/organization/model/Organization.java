package org.testimonials.cms.organization.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.testimonials.cms.product.model.Product;
import org.testimonials.cms.review.model.Review;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity(name = "Organization")
@Table(name = "organizations")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String logo;
    @OneToMany(mappedBy = "organization", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Product> products;
    @OneToMany(mappedBy = "organization", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Testimonial> testimonials;
    @OneToMany(mappedBy = "organization", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Review> reviews;
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Organization(UUID id) {
        this.id = id;
    }
}
