import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useFormik } from "formik";
import { tagValidationSchema } from "../../utils/validationSchemas";
import {
  createTag,
  listTags,
  updateTag,
  deleteTag,
} from "../../services/tagService";
import type { Tag, TagPage } from "../../types/tag";

const TAGS_CLOUD_STYLES = [
  "bg-[#9333ea] text-white rounded-lg font-black text-2xl shadow-xl shadow-primary/20",
  "bg-[#1f1f22] text-[#cc97ff] border border-[#cc97ff]/20 rounded-lg font-bold text-lg",
  "bg-[#9e41f5] text-white rounded-lg font-semibold text-base",
  "bg-[#1f1f22] text-[#adaaad] rounded-lg font-medium text-sm",
  "bg-[#1f1f22] border-2 border-[#9e41f5] text-white rounded-lg font-black text-xl",
  "bg-primary/20 text-[#cc97ff] rounded-lg font-semibold text-md",
  "border border-[#262528] text-[#adaaad] rounded-lg font-medium text-lg",
  "bg-[#1f1f22] text-[#9e41f5] border border-[#9e41f5]/30 rounded-lg font-medium text-xs",
];

function getCloudStyle(usageCount: number, index: number): string {
  if (usageCount >= 40) return TAGS_CLOUD_STYLES[0];
  if (usageCount >= 20) return TAGS_CLOUD_STYLES[1];
  if (usageCount >= 10) return TAGS_CLOUD_STYLES[2];
  if (usageCount >= 5) return TAGS_CLOUD_STYLES[3];
  if (usageCount >= 3) return TAGS_CLOUD_STYLES[4];
  return TAGS_CLOUD_STYLES[5 + (index % 3)];
}

