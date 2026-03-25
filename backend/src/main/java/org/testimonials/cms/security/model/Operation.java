package org.testimonials.cms.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "operations")
@Data
@NoArgsConstructor
public class Operation {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @NotBlank
    @Column(name = "name",nullable = false,unique = true)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "http_method",nullable = false)
    private HttpMethod httpMethod;

    private String path;

    @NotNull
    @Column(name = "permit_all",nullable = false)
    private Boolean permitAll;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "module_id",nullable = false)
    private Module module;

    @JsonIgnore
    @ManyToMany(mappedBy = "operations")
    private List<Role> roles;

}
