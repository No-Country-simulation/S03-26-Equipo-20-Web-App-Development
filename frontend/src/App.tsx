import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/products/ProductsListPage";
import DetailProductPage from "./pages/products/DetailProductPage";

function App() {
  return (
    <Routes>
      {/* Redirige la raíz al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* TODO: agregar aquí las rutas del dashboard/CMS cuando estén listas */}
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:idProduct" element={<DetailProductPage />} />
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
