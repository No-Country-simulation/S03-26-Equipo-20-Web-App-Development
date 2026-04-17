import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useOwner } from "../../context/owner/CreateUseOwner";
import { saludar } from "../../utils/formatters";
import StatCard from "../../components/dashboard/StatCard";
import { useEffect, useState } from "react";
import { getPendingTestimonials } from "../../services/testimonyService";
import type { Testimony } from "../../types/testimony";

export default function DashboardPage() {
  const { ownerAuth } = useOwner();
  const [pendingTestimonials, setPendingTestimonials] = useState<Testimony[]>(
    [],
  );
  const [pendingPage, setPendingPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    async function getPending() {
      try {
        const pending = await getPendingTestimonials();
        setPendingTestimonials(pending);
      } catch (error) {
        console.error("Error al obtener testimonios pendientes:", error);
      }
    }
    getPending();
  }, []);

  const start = pendingPage * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedPending = pendingTestimonials.slice(start, end);
  const totalPages = Math.ceil(pendingTestimonials.length / itemsPerPage);

  // const activities: ActivityItem[] = [
  //   {
  //     id: "1",
  //     userName: "Sarah Jenkins",
  //     avatarUrl:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuAH1W7_PgwlgL9nL_njGtRukC9uopdL3cW0yjKDGar-7W8ZZBMs41IpEGGaaQfjKF8i-513-4MoTODapQ6gvQA7walpCG60rBAvyhHw_9fpoZB7YC0Qe8RR-7KQiuMbXFeZzHTunfkbAAfBaTSMw_VNdi-AS_b8D1M6tjuds_6ITXPjPlJbqYwhnLu0uob4BUeL5U-hfWfccUX8Og7nA90nLfKRpuZpawkm7yW4yWVIpfowkQWx-QR7lsHXUdheAWw5EP37K1O50NE",
  //     timeAgo: "2 mins ago",
  //     content:
  //       '"The new workflow integration is absolutely seamless. I\'ve never seen such a clean implementation of a CMS before."',
  //     rating: 5,
  //     productName: "Nexus CRM",
  //     status: "pending",
  //   },
  // ];

  return (
    <div className="flex min-h-screen bg-background font-body text-on-surface">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header />

        {/* Canvas */}
        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl bg-surface-container-low p-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="relative z-10 space-y-4 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                {saludar()},{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc97ff] to-[#9e41f5]">
                  {ownerAuth?.userName}
                </span>
              </h2>
              <p className="text-on-surface-variant text-lg font-medium">
                En esta página podés gestionar tus productos, testimonios
                creados por tus clientes y revisar dichos testimonios para que
                se visualicen en tu página web.
              </p>
            </div>
          </section>
          {/* KPI Cards Grid */}
          <StatCard />

          {/* Pending Testimonials */}
          <section className="bg-surface-container-low rounded-3xl overflow-hidden p-8">
            <h3 className="text-xl font-extrabold text-white mb-4">
              Testimonios Pendientes Recientes
            </h3>
            <div className="space-y-4">
              {displayedPending.map((t) => (
                <div key={t.id} className="bg-white/5 p-4 rounded-lg">
                  <h4 className="text-white font-bold">{t.headline}</h4>
                  <p className="text-on-surface-variant text-sm line-clamp-2">
                    {t.story}
                  </p>
                  <p className="text-on-surface-variant text-xs mt-2">
                    {t.fullName}
                  </p>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setPendingPage((p) => p - 1)}
                  disabled={pendingPage === 0}
                  className="text-primary text-sm font-bold hover:underline disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-on-surface-variant text-sm">
                  Página {pendingPage + 1} de {totalPages}
                </span>
                <button
                  onClick={() => setPendingPage((p) => p + 1)}
                  disabled={pendingPage === totalPages - 1}
                  className="text-primary text-sm font-bold hover:underline disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </section>
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-surface-container-low rounded-3xl overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-white">
                  Recent Activity
                </h2>
                <button className="text-primary text-xs font-bold hover:underline">
                  View All
                </button>
              </div>
              <div className="divide-y divide-white/5">
                {activities.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex gap-4 hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <img
                      src={item.avatarUrl}
                      className="w-12 h-12 rounded-xl object-cover"
                      alt={item.userName}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-white group-hover:text-primary transition-colors">
                          {item.userName}
                        </h4>
                        <span className="text-[10px] text-on-surface-variant">
                          {item.timeAgo}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant line-clamp-2 italic mb-3">
                        {item.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                          Product: {item.productName}
                        </span>
                        <div className="flex gap-2">
                          <button className="text-[10px] font-bold px-3 py-1 bg-surface-container-highest rounded hover:text-primary transition-colors">
                            APPROVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
