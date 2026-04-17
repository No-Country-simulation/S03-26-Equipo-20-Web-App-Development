package org.testimonials.cms.media.exception;

import java.util.UUID;

public class MediaNotFound extends RuntimeException {
    public MediaNotFound(UUID id) {
        super("Media not found with id: " + id);
    }

    public static MediaNotFound of(UUID id) {
        return new MediaNotFound(id);
    }
}
