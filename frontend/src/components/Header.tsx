import { UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { AuthMeUser } from "../../types/auth";
import { authMe } from "../../services/authService";

function Header() {
  const [user, setUser] = useState<AuthMeUser | undefined>(undefined);

  useEffect(() => {
    // Aquí se llama al servicio para obtener los datos del usuario autenticado
    async function getMe() {
      try {
        const userAuth = await authMe();
        console.log("Datos del usuario en Header:", userAuth);
        setUser(userAuth);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getMe();
  }, []);

  return (
    <header className="bg-[#131315] sticky top-0 z-30 flex justify-between items-center px-8 py-4 w-full border-b border-[#262528]">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <input
            className="w-full pl-10 pr-4 py-2 bg-[#1f1f22] border-none rounded-lg text-sm text-[#f9f5f8] focus:ring-2 focus:ring-[#9333ea]/50 placeholder:text-[#adaaad]/50"
            placeholder="Search products..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-xs font-bold text-[#f9f5f8] leading-none">
              {user ? user.userName : "Loading..."}
            </p>
            <p className="text-[10px] text-[#adaaad] font-medium">
              {user ? user.userEmail : "Loading..."}
            </p>
          </div>
          <UserCheck />
        </div>
      </div>
    </header>
  );
}

export default Header;
