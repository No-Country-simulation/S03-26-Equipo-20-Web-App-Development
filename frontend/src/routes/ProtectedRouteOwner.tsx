import { Navigate, Outlet } from "react-router-dom";
import { useOwner } from "../context/owner/CreateUseOwner";

export const ProtectedRouteOwner = () => {
  const { isAuthenticatedOwner, ownerAuth, loading } = useOwner();

  if (loading) return null;

  // Si no hay dueño autenticado O el objeto ownerAuth aún no tiene el rol...
  if (!isAuthenticatedOwner || !ownerAuth) {
    return <Navigate to="/login" replace />;
  }

  // Si ya tenemos el objeto pero el rol no es el correcto
  if (ownerAuth.role !== "OWNER") {
    // Agregamos un pequeño log para debuggear qué está llegando
    console.log("Rol detectado:", ownerAuth.role);
    return (
      <div className="text-center text-red-500 mt-10">
        Acceso denegado: solo los dueños pueden ver esta página.
      </div>
    );
  }

  return <Outlet />;
};
