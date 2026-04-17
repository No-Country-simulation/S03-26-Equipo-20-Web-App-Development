package org.testimonials.cms.security.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.security.dto.PublicOperationDTO;
import org.testimonials.cms.security.repository.IOperationRepository;
import org.testimonials.cms.security.services.IOperationService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OperationServiceImpl implements IOperationService {
    private final IOperationRepository operationRepository;


    @Override
    @Transactional(readOnly = true)
    @Cacheable("publicOperations")
    public List<PublicOperationDTO> getPublicOperations() {

        return operationRepository.findAllByPermitAllIsTrue()
                .stream()
                .map(op -> new PublicOperationDTO(
                        buildFullPath(op.getModule().getBasePath(), op.getPath()),
                        op.getHttpMethod().name()
                ))
                .toList();
    }

    private String buildFullPath(String base, String path) {
        return (base + path).replaceAll("//+", "/");
    }
}
