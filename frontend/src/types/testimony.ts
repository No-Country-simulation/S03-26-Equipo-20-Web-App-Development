// ============================================================
// Tipos de Testimonios — Testimonial CMS
// ============================================================

export type TestimonyStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Testimony {
  id: string;
  headline: string;
  story: string;
  videoUrl?: string;
  fullName: string;
  email: string;
  status: TestimonyStatus;
  productId?: string;
  productName?: string;
  submittedAt: string; // ISO date string
}

// Payload para crear un nuevo testimonio
export interface SubmitTestimonyPayload {
  headline: string;
  story: string;
  videoUrl?: string;
  fullName: string;
  email: string;
  productId?: string;
}

// Payload para moderar (aprobar/rechazar) un testimonio
export interface ModerateTestimonyPayload {
  status: "APPROVED" | "REJECTED";
  reason?: string;
}
