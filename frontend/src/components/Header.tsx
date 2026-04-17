import { UserCheck, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AuthResponse } from "../types/auth";
import { authMe, logout } from "../services/authService";

function Header() {
  const [user, setUser] = useState<AuthResponse | undefined>(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Aquí se llama al servicio para obtener los datos del usuario autenticado
    async function getMe() {
      try {
        const userAuth = await authMe();
        setUser(userAuth);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getMe();
  }, []);

  async function handleLogout() {
    // Aquí tu lógica de logout (limpiar tokens, redireccionar, etc.)
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <header className="bg-[#131315] sticky top-0 z-30 flex justify-between items-center px-8 py-4 w-full border-b border-[#262528]">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <input
            className="w-full pl-10 pr-4 py-2 bg-[#1f1f22] border-none rounded-lg text-sm text-[#f9f5f8] focus:ring-2 focus:ring-[#9333ea]/50 placeholder:text-[#adaaad]/50"
            placeholder="Buscar productos..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        {/* Contenedor del Perfil con Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 pl-2 hover:bg-[#1f1f22] p-1.5 rounded-lg transition-colors duration-200"
          >
            <div className="hidden lg:text-right lg:block">
              <p className="text-xs font-bold text-[#f9f5f8] leading-none">
                {user ? user.name : "Loading..."}
              </p>
              <p className="text-[10px] text-[#adaaad] font-medium mt-1 uppercase tracking-tighter">
                {user ? user.role : "Loading..."}
              </p>
            </div>

            {/* Avatar o Icono */}
            <div className="w-8 h-8 rounded-full bg-[#9333ea]/20 flex items-center justify-center border border-[#9333ea]/40 text-[#cc97ff]">
              <UserCheck size={16} />
            </div>

            <ChevronDown
              size={14}
              className={`text-[#adaaad] transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Menú Desplegable (Toggle) */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#131315] border border-[#262528] rounded-xl shadow-2xl py-2 animate-in fade-in zoom-in duration-150 z-50">
              <div className="px-4 py-2 border-b border-[#262528] lg:hidden">
                <p className="text-xs font-bold text-[#f9f5f8] truncate">
                  {user?.userName}
                </p>
                <p className="text-[10px] text-[#adaaad]">{user?.role}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-150"
              >
                <LogOut size={16} />
                <span className="font-semibold">Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
