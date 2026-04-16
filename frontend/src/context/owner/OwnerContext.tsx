import React, { useEffect, useState } from "react";
import { OwnerContext } from "./CreateOwnerContext";
import { authMe, login } from "../../services/authService";
import type { AuthResponse, LoginPayload } from "../../types/auth";
import { useNavigate } from "react-router-dom";

export const OwnerProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [ownerAuth, setOwnerAuth] = useState<AuthResponse | null>();
  const [isAuthenticatedOwner, setIsAuthenticatedOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signup = async (
    ownerData: LoginPayload,
    setSuccess: (isSuccess: boolean) => void,
  ) => {
    try {
      const res = await login(ownerData);

      // 1. Guardar en Storage
      localStorage.setItem("auth_user", JSON.stringify(res));

      // 2. Actualizar estados
      setOwnerAuth(res);
      setIsAuthenticatedOwner(true);
      setSuccess(true);

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error) {
      console.error("Error en login:", error);
      setSuccess(false);
    }
  };

  const authenticationMe = async () => {
    try {
      const res = await authMe();
      console.log("Res de authMe: ", res);
      if (res) {
        setOwnerAuth({
          name: res.name,
          logo: res.logo,
          userEmail: res.userEmail,
          userName: res.userName,
          role: res.role,
        });
      }

      console.log("Res de authMe despues de setOwner: ", res);
      setIsAuthenticatedOwner(true);
    } catch (error) {
      console.error("No hay usuario autenticado:", error);
      setOwnerAuth(null);
      setIsAuthenticatedOwner(false);
      localStorage.removeItem("auth_user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticationMe();
  }, []);

  return (
    <OwnerContext.Provider
      value={{
        ownerAuth,
        loading,
        isAuthenticatedOwner,
        signup,
        authenticationMe,
      }}
    >
      {/* No mostramos nada hasta que termine de validar el token inicial */}
      {loading ? (
        <div className="h-screen bg-[#131315] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#9333ea]"></div>
        </div>
      ) : (
        children
      )}
    </OwnerContext.Provider>
  );
};
