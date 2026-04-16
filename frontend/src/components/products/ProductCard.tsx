import { Info, Link, Trash } from "lucide-react";
import type { ListProductsCardProps } from "../../types/product";
import { NavLink } from "react-router-dom";

function ProductCard({ product, onDelete }: ListProductsCardProps) {
  const style = {
    color: "black",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div className="group bg-[#131315] p-8 rounded-lg relative overflow-hidden flex flex-col justify-between min-h-[320px] transition-all hover:bg-[#1f1f22]">
      {/* Imagen de fondo */}
      {product.picture && (
        <div className="absolute inset-0 z-0">
          <img
            src={product.picture}
            alt=""
            className="w-full h-full object-cover opacity-20 blur-[2px] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/70 to-transparent" />
        </div>
      )}

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2 mb-4">
          {product.tags.slice(0, 4).map((tag) => (
            <span
              key={tag.id}
              className="px-2.5 py-1 bg-[#9333ea]/30 text-[#cc97ff] rounded-full text-xs font-semibold border border-[#9333ea]/30"
            >
              {tag.name}
            </span>
          ))}
          {product.tags.length > 4 && (
            <span className="px-2.5 py-1 bg-[#1f1f22] text-[#adaaad] rounded-full text-xs font-medium border border-[#262528]">
              +{product.tags.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Contenido */}
      <div className="relative z-10 space-y-4 flex-1">
        <h3
          className="text-3xl font-extrabold text-[#cc97ff] leading-tight"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {product.name}
        </h3>
        <p
          className="text-[#adaaad] text-base leading-relaxed max-w-md"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {product.description}
        </p>
      </div>

      {/* Botones */}
      <div className="relative z-10 flex gap-2 mt-6">
        <button className="bg-[#1f1f22] text-[#f9f5f8] px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(170,59,255,0.35)] transition-all duration-350 hover:bg-[#9333ea] hover:text-white hover:shadow-lg active:scale-95 active:shadow-none active:translate-y-0.5 flex-1">
          <Link size={18} />
          <span className="hidden sm:inline">Generar enlace</span>
        </button>
        <NavLink
          to={`/products/${product.id}`}
          style={style}
          className="bg-[#0dcaf0] text-black px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(170,59,255,0.35)] transition-all duration-350 hover:bg-[#02A3C2] hover:shadow-lg active:scale-95 active:shadow-none active:translate-y-0.5 flex-1"
        >
          <Info size={18} />
          <span className="hidden sm:inline">Detalle</span>
        </NavLink>
        <button
          onClick={onDelete}
          className="bg-red-600 text-[#f9f5f8] px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(170,59,255,0.35)] transition-all duration-350 hover:bg-red-700 hover:shadow-lg active:scale-95 active:shadow-none active:bg-red-800 active:translate-y-0.5 flex-1"
        >
          <Trash size={18} />
          <span className="hidden sm:inline">Eliminar</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
