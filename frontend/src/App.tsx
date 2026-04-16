import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SubmitTestimonyPage from "./pages/testimonials/SubmitTestimonyPage";
import PendingTestimonialsPage from "./pages/testimonials/PendingTestimonialsPage";
import WallOfLovePage from "./pages/testimonials/WallOfLovePage";
import ProductsListPage from "./pages/products/ProductsListPage";
import DetailProductPage from "./pages/products/DetailProductPage";
import TagsPage from "./pages/tags/TagsPage";
import AppProvider from "./provider/AppProvider";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { ProtectedRouteOwner } from "./routes/ProtectedRouteOwner";

function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* CMS */}
        <Route element={<ProtectedRouteOwner />}>
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/products/:idProduct" element={<DetailProductPage />} />
          <Route
            path="/testimonials/submit"
            element={<SubmitTestimonyPage />}
          />
          <Route path="/moderation" element={<PendingTestimonialsPage />} />
          <Route path="/wall-of-love" element={<WallOfLovePage />} />

          {/* TODO: <Route path="/dashboard" element={<DashboardPage />} /> */}
          {/* TODO: <Route path="/testimonials" element={<TestimonialsListPage />} /> */}
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
