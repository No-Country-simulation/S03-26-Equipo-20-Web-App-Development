package org.testimonials.cms.visitor.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.testimonials.cms.testimonial.model.Testimonial;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "Visitor")
@Table(name = "visitors")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Visitor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String email;
    @OneToMany(mappedBy = "visitor", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private java.util.List<Testimonial> testimonials;
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
