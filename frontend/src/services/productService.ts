import type { ListProducts, Product } from "../types/product";

// Servicio para crear un nuevo producto
export async function createProduct(values: Product, setIsModalOpen: (isOpen: boolean) => void, resetForm: () => void): Promise<void> {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (values.picture) {
        formData.append("picture", values.picture);
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
        alert("Producto registrado exitosamente");
        setIsModalOpen(false);
        resetForm();
    } else {
        const errorData = await response.json();
        console.error("Respuesta del servidor:", errorData);
        alert(
            "Error en el servidor: " +
            (errorData.message || "No se pudo registrar"),
        );
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
            console.log("Respuesta del servidor:", products);
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
            console.log("Respuesta del servidor:", product);
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
export async function updateProduct(idProduct: string, values: Product, setIsModalOpen: (isOpen: boolean) => void, resetForm: () => void, navigate: (path: string) => void): Promise<void> {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (values.picture) {
        formData.append("picture", values.picture);
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${idProduct}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
    });

    if (response.ok) {
        alert("Producto actualizado exitosamente");
        setIsModalOpen(false);
        resetForm();
        navigate("/products");
    } else {
        const errorData = await response.json();
        console.error("Respuesta del servidor:", errorData);
        alert(
            "Producto actualizado exitosamente",
        );
    };
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