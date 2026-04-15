package org.testimonials.cms.security.services;

import org.testimonials.cms.security.model.User;

public interface IUserService {
    User createUser(User user);

    boolean existsByEmail(String email);
}
