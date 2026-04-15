package org.testimonials.cms.security.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.testimonials.cms.security.exception.SecurityDataNotFoundException;
import org.testimonials.cms.security.model.Role;
import org.testimonials.cms.security.repository.IRoleRepository;
import org.testimonials.cms.security.services.IRoleService;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements IRoleService {

    private final IRoleRepository roleRepository;

    @Override
    public Role findRoleByName(String name) {
        return roleRepository.findByRoleName(name)
                .orElseThrow(() -> new SecurityDataNotFoundException("Role Not Fount"));
    }
}
