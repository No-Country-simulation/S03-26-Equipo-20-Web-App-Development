// ============================================================
// Testimony Service — Testimonial CMS
//
// TODO (backend): Reemplazar los mocks por llamadas reales a:
//   Base URL: http://localhost:8080/api/v1/testimonials
//
// Endpoints esperados:
//   POST   /api/v1/testimonials          → submitTestimony
//   GET    /api/v1/testimonials/pending  → getPendingTestimonials
//   PATCH  /api/v1/testimonials/:id      → moderateTestimony
// ============================================================

import type {
  ModerateTestimonyPayload,
  SubmitTestimonyPayload,
  Testimony,
} from "../types/testimony";

const BASE_URL = "http://localhost:8080/api/v1/testimonials";

// ─── Mock data ───────────────────────────────────────────────

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
  // const res = await fetch(BASE_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   credentials: "include",
  //   body: JSON.stringify(payload),
  // });
  // return handleResponse<{ success: boolean; id: string }>(res);
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

// Re-export BASE_URL for reference (unused in mock mode)
export { BASE_URL };
