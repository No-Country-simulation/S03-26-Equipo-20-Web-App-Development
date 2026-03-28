package org.testimonials.cms.organization.exception;

import java.util.UUID;

public class OrganizationNotFound extends RuntimeException {
    public OrganizationNotFound(UUID id) {
        super("Organization not found with id: " + id);
    }

    public static OrganizationNotFound of(UUID id) {
        return new OrganizationNotFound(id);
    }
}
