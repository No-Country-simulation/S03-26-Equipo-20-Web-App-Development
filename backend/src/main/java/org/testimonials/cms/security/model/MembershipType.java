package org.testimonials.cms.security.model;

import java.util.Arrays;

public enum MembershipType {
    OWNER,
    ADMIN,
    STAFF;

    public static MembershipType[] getAssignableTypes() {
        return Arrays.stream(values())
                .filter(type -> type != OWNER)
                .toArray(MembershipType[]::new);
    }
}
