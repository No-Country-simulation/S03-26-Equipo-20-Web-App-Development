import "../styles/auth.css";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="auth-page">
      {/* ── Panel izquierdo: branding ── */}
      <div className="auth-brand">
        <div className="auth-brand-logo">
          <div className="auth-brand-logo-icon">💬</div>
          <span className="auth-brand-logo-text">TestimonialCMS</span>
        </div>

        <h2 className="auth-brand-headline">
          Registrá tu empresa en <span>minutos</span>
        </h2>

        <p className="auth-brand-sub">
          Creá la cuenta de tu organización y empezá a gestionar casos de éxito,
          moderar contenido y publicar testimonios al instante.
        </p>

        <ul className="auth-brand-features">
          <li>Panel de administración para tu equipo</li>
          <li>Integración con YouTube y Cloudinary</li>
          <li>Búsqueda inteligente con tags</li>
          <li>API REST documentada e integrable</li>
        </ul>
      </div>

      {/* ── Panel derecho: formulario ── */}
      <div className="auth-form-panel">
        <RegisterForm />
      </div>
    </div>
  );
}
