package org.testimonials.cms.visitor.service;

import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;
import org.testimonials.cms.visitor.dtos.VisitorResponseDTO;

import java.util.List;
import java.util.UUID;

public interface IVisitorService {
    List<VisitorResponseDTO> listAllVisitors();
    VisitorResponseDTO listVisitor(UUID idVisitor);
    VisitorResponseDTO updateVisitor(UUID idVisitor, VisitorRequestDTO visitorRequestDTO);
    void deleteVisitor(UUID idVisitor);
}
