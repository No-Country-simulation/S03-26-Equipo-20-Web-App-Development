package org.testimonials.cms.visitor.mapper;

import org.mapstruct.Mapper;
import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;
import org.testimonials.cms.visitor.dtos.VisitorResponseDTO;
import org.testimonials.cms.visitor.model.Visitor;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VisitorMapper {
    Visitor toVisitor(VisitorRequestDTO visitorRequestDTO);

    VisitorResponseDTO toVisitorDTO(Visitor visitor);

    List<VisitorResponseDTO> toVisitorListDTOs(List<Visitor> visitors);
}
