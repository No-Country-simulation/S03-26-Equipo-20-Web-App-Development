import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import type { LoginPayload } from "../../types/auth";

// ─── Validación ───────────────────────────────────────────────

function validate(form: LoginPayload): Partial<LoginPayload> {
  const errors: Partial<LoginPayload> = {};
  if (!form.email.trim()) {
    errors.email = "El email es requerido.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Ingresá un email válido.";
  }
  if (!form.password) {
    errors.password = "La contraseña es requerida.";
  }
  return errors;
}

// ─── Componente ───────────────────────────────────────────────

export default function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<Partial<LoginPayload>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario escribe
    if (fieldErrors[name as keyof LoginPayload]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setGlobalError(null);

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await login(form);
      // TODO: guardar token y usuario en contexto global / localStorage
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
      setSuccess(true);
      // TODO: redirigir al dashboard cuando exista
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h1 className="auth-card-title">Bienvenido de nuevo</h1>
      <p className="auth-card-subtitle">Iniciá sesión en tu cuenta</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {/* ── Error global ── */}
        {globalError && (
          <div className="auth-alert auth-alert-error" role="alert">
            {globalError}
          </div>
        )}

        {/* ── Éxito ── */}
        {success && (
          <div className="auth-alert auth-alert-success" role="status">
            ✓ Sesión iniciada. Redirigiendo…
          </div>
        )}

        {/* ── Email ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="usuario@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            className={`auth-input${fieldErrors.email ? " error" : ""}`}
            disabled={loading || success}
          />
          {fieldErrors.email && (
            <span className="auth-field-error">{fieldErrors.email}</span>
          )}
        </div>

        {/* ── Contraseña ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="login-password">
            Contraseña
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={`auth-input${fieldErrors.password ? " error" : ""}`}
            disabled={loading || success}
          />
          {fieldErrors.password && (
            <span className="auth-field-error">{fieldErrors.password}</span>
          )}
        </div>

        {/* ── Submit ── */}
        <button
          id="login-submit"
          type="submit"
          className="auth-btn"
          disabled={loading || success}
        >
          {loading ? (
            <>
              <span className="auth-btn-spinner" aria-hidden="true" />
              Iniciando sesión…
            </>
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>

      <p className="auth-switch">
        ¿No tenés cuenta?{" "}
        <Link to="/register">Crear cuenta</Link>
      </p>
    </div>
  );
}
