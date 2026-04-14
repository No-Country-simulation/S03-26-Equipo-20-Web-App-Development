/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Clock,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Loader2,
  AlertCircle,
  Quote,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  getPendingTestimonials,
  moderateTestimony,
} from "../../services/testimonyService";
import type { Testimony } from "../../types/testimony";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function tiempoAtras(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  const d = Math.floor(diff / 86_400_000);
  if (h < 1) return "Hace un momento";
  if (h < 24) return `Hace ${h}h`;
  if (d === 1) return "Ayer";
  return `Hace ${d} días`;
}

function truncar(texto: string, max: number) {
  return texto.length > max ? texto.slice(0, max) + "…" : texto;
}

// ─── Sub-componentes ───────────────────────────────────────────────────────────

interface TestimonyCardProps {
  testimony: Testimony;
  isExpanded: boolean;
  onToggle: () => void;
  onApprove: () => void;
  onReject: () => void;
  moderating: boolean;
}

function TestimonyCard({
  testimony,
  isExpanded,
  onToggle,
  onApprove,
  onReject,
  moderating,
}: TestimonyCardProps) {
  return (
    <article className="bg-[#131315] rounded-xl border border-[#262528] overflow-hidden transition-all hover:border-[#9333ea]/30 group">
      {/* Encabezado de la tarjeta */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          {/* Badge de producto + tiempo */}
          <div className="flex items-center gap-2 flex-wrap">
            {testimony.productName && (
              <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-[#9333ea]/15 text-[#cc97ff] border border-[#9333ea]/20">
                {testimony.productName}
              </span>
            )}
            <span className="flex items-center gap-1 text-[#adaaad] text-xs">
              <Clock className="w-3 h-3" />
              {tiempoAtras(testimony.submittedAt)}
            </span>
          </div>

          {/* Titular */}
          <h3 className="text-[#f9f5f8] font-bold text-base leading-snug group-hover:text-[#cc97ff] transition-colors">
            {testimony.headline}
          </h3>

          {/* Autor */}
          <p className="text-[#adaaad] text-xs">
            <span className="font-semibold text-[#f9f5f8]/70">
              {testimony.fullName}
            </span>
            {" · "}
            {testimony.email}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id={`aprobar-${testimony.id}`}
            onClick={onApprove}
            disabled={moderating}
            title="Aprobar testimonio"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {moderating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            Aprobar
          </button>
          <button
            id={`rechazar-${testimony.id}`}
            onClick={onReject}
            disabled={moderating}
            title="Rechazar testimonio"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold hover:bg-red-500/20 hover:border-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle className="w-3.5 h-3.5" />
            Rechazar
          </button>
        </div>
      </div>

      {/* Previsualización / texto expandido */}
      <div className="px-5 pb-3">
        <div className="relative">
          <Quote className="absolute -left-1 -top-1 w-4 h-4 text-[#9333ea]/30" />
          <p className="text-[#adaaad] text-sm leading-relaxed pl-4 italic">
            {isExpanded ? testimony.story : truncar(testimony.story, 180)}
          </p>
        </div>

        {testimony.story.length > 180 && (
          <button
            onClick={onToggle}
            className="mt-2 flex items-center gap-1 text-[#9333ea] text-xs font-semibold hover:underline transition-all"
          >
            {isExpanded ? (
              <>
                Ver menos <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Leer más <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Link de video */}
      {testimony.videoUrl && (
        <div className="px-5 pb-4">
          <a
            href={testimony.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#9333ea] font-semibold border border-[#9333ea]/30 px-3 py-1.5 rounded-lg hover:bg-[#9333ea]/10 transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            Ver testimonio en video
          </a>
        </div>
      )}
    </article>
  );
}

// ─── Página principal ──────────────────────────────────────────────────────────

export default function PendingTestimonialsPage() {
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [moderatingId, setModeratingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    id: string;
    accion: "aprobado" | "rechazado";
  } | null>(null);

  const [busqueda, setBusqueda] = useState("");
  const [filtroProd, setFiltroProd] = useState<string>("todos");

  // ── Carga de testimonios ────────────────────────────────────────────────────

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    setFetchError(null);

    getPendingTestimonials()
      .then((data) => {
        if (!cancelado) setTestimonials(data);
      })
      .catch((err) => {
        if (!cancelado)
          setFetchError(
            err instanceof Error
              ? err.message
              : "Error al cargar los testimonios.",
          );
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  // ── Datos derivados ─────────────────────────────────────────────────────────

  const productos = Array.from(
    new Set(testimonials.map((t) => t.productName).filter(Boolean)),
  ) as string[];

  const filtrados = testimonials.filter((t) => {
    const coincideBusqueda =
      t.headline.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.fullName.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.story.toLowerCase().includes(busqueda.toLowerCase());
    const coincideProd = filtroProd === "todos" || t.productName === filtroProd;
    return coincideBusqueda && coincideProd;
  });

  // ── Handlers ─────────────────────────────────────────────────────────────────

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleModerate(id: string, accion: "APPROVED" | "REJECTED") {
    setModeratingId(id);
    try {
      await moderateTestimony(id, { status: accion });
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setToast({
        id,
        accion: accion === "APPROVED" ? "aprobado" : "rechazado",
      });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Error al moderar:", err);
    } finally {
      setModeratingId(null);
    }
  }

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

            <button
              onClick={() => navigate("/testimonials/submit")}
              className="px-4 py-3 bg-gradient-to-br from-[#aa3bff] to-[#7c3aed] text-white rounded-[10px] text-sm font-semibold cursor-pointer transition-all duration-200 shadow-[0_4px_18px_rgba(170,59,255,0.35)] hover:opacity-90 active:scale-95 flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
            >
              + Enviar nuevo
            </button>
          </section>

          {/* Barra de estadísticas */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "En revisión",
                value: testimonials.length,
                color: "border-yellow-400",
              },
              {
                label: "Filtrados",
                value: filtrados.length,
                color: "border-purple-500",
              },
              {
                label: "Productos",
                value: productos.length,
                color: "border-purple-300",
              },
              {
                label: "Con video",
                value: testimonials.filter((t) => t.videoUrl).length,
                color: "border-blue-400",
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
                id="filtro-producto"
                value={filtroProd}
                onChange={(e) => setFiltroProd(e.target.value)}
                className="pl-10 pr-8 py-2.5 bg-[#131315] border border-[#262528] rounded-lg text-sm text-[#f9f5f8] outline-none focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="todos">Todos los productos</option>
                {productos.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Contenido */}
          {loading ? (
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
          ) : filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400/60" />
              <h3 className="text-xl font-bold text-[#f9f5f8]">
                ¡Todo al día!
              </h3>
              <p className="text-[#adaaad] max-w-sm">
                {busqueda || filtroProd !== "todos"
                  ? "Ningún testimonio coincide con los filtros actuales."
                  : "No hay testimonios pendientes de revisión en este momento."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtrados.map((t) => (
                <TestimonyCard
                  key={t.id}
                  testimony={t}
                  isExpanded={expandedIds.has(t.id)}
                  onToggle={() => toggleExpand(t.id)}
                  onApprove={() => handleModerate(t.id, "APPROVED")}
                  onReject={() => handleModerate(t.id, "REJECTED")}
                  moderating={moderatingId === t.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Notificación toast */}
      {toast && (
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
      )}
    </div>
  );
}
