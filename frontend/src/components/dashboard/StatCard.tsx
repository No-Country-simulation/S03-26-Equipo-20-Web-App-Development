import { useEffect, useState } from "react";
import StatCardItem from "./StatCardItem";
import { Archive, ClipboardClock, MessagesSquare } from "lucide-react";
import type { ListProducts } from "../../types/product";
import { listAllProducts } from "../../services/productService";
import type { ListTestimonials } from "../../types/testimony";
import {
  listAllTestimonials,
  getPendingTestimonials,
} from "../../services/testimonyService";

function StatCard() {
  const [listProducts, setListProducts] = useState<ListProducts[]>();
  const [listTestimonials, setListTestimonials] = useState<ListTestimonials[]>(
    [],
  );
  const [pendingCount, setPendingCount] = useState(0);

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
        const response = await listAllTestimonials();
        const testimonials: ListTestimonials[] = response.content || [];
        console.log("Todos los testimonios: ", testimonials);
        setListTestimonials(testimonials);
      } catch (error) {
        console.error("Error al obtener los testimonios:", error);
      }
    }

    async function getAllPending() {
      try {
        const pending = await getPendingTestimonials();
        setPendingCount(pending.length);
      } catch (error) {
        console.error("Error al obtener los testimonios pendientes:", error);
      }
    }

    getAllTestimonials();
    getAllProducts();
    getAllPending();
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
        label="Total de Moderaciones"
        value={pendingCount}
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
