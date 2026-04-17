import {
  ArrowRight,
  //CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Image,
  //Clock,
  PlayCircle,
  Quote,
} from "lucide-react";
import type { TestimonyCardProps } from "../../types/testimony";
import { formatDate, truncar } from "../../utils/formatters";
import { NavLink } from "react-router-dom";

export default function TestimonyCard({
  testimonials,
  isExpanded,
  onToggle,
}: TestimonyCardProps) {
  const style = {
    color: "white",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <article className="bg-[#131315] rounded-xl border border-[#262528] overflow-hidden transition-all hover:border-[#9333ea]/30 group">
      {/* Encabezado de la tarjeta */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          {/* Badge de producto + tiempo */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-[#9333ea]/15 text-[#cc97ff] border border-[#9333ea]/20">
              {testimonials.testimonial.status}
            </span>
            <span className="flex items-center gap-1 text-[#adaaad] text-xs">
              <Clock className="w-3 h-3" />
              {formatDate(testimonials.testimonial.createdAt)}
            </span>
          </div>

          {/* Titular */}
          <h3 className="text-[#f9f5f8] font-bold text-base leading-snug group-hover:text-[#cc97ff] transition-colors">
            {testimonials.testimonial.title}
          </h3>

          {/* Autor */}
          <p className="text-[#adaaad] text-xs">
            <span className="font-semibold text-[#f9f5f8]/70">
              {testimonials.visitor.name}
            </span>
            {" · "}
            {testimonials.visitor.email}
          </p>
        </div>

        {/* Botones de acción */}
        {/* <div className="flex items-center gap-2 shrink-0">
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
        </div> */}
        <NavLink
          to={`/moderation/${testimonials.id}`}
          style={style}
          className="px-3 py-3
              bg-gradient-to-br from-[#aa3bff] to-[#7c3aed]
              rounded-[10px]
              text-[15px]
              font-semibold
              transition-all duration-200
              shadow-[0_4px_18px_rgba(170,59,255,0.35)]
              relative
              overflow-hidden
              mt-1
              hover:opacity-90
              active:scale-95
              flex items-center justify-center gap-2"
        >
          Revisar testimonio
          <ArrowRight />
        </NavLink>
      </div>

      {/* Previsualización / texto expandido */}
      <div className="px-5 pb-3">
        <div className="relative">
          <Quote className="absolute -left-1 -top-1 w-4 h-4 text-[#9333ea]/30" />
          <p className="text-[#adaaad] text-sm leading-relaxed pl-4 italic">
            {isExpanded
              ? testimonials.testimonial.content
              : truncar(testimonials.testimonial.content, 180)}
          </p>
        </div>

        {testimonials.testimonial.content.length > 180 && (
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

      {/* Link de la foto */}
      {testimonials.media.url && (
        <div className="px-5 pb-4">
          <a
            href={testimonials.media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#9333ea] font-semibold border border-[#9333ea]/30 px-3 py-1.5 rounded-lg hover:bg-[#9333ea]/10 transition-colors"
          >
            <Image className="w-4 h-4" />
            Ver foto del testimonio
          </a>
        </div>
      )}
    </article>
  );
}
