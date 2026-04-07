import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { CirclePlus } from "lucide-react";
import Header from "../../components/Header";
import ProductCard from "../../components/products/ProductCard";

const products = [
  {
    id: 1,
    tag: "Premium Course",
    title: "React Bootcamp: Zero to Hero",
    description:
      "A comprehensive 12-week intensive designed for career switchers looking to master modern React, Next.js, and the broader ecosystem.",
    updateTime: "Updated 2 days ago",
  },
  {
    id: 2,
    tag: "Design Track",
    title: "UI Design Masterclass",
    description:
      "Advanced visual design principles focusing on typography, color theory, and high-fidelity prototyping for enterprise applications.",
    updateTime: "Updated 5 days ago",
  },
  {
    id: 3,
    tag: "Backend Systems",
    title: "Architecture & Microservices",
    description:
      "Deep dive into distributed systems, Docker orchestration, and high-availability server architecture.",
    updateTime: "Updated 10 days ago",
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
                Catalog Management
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[#f9f5f8] tracking-tight"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Product Ecosystem
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
              Register New Product
            </button>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-purple-300">
              <p className="text-sm text-[#f9f5f8]-variant mb-1">
                Total Curriculums
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
                Active testimonials
              </p>
              <p
                className="text-4xl font-extrabold text-[#f9f5f8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                1,284
              </p>
            </div>
            <div className="bg-[#131315] p-6 rounded-lg border-l-4 border-purple-400">
              <p className="text-sm text-[#f9f5f8]-variant mb-1">
                Avg. Sentiment Score
              </p>
              <p
                className="text-4xl font-extrabold text-[#f9f5f8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                98.2%
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
              placeholder="Product name"
              className="w-full mb-3 p-2 bg-[#1f1f22] rounded"
            />

            <label>Descripción</label>
            <textarea
              placeholder="Description"
              className="w-full mb-3 p-2 bg-[#1f1f22] rounded resize-none"
            />

            <label>Imagen</label>
            <input
              type="file"
              name=""
              id=""
              placeholder="Description"
              className="w-full mb-3 p-2 bg-[#1f1f22] rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-600 p-2 rounded"
              >
                Cancel
              </button>
              <button className="flex-1 bg-purple-600 p-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
