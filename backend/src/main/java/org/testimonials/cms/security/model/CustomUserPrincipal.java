package org.testimonials.cms.security.model;

import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.testimonials.cms.security.exception.SecurityDataNotFoundException;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;


public record CustomUserPrincipal(User user, UUID organizationId) implements UserDetails {

    @Override
    public @NonNull Collection<? extends GrantedAuthority> getAuthorities() {
        if (organizationId == null) {
            return Collections.emptyList();
        }
        return user.getMemberships().stream()
                .filter(m -> m.getOrganization().getId().equals(organizationId))
                .filter(m -> m.getStatus() == MembershipStatus.ACTIVE)
                .findFirst()
                .map(Membership::buildAuthorities)
                .orElseThrow(() -> new SecurityDataNotFoundException("Invalid organization context"));
    }

    @Override
    public @Nullable String getPassword() {
        return user.getPassword();
    }

    @Override
    public @NonNull String getUsername() {
        return user.getEmail();
    }

}
