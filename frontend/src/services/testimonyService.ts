// ============================================================
// Testimony Service — Testimonial CMS
//
// TODO (backend): Reemplazar los mocks por llamadas reales a:
//   Base URL: http://localhost:8080/api/v1/testimonials
//
// Endpoints esperados:
//   POST   /api/v1/testimonials           → submitTestimony
//   GET    /api/v1/testimonials/pending   → getPendingTestimonials
//   PATCH  /api/v1/testimonials/:id       → moderateTestimony
//   GET    /api/v1/testimonials/approved  → getApprovedTestimonials
//   POST   /api/v1/testimonials/publish   → publishWallChanges
// ============================================================

import type {
  ModerateTestimonyPayload,
  //ShowTestimonial,
  SubmitTestimonial,
  SubmitTestimonyPayload,
  TestimonialPage,
  Testimony,
} from "../types/testimony";

const BASE_URL = "http://localhost:8080/api/v1/testimonials";

// ─── Mock data — Pending ─────────────────────────────────────

const MOCK_PENDING: Testimony[] = [
  {
    id: "t-001",
    headline: "Transformó por completo el flujo de trabajo de nuestro laboratorio",
    story:
      "Después de integrar Advanced Analytics Suite 2.0 en nuestro laboratorio, el tiempo de procesamiento de datos se redujo un 60%. El panel intuitivo facilitó que incluso los miembros no técnicos del equipo pudieran extraer información valiosa. Un cambio absoluto para nuestro departamento.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    fullName: "Dra. Ana García",
    email: "ana.garcia@universidad.edu.ar",
    status: "PENDING",
    productId: "prod-001",
    productName: "Advanced Analytics Suite 2.0",
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "t-002",
    headline: "La mejor inversión que hizo nuestra startup este año",
    story:
      "Al principio éramos escépticos, pero los resultados hablaron solos. Nuestra tasa de conversión aumentó un 35% en el primer mes. El equipo de soporte también es increíblemente ágil para responder.",
    fullName: "Carlos Méndez",
    email: "carlos@techstartup.io",
    status: "PENDING",
    productId: "prod-002",
    productName: "Growth Engine Pro",
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "t-003",
    headline: "Optimizó todo nuestro pipeline de contenido",
    story:
      "Lo que antes le llevaba 3 días a nuestro equipo ahora toma 4 horas. Solo las funciones de automatización valen 10 veces el precio. Se lo recomendamos a todas las agencias que conocemos.",
    fullName: "Valentina Herrera",
    email: "valentina@creativemedia.com.ar",
    status: "PENDING",
    productId: "prod-001",
    productName: "Advanced Analytics Suite 2.0",
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "t-004",
    headline: "Resultados sobresalientes en el análisis de datos de ensayos clínicos",
    story:
      "Procesamos conjuntos de datos multivariables complejos con una precisión sin precedentes. Los modelos estadísticos integrados en la plataforma superaron nuestras expectativas para aplicaciones de investigación clínica.",
    fullName: "Prof. Miguel Chen",
    email: "m.chen@hospital-investigacion.org",
    status: "PENDING",
    productId: "prod-003",
    productName: "BioData Analyzer",
    submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

// ─── Mock data — Approved ─────────────────────────────────────

const MOCK_APPROVED: Testimony[] = [
  {
    id: "a-001",
    headline: "Transformó por completo el flujo de trabajo de nuestro laboratorio",
    story:
      "Después de integrar Advanced Analytics Suite 2.0 en nuestro laboratorio, el tiempo de procesamiento de datos se redujo un 60%. El panel intuitivo facilitó que incluso los miembros no técnicos del equipo pudieran extraer información valiosa.",
    fullName: "Dra. Elena Rodríguez",
    email: "elena@oxford.edu",
    role: "Senior Fellow at Oxford",
    status: "APPROVED",
    productId: "prod-001",
    productName: "Advanced Analytics Suite 2.0",
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    rating: 5,
  },
  {
    id: "a-002",
    headline: "La mejor inversión de nuestra biblioteca este año",
    story:
      "Era escéptico sobre la curación automatizada, pero el filtro 'Wall of Love' es notablemente preciso. Identifica los mejores testimonios de nuestros usuarios de forma instantánea.",
    fullName: "Jameson Brooks",
    email: "j.brooks@library.org",
    role: "Lead Librarian",
    status: "APPROVED",
    productId: "prod-002",
    productName: "Growth Engine Pro",
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    rating: 4,
  },
  {
    id: "a-003",
    headline: "Simple, elegante, y orientado a datos",
    story:
      "Es exactamente lo que nuestra facultad necesitaba para gestionar testimonios públicos sin un desarrollador dedicado. La interfaz es intuitiva y el panel de moderación es muy completo.",
    fullName: "Marcus Kane",
    email: "mkane@phd.edu",
    role: "PhD Candidate",
    status: "APPROVED",
    productId: "prod-001",
    productName: "Advanced Analytics Suite 2.0",
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    rating: 5,
  },
  {
    id: "a-004",
    headline: "Resultados excepcionales en tiempo récord",
    story:
      "El onboarding fue muy rápido. En menos de una semana ya teníamos el sistema integrado con nuestro flujo de publicaciones. El equipo de soporte respondió todas nuestras dudas.",
    fullName: "Laura Sánchez",
    email: "l.sanchez@mediainstitute.com",
    role: "Head of Content",
    status: "APPROVED",
    productId: "prod-003",
    productName: "BioData Analyzer",
    submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    rating: 5,
  },
  {
    id: "a-005",
    headline: "Superó todas nuestras expectativas de integración",
    story:
      "Pudimos conectar la API en menos de dos horas gracias a la documentación clara. El sistema de moderación automática nos ahorra horas de trabajo manual cada semana.",
    fullName: "Tomás Aguirre",
    email: "tomas@devteam.io",
    role: "CTO",
    status: "APPROVED",
    productId: "prod-002",
    productName: "Growth Engine Pro",
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    rating: 4,
  },
];

// ─── Helper ──────────────────────────────────────────────────

// async function handleResponse<T>(res: Response): Promise<T> {
//   if (!res.ok) {
//     const body = await res.json().catch(() => ({}));
//     throw new Error((body as { message?: string }).message ?? `Error ${res.status}`);
//   }
//   return res.json() as Promise<T>;
// }

// ─── Submit Testimony ────────────────────────────────────────

/**
 * Envía un nuevo testimonio al servidor.
 * Endpoint real: POST /api/v1/testimonials
 *
 * TODO: Descomentar el bloque fetch y eliminar el mock cuando el backend esté listo.
 */
export async function submitTestimony(
  payload: SubmitTestimonyPayload
): Promise<{ success: boolean; id: string }> {
  // ── Mock ──────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 900));
  console.log("[MOCK] submitTestimony:", payload);
  return { success: true, id: `t-mock-${Date.now()}` };

  // ── Real (uncomment when backend is ready) ───────────────
  // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/testimonials/register`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   credentials: "include",
  //   body: JSON.stringify(payload),
  // });
  // return handleResponse<{ success: boolean; id: string }>(res);
}

export async function createTestimonial(
  value: SubmitTestimonial): Promise<void> {
  const formData = new FormData();
  formData.append("testimonial.title", value.testimonial.title);
  formData.append("testimonial.content", value.testimonial.content);
  if (value.media.url) {
    formData.append("media.url", value.media.url);
  }
  formData.append("visitor.name", value.visitor.name);
  formData.append("visitor.mail", value.visitor.email);

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/testimonials/register`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Respuesta del servidor:", errorData);
    alert(
      "Error en el servidor: " +
      (errorData.message || "No se pudo registrar el testimonio"),
    );
  }
}

// Lista todos los testimonios del usuario quien inició sesión
export async function listAllTestimonials(page: number = 0,
  size: number = 10,
  sort: string = "createdAt,desc"): Promise<TestimonialPage> {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/testimonials/all?page=${page}&size=${size}&sort=${sort}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const testimonials = await response.json();
      return testimonials;
    } else {
      console.error("Error al obtener los productos");
      return [];
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return [];
  }
}

export async function listAllVisitors() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/visitors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const visitors = await response.json();
      return visitors;
    } else {
      console.error("Error al obtener los visitantes");
      return [];
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return [];
  }
}

// ─── Pending Testimonials ────────────────────────────────────

/**
 * Obtiene la lista de testimonios con estado PENDING.
 * Endpoint real: GET /api/v1/testimonials/pending
 */
export async function getPendingTestimonials(): Promise<Testimony[]> {
  // ── Mock ──────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 600));
  return [...MOCK_PENDING];

  // ── Real (uncomment when backend is ready) ───────────────
  // const res = await fetch(`${BASE_URL}/pending`, {
  //   credentials: "include",
  // });
  // return handleResponse<Testimony[]>(res);
}

// ─── Moderate Testimony ──────────────────────────────────────

/**
 * Aprueba o rechaza un testimonio.
 * Endpoint real: PATCH /api/v1/testimonials/:id
 */
export async function moderateTestimony(
  id: string,
  payload: ModerateTestimonyPayload
): Promise<Testimony> {
  // ── Mock ──────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 500));
  const found = MOCK_PENDING.find((t) => t.id === id);
  if (!found) throw new Error("Testimony not found");
  const updated: Testimony = { ...found, status: payload.status };
  console.log("[MOCK] moderateTestimony:", id, payload.status);
  return updated;

  // ── Real (uncomment when backend is ready) ───────────────
  // const res = await fetch(`${BASE_URL}/${id}`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   credentials: "include",
  //   body: JSON.stringify(payload),
  // });
  // return handleResponse<Testimony>(res);
}

// ─── Approved Testimonials ────────────────────────────────────

/**
 * Obtiene la lista de testimonios con estado APPROVED (para el Wall of Love).
 * Endpoint real: GET /api/v1/testimonials/approved
 *
 * TODO: Descomentar el bloque fetch y eliminar el mock cuando el backend esté listo.
 * TODO (backend): El campo `rating` (1–5) debe ser incluido en la respuesta del servidor.
 */
export async function getApprovedTestimonials(): Promise<Testimony[]> {
  // ── Mock ──────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 700));
  return [...MOCK_APPROVED];

  // ── Real (uncomment when backend is ready) ───────────────
  // const res = await fetch(`${BASE_URL}/approved`, {
  //   credentials: "include",
  // });
  // return handleResponse<Testimony[]>(res);
}

// ─── Publish Wall Changes ─────────────────────────────────────

/**
 * Publica los cambios de configuración del Wall of Love.
 * Endpoint real: POST /api/v1/testimonials/publish
 *
 * TODO: Descomentar el bloque fetch y eliminar el mock cuando el backend esté listo.
 */
export async function publishWallChanges(): Promise<{ success: boolean }> {
  // ── Mock ──────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 800));
  console.log("[MOCK] publishWallChanges");
  return { success: true };

  // ── Real (uncomment when backend is ready) ───────────────
  // const res = await fetch(`${BASE_URL}/publish`, {
  //   method: "POST",
  //   credentials: "include",
  // });
  // return handleResponse<{ success: boolean }>(res);
}

// Re-export BASE_URL for reference (unused in mock mode)
export { BASE_URL };
