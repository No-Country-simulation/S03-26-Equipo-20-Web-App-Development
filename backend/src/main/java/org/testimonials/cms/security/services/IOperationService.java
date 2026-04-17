package org.testimonials.cms.security.services;

import org.testimonials.cms.security.dto.PublicOperationDTO;


import java.util.List;

public interface IOperationService {
    List<PublicOperationDTO> getPublicOperations();
}
