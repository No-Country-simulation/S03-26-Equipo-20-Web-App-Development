import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SubmitTestimonyPage from "./pages/testimonials/SubmitTestimonyPage";
import PendingTestimonialsPage from "./pages/testimonials/PendingTestimonialsPage";
import ProductsListPage from "./pages/products/ProductsListPage";
import DetailProductPage from "./pages/products/DetailProductPage";
import TagsPage from "./pages/tags/TagsPage";

function App() {
  return (
    <Routes>
      {/* Redirige la raíz al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* CMS */}
      <Route path="/products" element={<ProductsListPage />} />
      <Route path="/products/:idProduct" element={<DetailProductPage />} />
      <Route path="/testimonials/submit" element={<SubmitTestimonyPage />} />
      <Route path="/moderation" element={<PendingTestimonialsPage />} />

      {/* TODO: <Route path="/dashboard" element={<DashboardPage />} /> */}
      {/* TODO: <Route path="/testimonials" element={<TestimonialsListPage />} /> */}
      <Route path="/tags" element={<TagsPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
