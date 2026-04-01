package org.testimonials.cms.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.security.model.User;
import org.testimonials.cms.security.repository.IUserRepository;

@Configuration
@RequiredArgsConstructor
public class SecurityBeansInjector {

    private final IUserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepository.findByEmailWithMemberships(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
            return new CustomUserPrincipal(user,null);
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}

