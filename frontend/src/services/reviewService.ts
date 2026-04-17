import toast from "react-hot-toast";
import type { Review } from "../types/review";

export async function createReview(value: Review) {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
        credentials: "include",
    });

    if (response.ok) {
        const review = await response.json();
        console.log("Review desde reviewServices: ", review)
        toast.success("Revisión registrado exitosamente");
        return review;
    } else {
        const errorData = await response.json();
        console.error("Respuesta del servidor:", errorData);
        toast.error("Error en el servidor: " + (errorData.message || "No se pudo registrar"));
        throw new Error("Error al crear Revisión");
    }
}