import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { CirclePlus } from "lucide-react";
import Header from "../../components/Header";
import ProductCard from "../../components/products/ProductCard";
import { useFormik } from "formik";
import { productValidationSchema } from "../../utils/validationSchemas";
import {
  createProduct,
  deleteProduct,
  listAllProducts,
} from "../../services/productService";
import type { ListProducts } from "../../types/product";

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listProducts, setListProducts] = useState<ListProducts[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      picture: null,
    },
    validationSchema: productValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Aquí se llama al servicio para crear un producto
      try {
        await createProduct(values, setIsModalOpen, resetForm);
      } catch (error) {
        alert("Error de conexión");
        console.error("Error al guardar el producto:", error);
      }
    },
  });

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

  const handleDelete = async (idProduct: string) => {
    // Aquí se llamaría al servicio para eliminar el producto por su ID
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      try {
        await deleteProduct(idProduct);
        // Actualizar la lista de productos después de eliminar
        setListProducts(
          listProducts.filter((product) => product.id !== idProduct),
        );
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      {/* Main */}
      <main className="md:ml-64 min-h-screen transition-all bg-[#0e0e10] pb-20 md:pb-0">
        <Header />
        <div className="p-8 lg:p-12 space-y-12">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span
                className="text-[#cc97ff] font-bold uppercase tracking-widest text-xs"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Catalog Management
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[#f9f5f8] tracking-tight"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Product Ecosystem
              </h2>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-3
              bg-gradient-to-br from-[#aa3bff] to-[#7c3aed]
              text-white
              rounded-[10px]
              text-[15px]
              font-semibold
              cursor-pointer
              transition-all duration-200
              shadow-[0_4px_18px_rgba(170,59,255,0.35)]
              relative
              overflow-hidden
              mt-1
              hover:opacity-90
              active:scale-95
              flex items-center justify-center gap-2"
            >
              <CirclePlus />
              Register New Product
            </button>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-purple-300">
              <p className="text-sm text-[#f9f5f8]-variant mb-1">
                Total Curriculums
              </p>
              <p
                className="text-4xl font-extrabold text-[#f9f5f8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                14
              </p>
            </div>
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-purple-600">
              <p className="text-sm text-[#f9f5f8]-variant mb-1">
                Active testimonials
              </p>
              <p
                className="text-4xl font-extrabold text-[#f9f5f8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                1,284
              </p>
            </div>
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-purple-400">
              <p className="text-sm text-[#f9f5f8]-variant mb-1">
                Avg. Sentiment Score
              </p>
              <p
                className="text-4xl font-extrabold text-[#f9f5f8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                98.2%
              </p>
            </div>
          </section>

          {/* Products */}
          <div className="grid md:grid-cols-2 gap-6">
            {listProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modal Crear Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#131315] p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Nuevo producto</h3>
            <form onSubmit={formik.handleSubmit}>
              <label>Nombre</label>
              <input
                type="text"
                className="w-full mb-3 p-2 bg-[#1f1f22] rounded"
                name="name"
                placeholder="Limpieza brillante"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="bg-red-500 text-white p-2 rounded mb-3">
                  <span>{formik.errors.name}</span>
                </div>
              )}

              <label>Descripción</label>
              <textarea
                name="description"
                className="w-full mb-3 p-2 bg-[#1f1f22] rounded resize-none"
                placeholder="Producto de limpieza para el hogar con ingredientes naturales y fragancia fresca."
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="bg-red-500 text-white p-2 rounded mb-3">
                  <span>{formik.errors.description}</span>
                </div>
              )}

              <label>Imagen</label>
              <input
                type="file"
                className="w-full mb-3 p-2 bg-[#1f1f22] rounded"
                name="picture"
                onChange={(event) => {
                  const file = event.currentTarget.files
                    ? event.currentTarget.files[0]
                    : null;
                  formik.setFieldValue("picture", file);
                }}
              />
              {formik.touched.picture && formik.errors.picture && (
                <div className="bg-red-500 text-white p-2 rounded mb-3">
                  <span>{formik.errors.picture}</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-600 p-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 p-2 rounded"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
