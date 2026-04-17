import { useEffect, useState } from "react";
import StatCardItem from "./StatCardItem";
import { Archive, ClipboardClock, MessagesSquare } from "lucide-react";
import type { ListProducts } from "../../types/product";
import { listAllProducts } from "../../services/productService";
import type { ListTestimonials } from "../../types/testimony";
import { listAllTestimonials } from "../../services/testimonyService";

function StatCard() {
  const [listProducts, setListProducts] = useState<ListProducts[]>();
  const [listTestimonials, setListTestimonials] = useState<ListTestimonials[]>(
    [],
  );

  useEffect(() => {
    // Aquí se llama al servicio para listar los productos al cargar la página
    async function getAllProducts() {
      try {
        const products: ListProducts[] = await listAllProducts();
        setListProducts(products);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    async function getAllTestimonials() {
      try {
        const testimonials: ListTestimonials[] = await listAllTestimonials();
        console.log("Todos los testimonios: ", testimonials);

        console.log("Lista de testimonios: ", listTestimonials);
        setListTestimonials(testimonials);
      } catch (error) {
        console.error("Error al obtener los testimonios:", error);
      }
    }

    getAllTestimonials();
    getAllProducts();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 mb-8">
      <StatCardItem
        label="Total de Testimonios"
        value={
          listTestimonials && listTestimonials?.length > 0
            ? listTestimonials?.length
            : "Ninguno"
        }
        icon={<MessagesSquare />}
      />
      <StatCardItem
        label="Moderaciones Pendientes"
        value={12}
        icon={<ClipboardClock />}
      />
      <StatCardItem
        label="Productos Activos"
        value={
          listProducts && listProducts?.length > 0
            ? listProducts?.length
            : "Ninguno"
        }
        icon={<Archive />}
      />
    </section>
  );
}

export default StatCard;
