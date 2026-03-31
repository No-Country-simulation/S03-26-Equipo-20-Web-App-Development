import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import type { RegisterOrgPayload } from "../../types/auth";

// ─── Tipos de errores de validación ──────────────────────────

type RegisterErrors = Partial<Record<keyof RegisterOrgPayload, string>>;

// ─── Validación ───────────────────────────────────────────────

function validate(form: RegisterOrgPayload): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!form.organizationName.trim()) {
    errors.organizationName = "El nombre de la organización es requerido.";
  } else if (form.organizationName.trim().length < 2) {
    errors.organizationName = "Debe tener al menos 2 caracteres.";
  }

  if (!form.username.trim()) {
    errors.username = "El nombre de usuario es requerido.";
  } else if (form.username.trim().length < 3) {
    errors.username = "Debe tener al menos 3 caracteres.";
  } else if (!/^[a-zA-Z0-9_-]+$/.test(form.username)) {
    errors.username = "Solo letras, números, guiones y guiones bajos.";
  }

  if (!form.logo.trim()) {
    errors.logo = "La URL del logo es requerida.";
  } else {
    try {
      new URL(form.logo);
    } catch {
      errors.logo = "Ingresá una URL válida (ej: https://miempresa.com/logo.png).";
    }
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

const emptyForm: RegisterOrgPayload = {
  organizationName: "",
  logo: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterOrgPayload>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<RegisterErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof RegisterOrgPayload]) {
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
      // TODO: guardar token y organización en contexto global / localStorage
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
      <h1 className="auth-card-title">Registrar organización</h1>
      <p className="auth-card-subtitle">Completá los datos de tu empresa para comenzar</p>

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
            ✓ Organización registrada exitosamente. Redirigiendo…
          </div>
        )}

        {/* ── Nombre de la organización ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="register-org-name">
            Nombre de la organización
          </label>
          <input
            id="register-org-name"
            name="organizationName"
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            value={form.organizationName}
            onChange={handleChange}
            className={`auth-input${fieldErrors.organizationName ? " error" : ""}`}
            disabled={isDisabled}
          />
          {fieldErrors.organizationName && (
            <span className="auth-field-error">{fieldErrors.organizationName}</span>
          )}
        </div>

        {/* ── Username ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="register-username">
            Nombre de usuario
          </label>
          <input
            id="register-username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="acme_corp"
            value={form.username}
            onChange={handleChange}
            className={`auth-input${fieldErrors.username ? " error" : ""}`}
            disabled={isDisabled}
          />
          {fieldErrors.username && (
            <span className="auth-field-error">{fieldErrors.username}</span>
          )}
        </div>

        {/* ── Logo URL ── */}
        <div className="auth-field">
          <label className="auth-label" htmlFor="register-logo">
            URL del logo
          </label>
          <input
            id="register-logo"
            name="logo"
            type="url"
            autoComplete="off"
            placeholder="https://miempresa.com/logo.png"
            value={form.logo}
            onChange={handleChange}
            className={`auth-input${fieldErrors.logo ? " error" : ""}`}
            disabled={isDisabled}
          />
          {fieldErrors.logo && (
            <span className="auth-field-error">{fieldErrors.logo}</span>
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
            placeholder="contacto@miempresa.com"
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
              Registrando organización…
            </>
          ) : (
            "Registrar organización"
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
