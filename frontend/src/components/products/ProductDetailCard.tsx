import type { ProductDetailCardProps } from "../../types/product";

function ProductDetailCard({ product }: ProductDetailCardProps) {
  return (
    <div className="group bg-[#131315] p-8 rounded-lg relative overflow-hidden flex flex-col justify-center min-h-[320px] transition-all hover:bg-[#1f1f22]">
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
        <div>
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
        {product.picture && (
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg mt-4"
          />
        )}
      </div>
    </div>
  );
}

export default ProductDetailCard;
