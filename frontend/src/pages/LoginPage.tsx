import "../styles/auth.css";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="auth-page">
      {/* ── Panel izquierdo: branding ── */}
      <div className="auth-brand">
        <div className="auth-brand-logo">
          <div className="auth-brand-logo-icon">💬</div>
          <span className="auth-brand-logo-text">TestimonialCMS</span>
        </div>

        <h2 className="auth-brand-headline">
          Gestioná tus <span>testimonios</span> en un solo lugar
        </h2>

        <p className="auth-brand-sub">
          Recopilá, moderá y publicá historias reales de tus clientes para
          generar confianza y potenciar tu marca.
        </p>

        <ul className="auth-brand-features">
          <li>Testimonios en texto, imagen y video</li>
          <li>Clasificación por categorías y etiquetas</li>
          <li>Flujo de moderación y aprobación</li>
          <li>Embeds y API pública para tu sitio</li>
        </ul>
      </div>

      {/* ── Panel derecho: formulario ── */}
      <div className="auth-form-panel">
        <LoginForm />
      </div>
    </div>
  );
}
