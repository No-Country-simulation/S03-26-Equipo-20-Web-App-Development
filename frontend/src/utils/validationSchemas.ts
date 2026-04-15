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

    picture: Yup.mixed().required("La imagen del producto es obligatoria")
});

export const tagValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Mínimo 2 caracteres")
        .required("El nombre es obligatorio"),
});