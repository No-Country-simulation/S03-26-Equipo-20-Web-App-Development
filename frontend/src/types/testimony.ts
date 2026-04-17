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
  // TODO (backend): Agregar campo `rating` (1–5) al modelo de Testimonial
  // y exponerlo en GET /api/v1/testimonials/approved
  rating?: number; // 1–5 estrellas
  role?: string;   // Cargo o titulo del autor (ej: "Senior Fellow at Oxford")
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

export interface ShowTestimonial {
  title: string;
  content: string;
  status: string;
  createdAt: Date;
};

// Payload sobre Visitante
export interface Visitor {
  name: string;
  email: string;
};

// Payload sobre Media de multimedia
export interface Media {
  url: null | string;
};

// Payload sobre guardar el tesimonio
export interface SubmitTestimonial {
  testimonial: Testimonial;
  visitor: Visitor;
  media: {
    type: "image" | "youtube" | null;
    imageFile?: File | null;
    youtubeUrl?: string;
  };
  shareCode: string;
};

// Payload para listar un testimonio
export interface ListTestimonial {
  id: string;
  testimonial: Testimonial;
  visitor: Visitor;
  media: Media;
};

// Payload para listar testimonios
export interface ListTestimonials {
  id?: string;
  testimonial: ShowTestimonial;
  visitor: Visitor;
  media: Media;
};

// Payload para moderar (aprobar/rechazar) un testimonio
export interface ModerateTestimonyPayload {
  status: "APPROVED" | "REJECTED";
  reason?: string;
}

// Props para las tarjetas de testimonios
export interface TestimonyCardProps {
  testimonials: ListTestimonials;
  isExpanded: boolean;
  onToggle: () => void;
  // onApprove: () => void;
  // onReject: () => void;
  // moderating: boolean;
}

export interface TestimonialPage {
  content: ListTestimonials[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
}