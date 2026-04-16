import { useEffect, useState, useRef, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import { CirclePlus, Plus, X, Search, Loader2, Package } from "lucide-react";
import Header from "../../components/Header";
import ProductCard from "../../components/products/ProductCard";
import { useFormik } from "formik";
import { productValidationSchema } from "../../utils/validationSchemas";
import {
  createProduct,
  deleteProduct,
  listAllProducts,
} from "../../services/productService";
import { listTags, getTopTags } from "../../services/tagService";
import type { ListProducts } from "../../types/product";
import type { Tag, TagPage } from "../../types/tag";
import toast from "react-hot-toast";

const TAGS_PAGE_SIZE = 20;

export default function ProductsListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listProducts, setListProducts] = useState<ListProducts[]>([]);

  // Delete modal state
  const [deleteModalProduct, setDeleteModalProduct] = useState<{ id: string; name: string } | null>(null);

  // Stats states
  const [totalProducts, setTotalProducts] = useState(0);
  const [topTags, setTopTags] = useState<Tag[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Tags states
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [tagPage, setTagPage] = useState(0);
  const [hasMoreTags, setHasMoreTags] = useState(true);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalTags, setTotalTags] = useState(0);

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const [products, topTagsData] = await Promise.all([
        listAllProducts(),
        getTopTags(10)
      ]);

      setTotalProducts(products.length);
      setTopTags(topTagsData);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastTagRef = useRef<HTMLDivElement | null>(null);

  const filteredTags = availableTags.filter(tag =>
    tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  const searchNotExists = tagSearchQuery.trim() &&
    !availableTags.some(t => t.name.toLowerCase() === tagSearchQuery.toLowerCase()) &&
    !selectedTags.some(t => t.toLowerCase() === tagSearchQuery.toLowerCase());

  const loadTags = async (page: number = 0, append: boolean = false) => {
    if (page === 0) {
      setIsLoadingTags(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const tagData: TagPage = await listTags(page, TAGS_PAGE_SIZE, "name,asc");

      if (append) {
        setAvailableTags(prev => [...prev, ...tagData.content]);
      } else {
        setAvailableTags(tagData.content);
      }
      setHasMoreTags(!tagData.last);
      setTotalTags(tagData.totalElements);
    } catch (error) {
      console.error("Error al cargar tags:", error);
    } finally {
      setIsLoadingTags(false);
      setIsLoadingMore(false);
    }
  };

  const loadMoreTags = useCallback(async () => {
    if (isLoadingMore || !hasMoreTags) return;
    const nextPage = tagPage + 1;
    setTagPage(nextPage);
    await loadTags(nextPage, true);
  }, [isLoadingMore, hasMoreTags, tagPage]);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreTags && !isLoadingMore && !tagSearchQuery) {
            loadMoreTags();
          }
        },
        { threshold: 0.1 }
      );
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMoreTags, isLoadingMore, tagSearchQuery, loadMoreTags]);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setSelectedTags([]);
    setTagSearchQuery("");
    setTagPage(0);
    setHasMoreTags(true);
    formik.resetForm();
    await loadTags(0, false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAvailableTags([]);
    setSelectedTags([]);
    setTagSearchQuery("");
    setTagPage(0);
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
      picture: null,
      tags: [] as string[],
    },
    validationSchema: productValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const nuevoProducto = await createProduct(
          { ...values, tags: selectedTags },
          setIsModalOpen,
          resetForm
        );
        setListProducts([nuevoProducto, ...listProducts]);
        setSelectedTags([]);
        loadStats();
      } catch (error) {
        toast.error("Error de conexión");
        console.error("Error al guardar el producto:", error);
      }
    },
  });

  useEffect(() => {
    async function getAllProducts() {
      try {
        const products: ListProducts[] = await listAllProducts();
        setListProducts(products);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    getAllProducts();
    loadStats();
  }, []);

  const handleDelete = (idProduct: string, productName: string) => {
    setDeleteModalProduct({ id: idProduct, name: productName });
  };

  const confirmDelete = async () => {
    if (!deleteModalProduct) return;
    try {
      await deleteProduct(deleteModalProduct.id);
      setListProducts(
        listProducts.filter((product) => product.id !== deleteModalProduct.id),
      );
      loadStats();
      toast.success("Producto eliminado");
      setDeleteModalProduct(null);
    } catch (error) {
      toast.error("Error al eliminar el producto");
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      {/* Main */}
      <main className="md:ml-64 w-full min-h-screen transition-all bg-[#0e0e10] pb-20 md:pb-0">
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
              onClick={handleOpenModal}
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
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Total Products */}
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-[#9333ea] flex flex-col justify-between min-h-[180px]">
              <div>
                <p className="text-sm text-[#adaaad] mb-2">Total Products</p>
                {isLoadingStats ? (
                  <Loader2 className="animate-spin text-[#9333ea]" size={32} />
                ) : (
                  <p
                    className="text-5xl font-extrabold text-[#f9f5f8]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {totalProducts}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-lg bg-[#9333ea]/20 flex items-center justify-center">
                  <Package className="text-[#9333ea]" size={20} />
                </div>
                <p className="text-[#adaaad] text-sm">products in catalog</p>
              </div>
            </div>

            {/* Top Tags */}
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-[#cc97ff] min-h-[180px]">
              <p className="text-sm text-[#adaaad] mb-4">Top 10 Tags</p>
              {isLoadingStats ? (
                <div className="flex items-center justify-center h-[calc(100%-2rem)]">
                  <Loader2 className="animate-spin text-[#9333ea]" size={24} />
                </div>
              ) : topTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {topTags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1.5 bg-[#9333ea]/20 text-[#cc97ff] rounded-full text-sm font-medium flex items-center gap-1.5 border border-[#9333ea]/30"
                    >
                      {tag.name}
                      <span className="text-xs opacity-60">({tag.usageCount})</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[#adaaad]/60 text-sm">No tags available</p>
              )}
            </div>
          </section>

          {/* Products */}
          <div className="grid md:grid-cols-2 gap-6">
            {listProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={() => handleDelete(product.id, product.name)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modal Eliminar Producto */}
      {deleteModalProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#131315] p-6 rounded-xl w-full max-w-sm border border-[#262528]">
            <h3 className="text-xl font-bold text-[#f9f5f8] mb-2">¿Eliminar producto?</h3>
            <p className="text-[#adaaad] mb-6">
              ¿Estás seguro de eliminar "{deleteModalProduct.name}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalProduct(null)}
                className="flex-1 py-3 px-4 bg-[#1f1f22] text-[#adaaad] rounded-lg font-semibold hover:bg-[#262528] transition-colors active:scale-95 active:bg-[#262528] active:shadow-none"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors active:scale-95 active:bg-red-800 active:shadow-none"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Crear Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#131315] p-6 rounded-xl w-full max-w-lg border border-[#262528] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#f9f5f8]">Nuevo producto</h3>
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
                {formik.touched.picture && formik.errors.picture && (
                  <p className="text-red-400 text-xs mt-1">{formik.errors.picture}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#adaaad]">
                    Etiquetas
                  </label>
                  {totalTags > 0 && (
                    <span className="text-xs text-[#adaaad]/60">
                      {tagSearchQuery ? `${filteredTags.length} resultado(s)` : `${availableTags.length} de ${totalTags}`}
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

                {/* Lista de tags con scroll */}
                <div className="max-h-48 overflow-y-auto mb-3 scrollbar-thin scrollbar-thumb-[#262528] scrollbar-track-transparent">
                  {isLoadingTags ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin text-[#9333ea]" size={24} />
                    </div>
                  ) : filteredTags.length === 0 && !searchNotExists ? (
                    <div className="text-center py-6 text-[#adaaad]/60 text-sm">
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
                          {tag.usageCount > 0 && (
                            <span className="text-xs opacity-60">({tag.usageCount})</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Scroll infinito trigger */}
                  {hasMoreTags && !tagSearchQuery && (
                    <div ref={lastTagRef} className="h-4" />
                  )}

                  {/* Loading more */}
                  {isLoadingMore && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="animate-spin text-[#9333ea]/60" size={20} />
                    </div>
                  )}
                </div>

                {/* Crear tag nueva desde búsqueda */}
                {searchNotExists && (
                  <button
                    type="button"
                    onClick={addNewTagFromSearch}
                    className="w-full p-3 border-2 border-dashed border-[#22c55e]/50 rounded-lg text-[#22c55e] text-sm font-medium hover:bg-[#22c55e]/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Agregar "{tagSearchQuery}"
                  </button>
                )}

                {/* Tags seleccionadas */}
                {selectedTags.length > 0 && (
                  <div className="mt-4 p-3 bg-[#1f1f22] rounded-lg border border-[#262528]">
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
                              className={`ml-1 hover:${isNew ? "text-white" : "text-white"} transition-colors`}
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
                  className="flex-1 py-3 px-4 bg-[#1f1f22] text-[#adaaad] rounded-lg font-semibold hover:bg-[#262528] transition-colors active:scale-95 active:bg-[#262528] active:shadow-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#aa3bff] to-[#9333ea] text-white rounded-lg font-bold shadow-lg shadow-[#9333ea]/20 hover:opacity-90 transition-opacity active:scale-95 active:opacity-80 active:shadow-none"
                >
                  Registrar producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
