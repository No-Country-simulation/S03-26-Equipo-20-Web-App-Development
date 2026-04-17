package org.testimonials.cms.product.exception;

import java.util.UUID;

public class ProductNotFound extends RuntimeException {
    public ProductNotFound(UUID id) {
        super("Product not found with id: " + id);
    }

    public static ProductNotFound of(UUID id) {return new ProductNotFound(id);}
}
