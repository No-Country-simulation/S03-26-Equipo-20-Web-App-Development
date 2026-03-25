package org.testimonials.cms.security.config.filter;

import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.security.repository.IUserRepository;
import org.testimonials.cms.security.services.IJwtService;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtsAuthenticationFilter extends OncePerRequestFilter {

    private final IJwtService jwtService;
    private final IUserRepository userRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String jwt = jwtService.extractJwtTokenFromRequest(request);

        if (jwt == null || jwt.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated()) {
            filterChain.doFilter(request, response);
            return;
        }

        Optional<JWTClaimsSet> claimsOpt = jwtService.getValidClaims(jwt);

        if (claimsOpt.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        JWTClaimsSet claims = claimsOpt.get();
        String username = claims.getSubject();
        String orgIdStr = (String) claims.getClaim("orgId");

        if (orgIdStr == null) {
            filterChain.doFilter(request, response);
            return;
        }

        UUID orgId = UUID.fromString(orgIdStr);

        var user = userRepository.findByEmailWithMemberships(username)
                .orElse(null);

        if (user == null) {
            filterChain.doFilter(request, response);
            return;
        }

        CustomUserPrincipal principal = new CustomUserPrincipal(user, orgId);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        principal,
                        null,
                        principal.getAuthorities()
                );

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        filterChain.doFilter(request, response);
    }
}
