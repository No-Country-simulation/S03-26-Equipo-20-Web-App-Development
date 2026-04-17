package org.testimonials.cms.visitor.exception;

import java.util.UUID;

public class VisitorNotFound extends RuntimeException {
    public VisitorNotFound(UUID id) {
        super("Visitor not found with id: " + id);
    }

    public static VisitorNotFound of(UUID id) {
        return new VisitorNotFound(id);
    }
}
