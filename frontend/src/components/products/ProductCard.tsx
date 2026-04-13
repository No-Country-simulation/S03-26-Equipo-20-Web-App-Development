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
      <div className="space-y-4 relative">
        {/* <div className="flex items-center gap-3">
          <span
            className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              tag.includes("Premium")
                ? "bg-[#9333ea]/20 text-[#9333ea]"
                : "bg-[#cc97ff]/20 text-[#cc97ff]"
            }`}
          >
            {tag}
          </span>
          <span className="text-[#adaaad] text-xs font-medium">
            {updateTime}
          </span>
        </div> */}
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
      <div className="flex gap-2 mt-6">
        <button className="bg-[#1f1f22] text-[#f9f5f8] w-60 px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(170,59,255,0.35)] transition-all duration-350 hover:bg-[#9333ea] hover:text-white">
          <Link />
          Generate Link
        </button>
        <NavLink
          to={`/products/${product.id}`}
          style={style}
          className="bg-[#0dcaf0] w-60 px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(170,59,255,0.35)] transition-all duration-350 hover:bg-[#02A3C2] hover:text-black"
        >
          <Info />
          Detalle
        </NavLink>
        <button
          onClick={onDelete}
          className="bg-red-600 text-[#f9f5f8] w-60 px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(170,59,255,0.35)] transition-all duration-350 hover:bg-red-700 hover:text-white"
        >
          <Trash />
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
