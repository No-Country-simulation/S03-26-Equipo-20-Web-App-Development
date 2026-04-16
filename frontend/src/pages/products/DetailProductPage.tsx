import { Pencil, X, Plus, Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import { useEffect, useState} from "react";
import { getProductById, updateProduct } from "../../services/productService";
import { listTags } from "../../services/tagService";
import { useParams } from "react-router-dom";
import { editProductValidationSchema } from "../../utils/validationSchemas";
import { useFormik } from "formik";
import ProductDetailCard from "../../components/products/ProductDetailCard";
import Sidebar from "../../components/Sidebar";
import type { Tag } from "../../types/tag";
import type { ListProducts } from "../../types/product";


function DetailProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<ListProducts | null>(null);

  const { idProduct } = useParams();

  // Tags states
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [isLoadingTags, setIsLoadingTags] = useState(false);



  const filteredTags = availableTags.filter(tag =>
    tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  const searchNotExists = tagSearchQuery.trim() &&
    !availableTags.some(t => t.name.toLowerCase() === tagSearchQuery.toLowerCase()) &&
    !selectedTags.some(t => t.toLowerCase() === tagSearchQuery.toLowerCase());

  const loadTags = async () => {
    setIsLoadingTags(true);
    try {
      const tagData = await listTags(0, 100, "name,asc");
      setAvailableTags(tagData.content);
    } catch (error) {
      console.error("Error al cargar tags:", error);
    } finally {
      setIsLoadingTags(false);
    }
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setTagSearchQuery("");
    formik.setValues({
      name: product?.name || "",
      description: product?.description || "",
      picture: null,
      tags: product?.tags?.map((t: { name: string }) => t.name) || [],
    });
    await loadTags();
    if (product?.tags) {
      setSelectedTags(product.tags.map((t: { name: string }) => t.name));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAvailableTags([]);
    setSelectedTags([]);
    setTagSearchQuery("");
  };

  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(t => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const addNewTagFromSearch = () => {
    if (searchNotExists && tagSearchQuery.trim()) {
      setSelectedTags([...selectedTags, tagSearchQuery.trim()]);
      setTagSearchQuery("");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      picture: null as File | null,
      tags: [] as string[],
    },
    validationSchema: editProductValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (idProduct) {
          await updateProduct(
            idProduct,
            { ...values, tags: selectedTags },
            setIsModalOpen,
            resetForm,
          );
          const updatedProduct = await getProductById(idProduct);
          setProduct(updatedProduct);
          setSelectedTags([]);
        } else {
          toast.error("ID del producto no encontrado");
        }
      } catch (error) {
        toast.error("Error de conexión");
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
          formik.setValues({
            name: response?.name || "",
            description: response?.description || "",
            picture: null,
            tags: response?.tags?.map((t: { name: string }) => t.name) || [],
          });
          if (response?.tags) {
            setSelectedTags(response.tags.map((t: { name: string }) => t.name));
          }
        } else {
          toast.error("ID del producto no encontrado");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    getProduct();
  }, [idProduct, formik]);

  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      <main className="md:ml-64 min-h-screen transition-all bg-[#0e0e10] pb-20 md:pb-0 flex-1">
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
              onClick={handleOpenModal}
              className="bg-[#FFD63B] text-black w-auto px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(220,38,38,0.35)] transition-all duration-350 hover:bg-[#ffc107] hover:text-black"
            >
              <Pencil size={18} />
              Editar
            </button>
          </section>

          {/* Product Detail Card */}
          <div className="grid md:grid-cols-1 gap-6">
            <ProductDetailCard
              product={
                product ? {
                  name: product.name || "",
                  description: product.description || "",
                  picture: product.picture || null,
                  tags: product.tags || []
                } : { name: "", description: "", picture: null, tags: [] }
              }
            />
          </div>
        </div>
      </main>

      {/* Modal Editar Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#131315] p-6 rounded-xl w-full max-w-lg border border-[#262528] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#f9f5f8]">Editar producto</h3>
              <button
                onClick={handleCloseModal}
                className="text-[#adaaad] hover:text-[#f9f5f8] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-[#adaaad] mb-2">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-[#1f1f22] border border-[#262528] rounded-lg text-[#f9f5f8] focus:border-[#9333ea] focus:outline-none transition-colors"
                  name="name"
                  placeholder="Ej: Bootcamp de React"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-400 text-xs mt-1">{formik.errors.name}</p>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-[#adaaad] mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  className="w-full p-3 bg-[#1f1f22] border border-[#262528] rounded-lg text-[#f9f5f8] focus:border-[#9333ea] focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Describe brevemente el producto..."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-400 text-xs mt-1">{formik.errors.description}</p>
                )}
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-sm font-medium text-[#adaaad] mb-2">
                  Imagen
                </label>
                <input
                  type="file"
                  className="w-full p-3 bg-[#1f1f22] border border-[#262528] rounded-lg text-[#adaaad] file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#9333ea] file:text-white hover:file:opacity-90 cursor-pointer"
                  name="picture"
                  onChange={(event) => {
                    const file = event.currentTarget.files
                      ? event.currentTarget.files[0]
                      : null;
                    formik.setFieldValue("picture", file);
                  }}
                />
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#adaaad]">
                    Etiquetas
                  </label>
                  {availableTags.length > 0 && (
                    <span className="text-xs text-[#adaaad]/60">
                      {availableTags.length} etiquetas disponibles
                    </span>
                  )}
                </div>

                {/* Buscador */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#adaaad]/50" size={16} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#1f1f22] border border-[#262528] rounded-lg text-[#f9f5f8] text-sm focus:border-[#9333ea] focus:outline-none transition-colors placeholder:text-[#adaaad]/40"
                    placeholder="Buscar etiquetas..."
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                  />
                  {tagSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setTagSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#adaaad]/50 hover:text-[#adaaad] transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Lista de tags */}
                <div className="max-h-32 overflow-y-auto mb-3 scrollbar-thin scrollbar-thumb-[#262528] scrollbar-track-transparent">
                  {isLoadingTags ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="animate-spin text-[#9333ea]" size={20} />
                    </div>
                  ) : filteredTags.length === 0 && !searchNotExists ? (
                    <div className="text-center py-4 text-[#adaaad]/60 text-sm">
                      No se encontraron etiquetas
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {filteredTags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(tag.name)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                            selectedTags.includes(tag.name)
                              ? "bg-[#9333ea] text-white"
                              : "bg-[#1f1f22] text-[#adaaad] border border-[#262528] hover:border-[#9333ea] hover:text-[#cc97ff]"
                          }`}
                        >
                          {selectedTags.includes(tag.name) && (
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Crear tag nueva */}
                {searchNotExists && (
                  <button
                    type="button"
                    onClick={addNewTagFromSearch}
                    className="w-full p-3 border-2 border-dashed border-[#22c55e]/50 rounded-lg text-[#22c55e] text-sm font-medium hover:bg-[#22c55e]/10 transition-colors flex items-center justify-center gap-2 mb-3"
                  >
                    <Plus size={16} />
                    Agregar "{tagSearchQuery}"
                  </button>
                )}

                {/* Tags seleccionadas */}
                {selectedTags.length > 0 && (
                  <div className="p-3 bg-[#1f1f22] rounded-lg border border-[#262528]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-[#adaaad] font-medium">Tags seleccionadas</span>
                      <span className="px-1.5 py-0.5 bg-[#9333ea]/20 text-[#cc97ff] rounded text-xs font-bold">
                        {selectedTags.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tagName) => {
                        const isNew = !availableTags.some(t => t.name === tagName);
                        return (
                          <span
                            key={tagName}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                              isNew
                                ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30"
                                : "bg-[#9333ea]/20 text-[#cc97ff]"
                            }`}
                          >
                            {isNew && <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />}
                            {tagName}
                            <button
                              type="button"
                              onClick={() => toggleTag(tagName)}
                              className="hover:text-white transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 px-4 bg-[#1f1f22] text-[#adaaad] rounded-lg font-semibold hover:bg-[#262528] active:scale-95 active:bg-[#262528] active:shadow-none active:translate-y-0.5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#aa3bff] to-[#9333ea] text-white rounded-lg font-bold shadow-lg shadow-[#9333ea]/20 hover:opacity-90 active:scale-95 active:opacity-80 active:shadow-none active:translate-y-0.5 transition-opacity"
                >
                  Guardar cambios
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
