// ============================================================
// Tipos de autenticación — Testimonial CMS
// ============================================================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  /** Roles posibles: "ADMIN" | "EDITOR" | "VISITOR" */
  role: "ADMIN" | "EDITOR" | "VISITOR";
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthError {
  message: string;
  field?: string; // campo específico que falló (ej: "email", "password")
}
