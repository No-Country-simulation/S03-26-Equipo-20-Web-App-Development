package org.testimonials.cms.tag.exception;

import java.util.UUID;

public class TagNotFound extends RuntimeException {
    public TagNotFound(UUID id) {
        super("Tag not found with id: " + id);
    }

    public static TagNotFound of(UUID id) {
        return new TagNotFound(id);
    }
}
