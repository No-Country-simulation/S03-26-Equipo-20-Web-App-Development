/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  //getPendingTestimonials,
  listAllTestimonials,
  //moderateTestimony,
} from "../../services/testimonyService";
import type { ListTestimonials, TestimonialPage } from "../../types/testimony";
import TestimonyCard from "../../components/testimonial/TestimonyCard";
//import TestimonyCard from "../../components/testimonial/TestimonyCard";

// ─── Página principal ──────────────────────────────────────────────────────────

export default function PendingTestimonialsPage() {
  const navigate = useNavigate();

  // const [testimonials, setTestimonials] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  // const [moderatingId, setModeratingId] = useState<string | null>(null);
  // const [toast, setToast] = useState<{
  //   id: string;
  //   accion: "aprobado" | "rechazado";
  // } | null>(null);

  const [busqueda, setBusqueda] = useState("");
  // const [filtroProd, setFiltroProd] = useState<string>("todos");
  const [listTestimonials, setListTestimonials] = useState<ListTestimonials[]>(
    [],
  );
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "PUBLISHED" | "REJECTED"
  >("ALL");
  const [testimonialPage, setTestimonialPage] =
    useState<TestimonialPage | null>(null);

  // ── Carga de testimonios ────────────────────────────────────────────────────

  // useEffect(() => {
  //   let cancelado = false;
  //   setLoading(true);
  //   setFetchError(null);

  //   getPendingTestimonials()
  //     .then((data) => {
  //       if (!cancelado) setTestimonials(data);
  //     })
  //     .catch((err) => {
  //       if (!cancelado)
  //         setFetchError(
  //           err instanceof Error
  //             ? err.message
  //             : "Error al cargar los testimonios.",
  //         );
  //     })
  //     .finally(() => {
  //       if (!cancelado) setLoading(false);
  //     });

  //   return () => {
  //     cancelado = true;
  //   };
  // }, []);

  // Aquí se llama al servicio para listar los testimonios al cargar la página
  async function getAllTestimonials(page: number = 0) {
    try {
      const testimonials = await listAllTestimonials(
        page,
        10,
        "createdAt,desc",
      );
      console.log("Lista de testimonios: ", testimonials);
      setTestimonialPage(testimonials);
      setListTestimonials(testimonials.content);
    } catch (error) {
      console.error("Error al obtener los testimonios:", error);
      setFetchError(
        error instanceof Error
          ? error.message
          : "Error al cargar los testimonios.",
      );
    }
  }

  useEffect(() => {
    setLoading(true);
    setFetchError(null);

    getAllTestimonials();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (
      testimonialPage &&
      newPage >= 0 &&
      newPage < testimonialPage.totalPages
    ) {
      getAllTestimonials(newPage);
    }
  };

  const startItem = testimonialPage
    ? testimonialPage.number * testimonialPage.size + 1
    : 0;
  const endItem = testimonialPage
    ? Math.min(
        startItem + testimonialPage.numberOfElements - 1,
        testimonialPage.totalElements,
      )
    : 0;

  // ── Datos derivados ─────────────────────────────────────────────────────────

  // const productos = Array.from(
  //   new Set(testimonials.map((t) => t.productName).filter(Boolean)),
  // ) as string[];

  // const filtrados = listTestimonials.filter((t) => {
  //   const coincideBusqueda =
  //     t.testimonial.title.toLowerCase().includes(busqueda.toLowerCase()) ||
  //     t.visitor.name.toLowerCase().includes(busqueda.toLowerCase()) ||
  //     t.testimonial.content.toLowerCase().includes(busqueda.toLowerCase());
  //   return coincideBusqueda;
  // });

  // ── Handlers ─────────────────────────────────────────────────────────────────

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // async function handleModerate(id: string, accion: "APPROVED" | "REJECTED") {
  //   setModeratingId(id);
  //   try {
  //     await moderateTestimony(id, { status: accion });
  //     setTestimonials((prev) => prev.filter((t) => t.id !== id));
  //     setToast({
  //       id,
  //       accion: accion === "APPROVED" ? "aprobado" : "rechazado",
  //     });
  //     setTimeout(() => setToast(null), 3000);
  //   } catch (err) {
  //     console.error("Error al moderar:", err);
  //   } finally {
  //     setModeratingId(null);
  //   }
  // }

  const filteredTestimonials = listTestimonials.filter((t) => {
    const coincideBusqueda =
      t.testimonial.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.visitor.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.testimonial.content.toLowerCase().includes(busqueda.toLowerCase());
    const coincideStatus =
      statusFilter === "ALL" || t.testimonial.status === statusFilter;
    return coincideBusqueda && coincideStatus;
  });

  const statusCounts = listTestimonials.reduce(
    (acc, testimonial) => {
      const status = testimonial.testimonial.status;
      if (
        status === "PENDING" ||
        status === "PUBLISHED" ||
        status === "REJECTED"
      ) {
        acc[status]++;
      }
      return acc;
    },
    { PENDING: 0, PUBLISHED: 0, REJECTED: 0 },
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      <main className="md:ml-64 min-h-screen transition-all bg-[#0e0e10] pb-20 md:pb-0 flex-1">
        <Header />

        <div className="p-8 lg:p-12 space-y-10">
          {/* Encabezado de página */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span
                className="text-[#cc97ff] font-bold uppercase tracking-widest text-xs"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Cola de moderación
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[#f9f5f8] tracking-tight"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Testimonios pendientes
              </h2>
              <p className="text-[#adaaad] max-w-xl">
                Revisá y aprobá o rechazá los testimonios antes de que se
                publiquen. Los cambios son inmediatos.
              </p>
            </div>
          </section>

          {/* Barra de estadísticas */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Pendientes",
                value: statusCounts.PENDING,
                color: "border-yellow-400",
              },
              {
                label: "Aprobados/Publicados",
                value: statusCounts.PUBLISHED,
                color: "border-green-400",
              },
              {
                label: "Rechazados",
                value: statusCounts.REJECTED,
                color: "border-red-400",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className={`bg-[#131315] p-5 rounded-lg border-l-4 ${color}`}
              >
                <p className="text-xs text-[#adaaad] mb-1">{label}</p>
                <p
                  className="text-3xl font-extrabold text-[#f9f5f8]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </section>

          {/* Filtros */}
          <section className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adaaad]/50" />
              <input
                id="buscar-testimonios"
                type="text"
                placeholder="Buscar testimonios…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#131315] border border-[#262528] rounded-lg text-sm text-[#f9f5f8] placeholder:text-[#adaaad]/40 outline-none focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adaaad]/50 pointer-events-none" />
              <select
                id="filtro-testimonios"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "ALL"
                      | "PENDING"
                      | "PUBLISHED"
                      | "REJECTED",
                  )
                }
                className="pl-10 pr-8 py-2.5 bg-[#131315] border border-[#262528] rounded-lg text-sm text-[#f9f5f8] outline-none focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="ALL">Todos</option>
                <option value="PENDING">Pendientes</option>
                <option value="APPROVED">Aprobados/Publicados</option>
                <option value="REJECTED">Rechazados</option>
              </select>
            </div>
          </section>

          {/* Contenido */}
          {/* {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 text-[#9333ea] animate-spin" />
              <p className="text-[#adaaad] text-sm">Cargando testimonios…</p>
            </div>
          ) : fetchError ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-red-400 font-semibold">{fetchError}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-[#9333ea] underline hover:no-underline"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {listTestimonials.map(
                (testimonial) =>
                  testimonial.id && (
                    <TestimonyCard
                      key={testimonial.id}
                      testimonials={testimonial}
                      isExpanded={expandedIds.has(testimonial.id)}
                      onToggle={() =>
                        testimonial.id && toggleExpand(testimonial.id)
                      }
                    />
                  ),
              )}
            </div>
          )} */}
          <div className="space-y-4">
            {filteredTestimonials.map(
              (testimonial) =>
                testimonial.id && (
                  <TestimonyCard
                    key={testimonial.id}
                    testimonials={testimonial}
                    isExpanded={expandedIds.has(testimonial.id)}
                    onToggle={() =>
                      testimonial.id && toggleExpand(testimonial.id)
                    }
                  />
                ),
            )}
          </div>

          {/* Pagination */}
          {testimonialPage && testimonialPage.totalPages > 1 && (
            <div className="px-6 py-4 bg-[#1f1f22]/20 border-t border-[#1f1f22] flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#adaaad]">
                Showing {startItem}-{endItem} of {testimonialPage.totalElements}{" "}
                results
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(testimonialPage.number - 1)}
                  disabled={testimonialPage.first}
                  className="p-2 rounded-lg hover:bg-[#1f1f22] text-[#adaaad] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                <button className="px-3 py-1 rounded-lg bg-[#9333ea] text-white text-xs font-black">
                  {testimonialPage.number + 1}
                </button>
                <button
                  onClick={() => handlePageChange(testimonialPage.number + 1)}
                  disabled={testimonialPage.last}
                  className="p-2 rounded-lg hover:bg-[#1f1f22] text-[#adaaad] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Notificación toast */}
      {/* {toast && (
        <div
          className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold z-50 animate-slide-up
            ${
              toast.accion === "aprobado"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                : "bg-red-500/20 border border-red-500/40 text-red-300"
            }`}
        >
          {toast.accion === "aprobado" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          Testimonio {toast.accion} exitosamente.
        </div>
      )} */}
    </div>
  );
}
