package org.testimonials.cms.security.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record AddMembersRequestDTO(
    @NotEmpty
    List<MemberInputDTO> members
) {
}
