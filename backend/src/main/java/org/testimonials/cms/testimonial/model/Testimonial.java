package org.testimonials.cms.testimonial.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.review.model.Review;
import org.testimonials.cms.visitor.model.Visitor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity(name = "Testimonial")
@Table(name = "testimonials")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String title;
    private String content;
    @Enumerated(EnumType.STRING)
    private TestimonialStatus status;
    @OneToMany(mappedBy = "testimonial", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Review> reviews;
    @JoinColumn(name = "organization_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Organization organization;
    @JoinColumn(name = "visitor_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Visitor visitor;
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
