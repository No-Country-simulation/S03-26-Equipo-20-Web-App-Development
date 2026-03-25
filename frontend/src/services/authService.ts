// ============================================================
// Auth Service — Testimonial CMS
//
// TODO (backend): Reemplazar las funciones mockeadas por
// llamadas reales a la API Spring Boot.
// Base URL: http://localhost:8080/api/auth
// ============================================================

import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth";

const BASE_URL = "http://localhost:8080/api/auth";

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
 * Endpoint real: POST /api/auth/login
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  // TODO: descomentar y eliminar el bloque mock cuando el backend esté listo
  /*
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(res);
  */

  // ── MOCK ──
  await simulateDelay(1000);
  if (payload.email === "error@test.com") {
    throw new Error("Credenciales inválidas. Verificá tu email y contraseña.");
  }
  return mockAuthResponse(payload.email);
}

// ─── Register ────────────────────────────────────────────────

/**
 * Registra un nuevo usuario.
 * Endpoint real: POST /api/auth/register
 */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  // TODO: descomentar y eliminar el bloque mock cuando el backend esté listo
  /*
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    }),
  });
  return handleResponse<AuthResponse>(res);
  */

  // ── MOCK ──
  await simulateDelay(1200);
  if (payload.email === "exists@test.com") {
    throw new Error("Ya existe una cuenta con ese email.");
  }
  return mockAuthResponse(payload.email, payload.name);
}

// ─── Logout ──────────────────────────────────────────────────

/**
 * Cierra la sesión del usuario actual.
 * Endpoint real: POST /api/auth/logout
 */
export async function logout(): Promise<void> {
  // TODO: llamar al endpoint real si el backend maneja sesiones server-side
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

// ─── Mock helpers (eliminar cuando el backend esté listo) ────

function simulateDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mockAuthResponse(email: string, name?: string): AuthResponse {
  return {
    token: "mock-jwt-token-" + Math.random().toString(36).slice(2),
    user: {
      id: 1,
      name: name ?? email.split("@")[0],
      email,
      role: "EDITOR",
    },
  };
}

// Suprime el warning de BASE_URL no usada en modo mock
void BASE_URL;
void handleResponse;
