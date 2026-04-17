import type { ProductDetailCardProps } from "../../types/product";

function ProductDetailCard({ product }: ProductDetailCardProps) {
  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{ height: "50vh", minHeight: "300px" }}
    >
      {product.picture && (
        <div className="absolute inset-0 z-0">
          <img
            src={product.picture}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/70 to-transparent" />
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-[#9333ea]/30 text-[#cc97ff] rounded-full text-sm font-medium border border-[#9333ea]/30"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <h3
          className="text-4xl md:text-5xl font-extrabold text-[#f9f5f8] leading-tight"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {product.name}
        </h3>

        {product.description && (
          <p
            className="text-[#adaaad] text-base leading-relaxed mt-4 max-w-2xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductDetailCard;
