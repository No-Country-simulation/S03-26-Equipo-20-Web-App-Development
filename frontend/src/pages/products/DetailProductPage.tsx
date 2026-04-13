import { Pencil } from "lucide-react";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { getProductById, updateProduct } from "../../services/productService";
import { useNavigate, useParams } from "react-router-dom";
import { editProductValidationSchema } from "../../utils/validationSchemas";
import { useFormik } from "formik";
import ProductDetailCard from "../../components/products/ProductDetailCard";
import Sidebar from "../../components/Sidebar";

function DetailProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const { idProduct } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      picture: null,
    },
    validationSchema: editProductValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Aquí se llama al servicio para crear un producto
      try {
        if (idProduct) {
          await updateProduct(
            idProduct,
            values,
            setIsModalOpen,
            resetForm,
            navigate,
          );
        } else {
          alert("ID del producto no encontrado");
        }
      } catch (error) {
        alert("Error de conexión");
        console.error("Error al guardar el producto:", error);
      }
    },
  });

  useEffect(() => {
    async function getProduct() {
      try {
        if (idProduct) {
          const response = await getProductById(idProduct);
          setProduct(response);
          formik.setValues(response ? response : formik.initialValues);
        } else {
          alert("ID del producto no encontrado");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    getProduct();
  }, []);

  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      <main className="md:ml-64 min-h-screen transition-all bg-[#0e0e10] pb-20 md:pb-0">
        <Header />

        <div className="p-8 lg:p-12 space-y-12">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[#f9f5f8] tracking-tight"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Detalle del producto
              </h2>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FFD63B] text-black w-60 px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(220,38,38,0.35)] transition-all duration-350 hover:bg-[#ffc107] hover:text-black"
            >
              <Pencil />
              Editar
            </button>
          </section>

          {/* Products */}
          <div className="grid md:grid-cols-2 gap-6">
            <ProductDetailCard
              product={
                product ? product : { name: "", description: "", picture: null }
              }
            />
          </div>
        </div>
      </main>

      {/* Modal Editar Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#131315] p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Editar producto</h3>
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

export default DetailProductPage;
