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

// Payload sobre Testimonio
export interface Testimonial {
  title: string;
  content: string;
};

// Payload sobre Visitante
export interface Visitor {
  name: string;
  email: string;
};

// Payload sobre Media de multimedia
export interface Media {
  url: null;
};

// Payload sobre guardar el tesimonio
export interface SubmitTestimonial {
  testimonial: Testimonial;
  visitor: Visitor;
  media: Media;
};

// Payload para listar testimonios
export interface ShowTestimonial {
  id: string;
  testimonial: Testimonial;
  visitor: Visitor;
  media: Media;
};

// Payload para listar testimonios
export interface ListTestimonials {
  id: string;
  testimonial: Testimonial;
  visitor: Visitor;
  media: Media;
};

// Props para el componente de tarjeta de testimonios
export interface ListTestimonialsCardProps {
  testimonial: ListTestimonials;
};

// Payload para moderar (aprobar/rechazar) un testimonio
export interface ModerateTestimonyPayload {
  status: "APPROVED" | "REJECTED";
  reason?: string;
}
