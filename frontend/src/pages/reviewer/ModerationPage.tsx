import React, { useEffect, useState } from "react";
import type { Testimony } from "../../types/review";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Gavel, Loader2, PencilLine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { ListTestimonial } from "../../types/testimony";
import { useFormik } from "formik";
import { reviewValidationSchema } from "../../utils/validationSchemas";
import { createReview } from "../../services/reviewService";
import toast from "react-hot-toast";
import { listOneTestimonial } from "../../services/testimonyService";

export default function ModerationPage() {
  // Estado para el formulario de decisión
  const [oneTestimonial, setOneTestimonial] = useState<ListTestimonial | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const { idTestimonial } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idTestimonial: idTestimonial,
      status: "",
      comment: "",
    },
    validationSchema: reviewValidationSchema,
    onSubmit: async (values) => {
      try {
        await createReview(values);
        console.log("Value en formik: ", values);
        setTimeout(() => {
          navigate("/moderation");
        }, 1500);
      } catch (error) {
        toast.error("Error de conexión");
        console.error("Error al guardar el producto:", error);
      }
    },
  });

  useEffect(() => {
    async function getTestimonialById(id: string) {
      setIsLoading(true); // Aseguramos que empiece a cargar
      try {
        const response = await listOneTestimonial(id);

        // LOG CRÍTICO: Revisa qué estructura llega realmente
        console.log("Estructura real recibida:", response);

        if (response && response.testimonial) {
          setOneTestimonial(response);
        } else {
          console.error("La respuesta no tiene el formato esperado");
          setOneTestimonial(null);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
        setOneTestimonial(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (idTestimonial) {
      getTestimonialById(idTestimonial);
    }
  }, [idTestimonial]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <Loader2 className="animate-spin text-[#9333ea]" size={48} />
      </div>
    );
  }

  if (!oneTestimonial || !oneTestimonial.id) {
    return <div>No se encontró el testimonio.</div>;
  }

  return (
    <div className="flex min-h-screen bg-background font-body text-on-surface">
      <Sidebar />

      {/* Main Area */}
      <main className="ml-64 flex-1 flex flex-col">
        <Header />

        {/* Content */}
        <div className="p-10 max-w-7xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-[#cc97ff] text-sm font-bold mb-2">
              <Gavel />
              <span className="uppercase tracking-widest">Moderación</span>
            </div>
            <h2 className="text-4xl font-extrabold text-[#f9f5f8] tracking-tight">
              Revisar testimonio
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Preview Column */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <div className="bg-[#131315] rounded-xl p-8 border-l-4 border-[#9333ea]">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#f9f5f8]">
                        {/* Doble protección: check de objeto y check de propiedad */}
                        {oneTestimonial && oneTestimonial.visitor
                          ? oneTestimonial.visitor.name
                          : "Nombre no disponible"}
                      </h3>
                      <p className="text-sm text-[#adaaad]">
                        {oneTestimonial?.visitor?.email ||
                          "Email no disponible"}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="text-2xl font-bold text-[#f9f5f8] leading-snug mb-8 italic">
                  "
                  {oneTestimonial && oneTestimonial.testimonial
                    ? oneTestimonial.testimonial.title
                    : "Titulo no disponible"}
                  "
                </blockquote>
                <blockquote className="text-2xl font-bold text-[#f9f5f8] leading-snug mb-8 italic">
                  "
                  {oneTestimonial && oneTestimonial.testimonial
                    ? oneTestimonial.testimonial.content
                    : "Contenido no disponible"}
                  "
                </blockquote>

                {oneTestimonial.media?.url ? (
                  <div className="aspect-video rounded-xl overflow-hidden bg-[#1f1f22] border border-[#262528]">
                    <img
                      className="w-full h-full object-cover"
                      src={oneTestimonial.media.url}
                      alt="Evidencia"
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-xl bg-[#1f1f22] flex items-center justify-center border border-dashed border-[#262528]">
                    <p className="text-[#adaaad]">Sin evidencia multimedia</p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Column */}
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-[#131315] rounded-xl p-8 border border-[#262528] sticky top-24">
                <h4 className="text-lg font-bold text-[#f9f5f8] mb-6 flex items-center gap-2">
                  <PencilLine />
                  Acciones del Moderador
                </h4>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#adaaad] uppercase tracking-widest">
                      Id del Testimonio
                    </label>
                    <input
                      type="text"
                      name="idTestimonial"
                      value={formik.values.idTestimonial ?? ""}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#adaaad] uppercase">
                      Decisión Final
                    </label>
                    <select
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      className="w-full bg-[#1f1f22] border-none rounded-lg px-4 py-3 text-sm text-[#f9f5f8] outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Elige una acción...</option>
                      <option value="APPROVED">Aceptar - Publicar</option>
                      <option value="REJECTED">Rechazar - Anulado</option>
                    </select>
                  </div>
                  {formik.touched.status && formik.errors.status && (
                    <p className="text-red-400 text-xs mt-1">
                      {formik.errors.status}
                    </p>
                  )}

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#adaaad] uppercase">
                      Comentarios
                    </label>
                    <textarea
                      rows={4}
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      className="w-full bg-[#1f1f22] border-none rounded-lg px-4 py-3 text-sm text-[#f9f5f8] outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Agrega un comentario..."
                    />
                  </div>
                  {formik.touched.comment && formik.errors.comment && (
                    <p className="text-red-400 text-xs mt-1">
                      {formik.errors.comment}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#9333ea] text-white py-3.5 rounded-lg font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Registrar revisión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
