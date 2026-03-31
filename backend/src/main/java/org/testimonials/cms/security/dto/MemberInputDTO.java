package org.testimonials.cms.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.testimonials.cms.security.model.MembershipType;

public record MemberInputDTO (
        @NotBlank
        String name,
        @NotBlank
        @Email
        String email,
        @NotNull
        MembershipType type,
        @NotBlank
        String password
){
}
