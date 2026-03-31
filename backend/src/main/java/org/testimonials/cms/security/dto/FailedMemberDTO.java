package org.testimonials.cms.security.dto;

public record FailedMemberDTO(
    int index,
    String email,
    String reason
) {
}
