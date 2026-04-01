package org.testimonials.cms.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "modules")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Module {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @NotBlank
    @Column(name = "module_name",nullable = false, unique = true)
    private String moduleName;

    @NotBlank
    @Column(name = "base_path",nullable = false, unique = true)
    private String basePath;

    @JsonIgnore
    @OneToMany(mappedBy = "module")
    private List<Operation> operations;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