export default function TagsPage() {
  const [tagPage, setTagPage] = useState<TagPage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: tagValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editingTag) {
          await updateTag(editingTag.id, { name: values.name });
        } else {
          await createTag({ name: values.name });
        }
        resetForm();
        setIsModalOpen(false);
        setEditingTag(null);
        fetchTags();
      } catch {
        alert("Error al guardar el tag");
      }
    },
  });

  const fetchTags = async (page: number = 0) => {
    setIsLoading(true);
    try {
      const data = await listTags(page, 10, "createdAt,desc");
      setTagPage(data);
    } catch {
      console.error("Error al obtener tags");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    formik.setFieldValue("name", tag.name);
    setIsModalOpen(true);
  };

  const handleDelete = async (idTag: string) => {
    if (window.confirm("¿Eliminar esta etiqueta?")) {
      try {
        await deleteTag(idTag);
        fetchTags(tagPage?.number ?? 0);
      } catch {
        alert("Error al eliminar");
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (tagPage && newPage >= 0 && newPage < tagPage.totalPages) {
      fetchTags(newPage);
    }
  };

  const mostUsedTag = tagPage?.content.reduce(
    (max, tag) => (tag.usageCount > max.usageCount ? tag : max),
    tagPage.content[0],
  );

  const startItem = tagPage ? tagPage.number * tagPage.size + 1 : 0;
  const endItem = tagPage
    ? Math.min(startItem + tagPage.numberOfElements - 1, tagPage.totalElements)
    : 0;

  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      <main className="md:ml-64 min-h-screen transition-all bg-[#0e0e10] pb-20 md:pb-0 flex-1">
        <Header />

        <div className="p-8 lg:p-12 space-y-12">
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <span className="text-[#cc97ff] font-extrabold text-xs tracking-[0.2em] uppercase">
                Panel de Gestión
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white">
                Gestión de Etiquetas
              </h1>
              <p className="text-[#adaaad] max-w-xl font-medium">
                Organice sus testimonios utilizando etiquetas de clasificación.
                Administre sus etiquetas globales en toda la organización.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingTag(null);
                formik.resetForm();
                setIsModalOpen(true);
              }}
              className="px-6 py-2.5 bg-[#9333ea] text-white rounded-lg font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
            >
              <Plus size={18} />
              Crear nueva etiqueta
            </button>
          </section>

          {/* Stats + Tags Cloud */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Tags Cloud */}
            <div className="md:col-span-8 bg-[#131315] p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <span className="text-8xl">☁</span>
              </div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-[#9e41f5] rounded-full" />
                <h3 className="text-xl font-bold text-white">
                  Visualización de etiquetas en la nube
                </h3>
              </div>
              {isLoading ? (
                <div className="flex flex-wrap gap-4 items-center justify-center min-h-[240px]">
                  <span className="text-[#adaaad]">Cargando etiquetas...</span>
                </div>
              ) : tagPage?.content.length === 0 ? (
                <div className="flex flex-wrap gap-4 items-center justify-center min-h-[240px]">
                  <span className="text-[#adaaad]">
                    Aún no hay etiquetas. ¡Crea tu primera etiqueta!
                  </span>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 items-center justify-center min-h-[240px]">
                  {tagPage?.content.map((tag, index) => (
                    <span
                      key={tag.id}
                      className={`px-6 py-3 cursor-pointer hover:scale-105 transition-transform ${getCloudStyle(tag.usageCount, index)}`}
                      title={`${tag.name} - ${tag.usageCount} usages`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <div className="bg-[#9333ea] p-6 rounded-lg text-white flex flex-col justify-between overflow-hidden relative">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                  Total de Etiquetas Activas
                </p>
                <h4 className="text-6xl font-black tracking-tighter">
                  {tagPage?.totalElements ?? 0}
                </h4>
                <div className="flex items-center gap-2 text-white text-xs font-bold mt-2">
                  <span>📈</span>A través de la organización
                </div>
              </div>
              <div className="bg-[#1f1f22] p-6 rounded-lg border border-[#262528] flex flex-col justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-[#adaaad]">
                  Etiquetas más usadas
                </p>
                <h4 className="text-2xl font-black tracking-tight text-[#cc97ff]">
                  {mostUsedTag?.name ?? "-"}
                </h4>
                <p className="text-xs font-medium text-[#adaaad] mt-2">
                  {mostUsedTag
                    ? `Applied to ${mostUsedTag.usageCount} items`
                    : "No data"}
                </p>
              </div>
            </div>
          </section>

          {/* Table Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-white">
                Tabla de Etiquetas
              </h3>
            </div>

            <div className="bg-[#131315] rounded-lg overflow-hidden border border-[#1f1f22]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1f1f22]/50 border-b border-[#1f1f22]">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#adaaad]">
                      Identidad de la etiqueta
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#adaaad] text-center">
                      Conteo de uso
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#adaaad]">
                      Creado en
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#adaaad] text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f22]">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-[#adaaad]"
                      >
                        Cargando...
                      </td>
                    </tr>
                  ) : tagPage?.content.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-[#adaaad]"
                      >
                        Etiquetas no encontradas
                      </td>
                    </tr>
                  ) : (
                    tagPage?.content.map((tag) => (
                      <tr
                        key={tag.id}
                        className="hover:bg-[#1f1f22]/30 transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#9333ea]" />
                            <span className="font-bold text-[#f9f5f8]">
                              {tag.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center font-black text-[#cc97ff]">
                          {tag.usageCount}
                        </td>
                        <td className="px-6 py-5 text-sm text-[#adaaad] font-medium">
                          {new Date(tag.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(tag)}
                              className="p-2 text-[#adaaad] hover:text-[#cc97ff] transition-colors"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(tag.id)}
                              className="p-2 text-red-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {tagPage && tagPage.totalPages > 1 && (
                <div className="px-6 py-4 bg-[#1f1f22]/20 border-t border-[#1f1f22] flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#adaaad]">
                    Mostrando {startItem}-{endItem} of {tagPage.totalElements}{" "}
                    resultados
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(tagPage.number - 1)}
                      disabled={tagPage.first}
                      className="p-2 rounded-lg hover:bg-[#1f1f22] text-[#adaaad] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-[#9333ea] text-white text-xs font-black">
                      {tagPage.number + 1}
                    </button>
                    <button
                      onClick={() => handlePageChange(tagPage.number + 1)}
                      disabled={tagPage.last}
                      className="p-2 rounded-lg hover:bg-[#1f1f22] text-[#adaaad] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#131315] p-6 rounded-lg w-full max-w-md border border-[#262528]">
            <h3 className="text-xl font-bold mb-4 text-white">
              {editingTag ? "Editar etiqueta" : "Crear nueva etiqueta"}
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <label className="block text-sm font-medium text-[#adaaad] mb-2">
                Nombre de la etiqueta
              </label>
              <input
                type="text"
                className="w-full mb-3 p-3 bg-[#1f1f22] rounded-lg text-white border border-[#262528] focus:border-[#9333ea] focus:outline-none"
                name="name"
                placeholder="Enter tag name..."
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 p-2 rounded mb-3 text-sm">
                  {formik.errors.name}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTag(null);
                    formik.resetForm();
                  }}
                  className="flex-1 bg-[#1f1f22] p-3 rounded-lg text-[#adaaad] font-semibold hover:bg-[#262528] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#9333ea] p-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  {editingTag ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
