import { Link } from "lucide-react";
import type { ProductCardProps } from "../../types/product";

function ProductCard({
  title,
  tag,
  description,
  updateTime,
}: ProductCardProps) {
  return (
    <div className="group bg-[#131315] p-8 rounded-lg relative overflow-hidden flex flex-col justify-between min-h-[320px] transition-all hover:bg-[#1f1f22]">
      <div className="space-y-4 relative">
        <div className="flex items-center gap-3">
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
        </div>
        <h3
          className="text-3xl font-extrabold text-[#cc97ff] leading-tight"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="text-[#adaaad] text-base leading-relaxed max-w-md"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {description}
        </p>
      </div>
      <button className="bg-[#1f1f22] text-[#f9f5f8] w-60 px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-[0_4px_18px_rgba(170,59,255,0.35)] transition-all duration-350 hover:bg-[#9333ea] hover:text-white">
        <Link />
        Generate Link
      </button>
    </div>
  );
}

export default ProductCard;
