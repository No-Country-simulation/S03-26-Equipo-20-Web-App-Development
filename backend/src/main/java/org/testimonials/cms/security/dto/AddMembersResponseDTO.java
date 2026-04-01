package org.testimonials.cms.security.dto;

import java.util.List;

public record AddMembersResponseDTO(
    List<MemberResponseDTO> successful,
    List<FailedMemberDTO> failed
) {
}
