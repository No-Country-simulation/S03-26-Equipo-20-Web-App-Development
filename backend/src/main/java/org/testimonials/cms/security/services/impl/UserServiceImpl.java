package org.testimonials.cms.security.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.testimonials.cms.security.model.User;
import org.testimonials.cms.security.repository.IUserRepository;
import org.testimonials.cms.security.services.IUserService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
