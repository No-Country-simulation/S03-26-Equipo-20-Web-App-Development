import { Archive, Gavel, Heart, LayoutDashboard, Tag } from "lucide-react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 z-40 bg-[#0e0e10] flex-col py-6 border-r border-[#262528]">
      <div className="flex items-center gap-3 px-6 mb-8">
        <div className="w-10 h-10 rounded-lg bg-[#9333ea] flex items-center justify-center text-white">
          <img src="/favicon.svg" alt="Logo" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#cc97ff] tracking-tighter leading-none">
            TestimonialCMS
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-[#adaaad] font-bold">
            Plataforma de Testimonios
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard />}
          route="/dashboard"
          label="Panel de Control"
        />
        <SidebarItem icon={<Archive />} route="/products" label="Productos" />
        <SidebarItem
          icon={<Heart />}
          route="/wall-of-love"
          label="Muro del Amor"
        />
        <SidebarItem icon={<Gavel />} route="/moderation" label="Moderación" />
        <SidebarItem icon={<Tag />} route="/tags" label="Etiquetas" />
      </nav>
    </aside>
  );
}

export default Sidebar;
