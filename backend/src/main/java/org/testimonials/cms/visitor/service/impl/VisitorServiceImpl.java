package org.testimonials.cms.visitor.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.visitor.dtos.VisitorRequestDTO;
import org.testimonials.cms.visitor.dtos.VisitorResponseDTO;
import org.testimonials.cms.visitor.exception.VisitorNotFound;
import org.testimonials.cms.visitor.mapper.VisitorMapper;
import org.testimonials.cms.visitor.model.Visitor;
import org.testimonials.cms.visitor.repository.IVisitorRepository;
import org.testimonials.cms.visitor.service.IVisitorService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class VisitorServiceImpl implements IVisitorService {
    private final IVisitorRepository visitorRepository;

    private final VisitorMapper visitorMapper;

    @Override
    @Transactional(readOnly = true)
    public List<VisitorResponseDTO> listAllVisitors() {
        return visitorMapper.toVisitorListDTOs(visitorRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public VisitorResponseDTO listVisitor(UUID idVisitor) {
        Optional<Visitor> visitorFound = visitorRepository.findById(idVisitor);

        if (visitorFound.isEmpty()) throw VisitorNotFound.of(idVisitor);

        return visitorMapper.toVisitorDTO(visitorRepository.getReferenceById(idVisitor));
    }

    @Override
    @Transactional
    public VisitorResponseDTO updateVisitor(UUID idVisitor, VisitorRequestDTO visitorRequestDTO) {
        Optional<Visitor> visitorFound = visitorRepository.findById(idVisitor);

        if (visitorFound.isEmpty()) throw VisitorNotFound.of(idVisitor);

        Visitor visitorNotModified = visitorRepository.getReferenceById(idVisitor);

        if (visitorRequestDTO.getName() != null) visitorNotModified.setName(visitorRequestDTO.getName());

        if (visitorRequestDTO.getEmail() != null) visitorNotModified.setEmail(visitorRequestDTO.getEmail());

        Visitor visitorModified = visitorRepository.save(visitorNotModified);

        return visitorMapper.toVisitorDTO(visitorModified);
    }

    @Override
    @Transactional
    public void deleteVisitor(UUID idVisitor) {
        Optional<Visitor> visitorFound = visitorRepository.findById(idVisitor);

        if (visitorFound.isEmpty()) throw VisitorNotFound.of(idVisitor);

        visitorRepository.deleteById(idVisitor);
    }
}
