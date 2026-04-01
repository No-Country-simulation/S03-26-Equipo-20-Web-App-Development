package org.testimonials.cms.visitor.service;

import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;
import org.testimonials.cms.visitor.dtos.VisitorResponseDTO;

import java.util.List;
import java.util.UUID;

public interface IVisitorService {
//    VisitorResponseDTO createVisitor(VisitorRequestDTO visitorRequestDTO);
    List<VisitorResponseDTO> listAllVisitors();
    VisitorResponseDTO listVisitor(UUID id);
    VisitorResponseDTO updateVisitor(UUID id, VisitorRequestDTO visitorRequestDTO);
    void deleteVisitor(UUID id);
}
