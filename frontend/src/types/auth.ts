// ============================================================
// Tipos de autenticación — Testimonial CMS
// ============================================================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterOrgPayload {
  /** Nombre de la organización (→ backend: `name`) */
  organizationName: string;
  /** URL del logo de la organización (→ backend: `logo`) */
  logo: string;
  /** Username del administrador (→ backend: `username`) */
  username: string;
  email: string;
  password: string;
  /** Solo frontend: no se envía al backend */
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
