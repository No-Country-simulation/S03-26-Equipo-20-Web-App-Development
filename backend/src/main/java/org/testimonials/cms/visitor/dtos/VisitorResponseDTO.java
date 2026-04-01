package org.testimonials.cms.visitor.dtos;

import org.testimonials.cms.visitor.model.Visitor;

import java.util.UUID;

public record VisitorResponseDTO(
        UUID id,
        String name,
        String email
    ) {
    public VisitorResponseDTO(Visitor visitor) {
        this(visitor.getId(), visitor.getName(), visitor.getEmail());
    }
}
