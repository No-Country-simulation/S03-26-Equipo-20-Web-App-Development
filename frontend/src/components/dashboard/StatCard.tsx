import { useEffect, useState } from "react";
import StatCardItem from "./StatCardItem";
import { Archive, ClipboardClock, MessagesSquare } from "lucide-react";
import type { ListProducts } from "../../types/product";
import { listAllProducts } from "../../services/productService";

function StatCard() {
  const [listProducts, setListProducts] = useState<ListProducts[]>();

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

    getAllProducts();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 mb-8">
      <StatCardItem
        label="Total de Testimonios"
        value={2482}
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
