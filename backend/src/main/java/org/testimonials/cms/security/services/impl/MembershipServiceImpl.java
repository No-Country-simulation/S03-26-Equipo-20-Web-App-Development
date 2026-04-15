package org.testimonials.cms.security.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.testimonials.cms.security.model.Membership;
import org.testimonials.cms.security.repository.IMembershipRepository;
import org.testimonials.cms.security.services.IMembershipService;

@Service
@RequiredArgsConstructor
public class MembershipServiceImpl implements IMembershipService {

    private final IMembershipRepository membershipRepository;

    @Override
    public void createNewMembership(Membership membership) {
        membershipRepository.save(membership);
    }
}
