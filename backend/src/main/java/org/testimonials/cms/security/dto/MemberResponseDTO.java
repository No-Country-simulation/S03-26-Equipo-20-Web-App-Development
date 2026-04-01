package org.testimonials.cms.security.dto;

import org.testimonials.cms.security.model.MembershipStatus;
import org.testimonials.cms.security.model.MembershipType;

import java.util.UUID;

public record MemberResponseDTO(
    UUID userId,
    String name,
    String email,
    MembershipType type,
    MembershipStatus status
) {
}
