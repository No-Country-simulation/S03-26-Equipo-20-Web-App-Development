package org.testimonials.cms.security.services;

import org.testimonials.cms.security.model.Role;

public interface IRoleService {
    Role findRoleByName(String name);
}
