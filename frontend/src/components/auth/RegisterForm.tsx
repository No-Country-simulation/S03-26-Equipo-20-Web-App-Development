import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import type { RegisterPayload } from "../../types/auth";

// ─── Tipos de errores de validación ──────────────────────────

type RegisterErrors = Partial<Record<keyof RegisterPayload, string>>;

// ─── Validación ───────────────────────────────────────────────

function validate(form: RegisterPayload): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!form.name.trim()) {
    errors.name = "El nombre es requerido.";
  } else if (form.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres.";
  }

  if (!form.email.trim()) {
    errors.email = "El email es requerido.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Ingresá un email válido.";
  }

  if (!form.password) {
    errors.password = "La contraseña es requerida.";
  } else if (form.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Confirmá tu contraseña.";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
}

// ─── Componente ───────────────────────────────────────────────

const emptyForm: RegisterPayload = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterPayload>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<RegisterErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof RegisterPayload]) {
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
      const response = await register(form);
      // TODO: guardar token y usuario en contexto global / localStorage
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
      setSuccess(true);
      // TODO: redirigir al dashboard cuando exista
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : "Error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = loading || success;

  return (
    <div className="auth-card">
      <h1 className="auth-card-title">Crear cuenta</h1>
      <p className="auth-card-subtitle">Completá tus datos para registrarte</p>

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
            ✓ Cuenta creada exitosamente. Redirigiendo…
          </div>
        )}

        {/* ── Nombre ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="register-name">
            Nombre completo
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Juan García"
            value={form.name}
            onChange={handleChange}
            className={`auth-input${fieldErrors.name ? " error" : ""}`}
            disabled={isDisabled}
          />
          {fieldErrors.name && (
            <span className="auth-field-error">{fieldErrors.name}</span>
          )}
        </div>

        {/* ── Email ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="usuario@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            className={`auth-input${fieldErrors.email ? " error" : ""}`}
            disabled={isDisabled}
          />
          {fieldErrors.email && (
            <span className="auth-field-error">{fieldErrors.email}</span>
          )}
        </div>

        {/* ── Contraseña ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="register-password">
            Contraseña
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChange={handleChange}
            className={`auth-input${fieldErrors.password ? " error" : ""}`}
            disabled={isDisabled}
          />
          {fieldErrors.password && (
            <span className="auth-field-error">{fieldErrors.password}</span>
          )}
        </div>

        {/* ── Confirmar contraseña ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="register-confirm">
            Confirmar contraseña
          </label>
          <input
            id="register-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repetí tu contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`auth-input${fieldErrors.confirmPassword ? " error" : ""}`}
            disabled={isDisabled}
          />
          {fieldErrors.confirmPassword && (
            <span className="auth-field-error">{fieldErrors.confirmPassword}</span>
          )}
        </div>

        {/* ── Submit ── */}
        <button
          id="register-submit"
          type="submit"
          className="auth-btn"
          disabled={isDisabled}
        >
          {loading ? (
            <>
              <span className="auth-btn-spinner" aria-hidden="true" />
              Creando cuenta…
            </>
          ) : (
            "Crear cuenta"
          )}
        </button>
      </form>

      <p className="auth-switch">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}
