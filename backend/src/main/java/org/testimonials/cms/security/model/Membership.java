package org.testimonials.cms.security.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.testimonials.cms.organization.model.Organization;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "memberships",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "organization_id"})
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Membership {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "membership_roles",
            joinColumns = @JoinColumn(name = "membership_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private MembershipStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private MembershipType type;

    @CreatedDate
    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    public Collection<GrantedAuthority> buildAuthorities() {

        Set<GrantedAuthority> authorities = new HashSet<>();

        for (Role role : roles) {
            if (role.getOperations() != null) {
                for (Operation operation : role.getOperations()) {

                    String basePath = operation.getModule() != null
                            ? operation.getModule().getBasePath()
                            : "";

                    String path = operation.getPath() != null
                            ? operation.getPath()
                            : "";

                    String fullPath = (basePath + path).toLowerCase().trim();

                    authorities.add(
                            new SimpleGrantedAuthority(
                                    operation.getHttpMethod().name() + ":" + fullPath
                            )
                    );
                }
            }

            authorities.add(
                    new SimpleGrantedAuthority("ROLE_" + role.getRoleName())
            );
        }

        return authorities;
    }
}