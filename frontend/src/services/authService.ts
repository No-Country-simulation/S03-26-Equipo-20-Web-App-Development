// ============================================================
// Auth Service — Testimonial CMS
//
// TODO (backend): Reemplazar las funciones mockeadas por
// llamadas reales a la API Spring Boot.
// Base URL: http://localhost:8080/api/v1/auth
// ============================================================

import type {
  AuthResponse,
  AuthUserResponse,
  LoginPayload,
  RegisterOrgPayload,
} from "../types/auth";

// ─── Helper ──────────────────────────────────────────────────

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Login ───────────────────────────────────────────────────

/**
 * Inicia sesión con email y contraseña.
 * Endpoint real: POST /api/v1/auth/login
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL_AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return handleResponse<AuthResponse>(res);
}

// ─── Register ────────────────────────────────────────────────

/**
 * Registra una nueva organización.
 * Endpoint real: POST /api/v1/auth/register
 */
export async function register(
  payload: RegisterOrgPayload,
): Promise<AuthResponse> {

  const res = await fetch(`${import.meta.env.VITE_BASE_URL_AUTH}/register-org`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      name: payload.organizationName,
      logo: payload.logo,
      username: payload.username,
      email: payload.email,
      password: payload.password,
      repeatPassword: payload.confirmPassword,
    }),
  });

  return handleResponse<AuthResponse>(res);
}

export async function authMe(): Promise<AuthUserResponse | undefined> {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL_AUTH}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const user = await response.json();
      return user as AuthUserResponse;
    } else {
      console.error("No hay usuario autenticado");
    };

  } catch (error) {
    console.error("Error de conexión:", error);
  }
}

// ─── Logout ──────────────────────────────────────────────────

/**
 * Cierra la sesión del usuario actual.
 * Endpoint real: POST /api/v1/auth/logout
 */
export async function logout(): Promise<void> {
  // TODO: llamar al endpoint real si el backend maneja sesiones server-side
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}