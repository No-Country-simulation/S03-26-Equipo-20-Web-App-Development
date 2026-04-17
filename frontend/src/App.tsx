import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import SubmitTestimonyPage from "./pages/testimonials/SubmitTestimonyPage";
import PendingTestimonialsPage from "./pages/testimonials/PendingTestimonialsPage";
import WallOfLovePage from "./pages/testimonials/WallOfLovePage";
import ProductsListPage from "./pages/products/ProductsListPage";
import DetailProductPage from "./pages/products/DetailProductPage";
import TagsPage from "./pages/tags/TagsPage";
import AppProvider from "./provider/AppProvider";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { ProtectedRouteOwner } from "./routes/ProtectedRouteOwner";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Landing page pública */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* CMS */}
        <Route element={<ProtectedRouteOwner />}>
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/products/:idProduct" element={<DetailProductPage />} />
          <Route path="/moderation" element={<PendingTestimonialsPage />} />
          <Route path="/wall-of-love" element={<WallOfLovePage />} />

          {/* TODO: <Route path="/dashboard" element={<DashboardPage />} /> */}
          {/* TODO: <Route path="/testimonials" element={<TestimonialsListPage />} /> */}
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Formulario público de testimonios (sin auth) */}
        <Route path="/testimonials/submit" element={<SubmitTestimonyPage isPublic={true} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f1f22",
            color: "#f9f5f8",
            border: "1px solid #262528",
            borderRadius: "0.75rem",
            padding: "1rem",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#f9f5f8",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#f9f5f8",
            },
          },
        }}
      />
    </AppProvider>
  );
}

export default App;
