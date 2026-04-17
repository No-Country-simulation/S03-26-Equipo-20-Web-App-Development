import { toast } from "react-hot-toast";
import type { ListProducts, Product, ProductPublic } from "../types/product";

// Servicio para crear un nuevo producto
export async function createProduct(values: Product, setIsModalOpen: (isOpen: boolean) => void, resetForm: () => void): Promise<ListProducts> {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (values.picture) {
        formData.append("picture", values.picture);
    }
    if (values.tags && values.tags.length > 0) {
        values.tags.forEach(tag => {
            formData.append("tags", tag);
        });
    }

    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/products/register`,
        {
            method: "POST",
            body: formData,
            credentials: "include",
        },
    );

    if (response.ok) {
        const product = await response.json();
        toast.success("Producto registrado exitosamente");
        setIsModalOpen(false);
        resetForm();
        return product;
    } else {
        const errorData = await response.json();
        console.error("Respuesta del servidor:", errorData);
        toast.error("Error en el servidor: " + (errorData.message || "No se pudo registrar"));
        throw new Error("Error al crear producto");
    }
}

// Servicio para listar todos los productos de una organización
export async function listAllProducts(): Promise<ListProducts[]> {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            const products = await response.json();
            return products;
        } else {
            console.error("Error al obtener los productos");
            return [];
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        return [];
    }
}

// Servicio para obtener un producto por su ID
export async function getProductById(idProduct: string): Promise<Product | null> {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${idProduct}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            const product = await response.json();
            return product;
        } else {
            console.error("Error al obtener el producto con ID: ", idProduct);
            return null;
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        return null;
    }
}

// Servicio para actualizar un producto por su ID
export async function updateProduct(idProduct: string, values: Product, setIsModalOpen: (isOpen: boolean) => void, resetForm: () => void): Promise<void> {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (values.picture) {
        formData.append("picture", values.picture);
    }
    if (values.tags && values.tags.length > 0) {
        values.tags.forEach(tag => {
            formData.append("tags", tag);
        });
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${idProduct}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
    });

    if (response.ok) {
        toast.success("Producto actualizado exitosamente");
        setIsModalOpen(false);
        resetForm();
    } else {
        const errorData = await response.json();
        console.error("Respuesta del servidor:", errorData);
        toast.error("Error al actualizar el producto");
    }
}

// Servicio para eliminar un producto por su ID
export async function deleteProduct(idProduct: string): Promise<void> {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${idProduct}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Error al eliminar el producto");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

export async function getProductByShareCode(shareCode: string): Promise<ProductPublic | null> {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/public/${shareCode}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (error) {
        console.error("Error al obtener producto por shareCode:", error);
        return null;
    }
}