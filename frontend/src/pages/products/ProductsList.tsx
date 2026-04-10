import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { CirclePlus } from "lucide-react";
import Header from "../../components/Header";
import ProductCard from "../../components/products/ProductCard";

const products = [
  {
    id: 1,
    tag: "Curso Premium",
    title: "React Bootcamp: De Cero a Experto",
    description:
      "Un intensivo de 12 semanas diseñado para quienes quieren dominar React moderno, Next.js y el ecosistema completo.",
    updateTime: "Actualizado hace 2 días",
  },
  {
    id: 2,
    tag: "Diseño UX",
    title: "Masterclass de Diseño UI",
    description:
      "Principios avanzados de diseño visual: tipografía, teoría del color y prototipado de alta fidelidad para aplicaciones empresariales.",
    updateTime: "Actualizado hace 5 días",
  },
  {
    id: 3,
    tag: "Sistemas Backend",
    title: "Arquitectura y Microservicios",
    description:
      "Inmersión profunda en sistemas distribuidos, orquestación con Docker y arquitecturas de alta disponibilidad.",
    updateTime: "Actualizado hace 10 días",
  },
];

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      {/* Main */}
      <main className="md:ml-64 min-h-screen transition-all bg-[#0e0e10] pb-20 md:pb-0">
        <Header />
        <div className="p-8 lg:p-12 space-y-12">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span
                className="text-[#cc97ff] font-bold uppercase tracking-widest text-xs"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Gestión del catálogo
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[#f9f5f8] tracking-tight"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Productos disponibles
              </h2>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-3
              bg-gradient-to-br from-[#aa3bff] to-[#7c3aed]
              text-white
              rounded-[10px]
              text-[15px]
              font-semibold
              cursor-pointer
              transition-all duration-200
              shadow-[0_4px_18px_rgba(170,59,255,0.35)]
              relative
              overflow-hidden
              mt-1
              hover:opacity-90
              active:scale-95
              flex items-center justify-center gap-2"
            >
              <CirclePlus />
              Registrar nuevo producto
            </button>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-purple-300">
              <p className="text-sm text-[#f9f5f8]-variant mb-1">
                Total de currículums
              </p>
              <p
                className="text-4xl font-extrabold text-[#f9f5f8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                14
              </p>
            </div>
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-purple-600">
              <p className="text-sm text-[#f9f5f8]-variant mb-1">
                Testimonios activos
              </p>
              <p
                className="text-4xl font-extrabold text-[#f9f5f8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                1.284
              </p>
            </div>
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-purple-400">
              <p className="text-sm text-[#f9f5f8]-variant mb-1">
                Puntaje de sentimiento promedio
              </p>
              <p
                className="text-4xl font-extrabold text-[#f9f5f8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                98,2%
              </p>
            </div>
          </section>

          {/* Products */}
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                title={p.title}
                tag={p.tag}
                description={p.description}
                updateTime={p.updateTime}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#131315] p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Nuevo producto</h3>

            <label>Nombre</label>
            <input
              placeholder="Nombre del producto"
              className="w-full mb-3 p-2 bg-[#1f1f22] rounded"
            />

            <label>Descripción</label>
            <textarea
              placeholder="Describí el producto"
              className="w-full mb-3 p-2 bg-[#1f1f22] rounded resize-none"
            />

            <label>Imagen</label>
            <input
              type="file"
              name=""
              id=""
              className="w-full mb-3 p-2 bg-[#1f1f22] rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-600 p-2 rounded"
              >
                Cancelar
              </button>
              <button className="flex-1 bg-purple-600 p-2 rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
