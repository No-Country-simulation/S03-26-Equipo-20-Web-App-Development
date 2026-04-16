import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "El nombre es demasiado corto")
        .required("El nombre del producto es obligatorio"),

    description: Yup.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .required("La descripción del producto es obligatoria"),

    picture: Yup.mixed().required("La imagen del producto es obligatoria")
});

export const editProductValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "El nombre es demasiado corto")
        .required("El nombre del producto es obligatorio"),

    description: Yup.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .required("La descripción del producto es obligatoria"),

    picture: Yup.mixed().notRequired()
});

export const testimonialValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "El titular es demasiado corto")
        .required("El titular es requerido"),

    content: Yup.string()
        .min(30, "El contenido debe tener al menos 30 caracteres")
        .required("Escribí al menos 30 caracteres")
});

export const visitorValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "El nombre completo es demasiado corto")
        .required("El nombre completo es requerido"),

    email: Yup.string()
        .min(10, "La descripción debe tener al menos 30 caracteres")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ingresá un email válido")
        .required("El correo es requerido")
});

export const mediaValidationSchema = Yup.object().shape({
    url: Yup.mixed().required("La imagen del producto es obligatoria")
});

export const createTestimonialValidationSchema = Yup.object().shape({
    testimonial: testimonialValidationSchema,
    visitor: visitorValidationSchema,
    media: mediaValidationSchema
});

export const tagValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Mínimo 2 caracteres")
        .required("El nombre es obligatorio"),
});