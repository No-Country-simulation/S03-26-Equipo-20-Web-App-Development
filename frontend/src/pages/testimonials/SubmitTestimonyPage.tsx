import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  //FileVideo,
  Mail,
  Quote,
  User,
  CheckCircle2,
  AlertCircle,
  FileImage,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  createTestimonial,
  // submitTestimony,
} from "../../services/testimonyService";
// import type { SubmitTestimonyPayload } from "../../types/testimony";
import { useFormik } from "formik";
import { createTestimonialValidationSchema } from "../../utils/validationSchemas";

// ─── Tipos locales ─────────────────────────────────────────────────────────────

// interface FormState {
//   headline: string;
//   story: string;
//   videoUrl: string;
//   fullName: string;
//   email: string;
// }

// interface FormErrors {
//   headline?: string;
//   story?: string;
//   email?: string;
//   fullName?: string;
// }

// ─── Helpers ───────────────────────────────────────────────────────────────────

// function validateEmail(email: string): boolean {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function validate(form: FormState): FormErrors {
//   const errors: FormErrors = {};
//   if (!form.headline.trim()) errors.headline = "El titular es requerido.";
//   if (!form.story.trim() || form.story.trim().length < 30)
//     errors.story = "Escribí al menos 30 caracteres.";
//   if (!form.fullName.trim())
//     errors.fullName = "El nombre completo es requerido.";
//   if (!form.email.trim()) errors.email = "El email es requerido.";
//   else if (!validateEmail(form.email))
//     errors.email = "Ingresá un email válido.";
//   return errors;
// }

// ─── Componente ────────────────────────────────────────────────────────────────

export default function SubmitTestimonyPage() {
  // const navigate = useNavigate();

  // const [form, setForm] = useState<FormState>({
  //   headline: "",
  //   story: "",
  //   videoUrl: "",
  //   fullName: "",
  //   email: "",
  // });

  // const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      testimonial: {
        title: "",
        content: "",
      },
      visitor: {
        name: "",
        email: "",
      },
      media: {
        url: null,
      },
    },
    validationSchema: createTestimonialValidationSchema,
    onSubmit: async (values) => {
      setStatus("loading");
      setServerError(null);

      try {
        await createTestimonial(values);
        setStatus("success");
      } catch (error) {
        setServerError(
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado.",
        );
        setStatus("error");
      }
    },
  });

  // ── Handlers ─────────────────────────────────────────────────────────────────

  // function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  //   if (errors[name as keyof FormErrors]) {
  //     setErrors((prev) => ({ ...prev, [name]: undefined }));
  //   }
  // }

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   const validationErrors = validate(form);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   setStatus("loading");
  //   setServerError(null);

  //   try {
  //     const payload: SubmitTestimonyPayload = {
  //       headline: form.headline.trim(),
  //       story: form.story.trim(),
  //       fullName: form.fullName.trim(),
  //       email: form.email.trim(),
  //       videoUrl: form.videoUrl.trim() || undefined,
  //     };
  //     await submitTestimony(payload);
  //     setStatus("success");
  //   } catch (err) {
  //     setStatus("error");
  //     setServerError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
  //   }
  // }

  // ── Estado de éxito ───────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <div className="flex bg-[#0e0e10] text-white min-h-screen">
        <Sidebar />
        <main className="md:ml-64 min-h-screen flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
            <div className="mx-auto w-20 h-20 rounded-full bg-[#9333ea]/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#9333ea]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-[#f9f5f8]">
                ¡Testimonio enviado!
              </h2>
              <p className="text-[#adaaad]">
                Gracias por compartir tu experiencia. Tu testimonio está en
                revisión y se publicará una vez que sea aprobado.
              </p>
            </div>
            {/* <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  setForm({
                    headline: "",
                    story: "",
                    videoUrl: "",
                    fullName: "",
                    email: "",
                  });
                  setStatus("idle");
                }}
                className="px-5 py-2.5 bg-[#1f1f22] text-[#f9f5f8] rounded-lg font-semibold hover:bg-[#2a2a2e] transition-colors"
              >
                Enviar otro
              </button>
              <button
                onClick={() => navigate("/moderation")}
                className="px-5 py-2.5 bg-gradient-to-br from-[#aa3bff] to-[#7c3aed] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Ver pendientes
              </button>
            </div> */}
          </div>
        </main>
      </div>
    );
  }

  // ── Estado normal ─────────────────────────────────────────────────────────────

  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      <main className="md:ml-64 min-h-screen transition-all bg-[#0e0e10] pb-20 md:pb-0 flex-1">
        <Header />

        <div className="p-8 lg:p-12">
          {/* Encabezado de página */}
          <section className="mb-10 space-y-2">
            <span
              className="text-[#cc97ff] font-bold uppercase tracking-widest text-xs"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Compartí tu experiencia
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#f9f5f8] tracking-tight"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Enviar testimonio
            </h2>
            <p className="text-[#adaaad] max-w-xl">
              Tu opinión ayuda a miles de investigadores y profesionales a
              encontrar las herramientas correctas. Compartí tu experiencia con
              la comunidad académica global.
            </p>
          </section>

          <div className="grid lg:grid-cols-[1fr_400px] gap-10 max-w-6xl">
            {/* ── Formulario ──────────────────────────────────────────── */}
            <form
              id="submit-testimony-form"
              onSubmit={formik.handleSubmit}
              className="space-y-6"
            >
              {/* Banner de error del servidor */}
              {status === "error" && serverError && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {serverError}
                </div>
              )}

              {/* Titular */}
              <div className="space-y-2">
                <label
                  htmlFor="headline"
                  className="text-xs font-bold uppercase tracking-widest text-[#adaaad]"
                >
                  Titular del testimonio
                </label>
                <div className="relative">
                  <Quote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adaaad]/50" />
                  <input
                    // id="headline"
                    // name="headline"
                    type="text"
                    name="testimonial.title"
                    // value={form.headline}
                    // onChange={handleChange}
                    value={formik.values.testimonial.title}
                    onChange={formik.handleChange}
                    placeholder="Ej: Transformó por completo nuestro laboratorio de investigación"
                    className={`w-full pl-10 pr-4 py-3 bg-[#131315] border rounded-lg text-sm text-[#f9f5f8] placeholder:text-[#adaaad]/40 outline-none transition-all`}
                  />
                </div>
                {/* {errors.headline && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.headline}
                  </p>
                )} */}
                {formik.touched.testimonial?.title &&
                  formik.errors.testimonial?.title && (
                    <div className="bg-red-500 text-white p-2 rounded mb-3">
                      <span>{formik.errors.testimonial?.title}</span>
                    </div>
                  )}
              </div>
              {/*${
                        errors.headline
                          ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-[#262528] focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20"
                      }*/}

              {/* Historia */}
              <div className="space-y-2">
                <label
                  htmlFor="story"
                  className="text-xs font-bold uppercase tracking-widest text-[#adaaad]"
                >
                  Tu historia
                </label>
                <textarea
                  // id="story"
                  // name="story"
                  // value={form.story}
                  // onChange={handleChange}
                  name="testimonial.content"
                  value={formik.values.testimonial.content}
                  onChange={formik.handleChange}
                  rows={6}
                  placeholder="¿Cómo impactó este producto en tu flujo de trabajo? Sé lo más específico posible: incluí números, plazos y resultados concretos."
                  className={`w-full px-4 py-3 bg-[#131315] border rounded-lg text-sm text-[#f9f5f8] placeholder:text-[#adaaad]/40 outline-none resize-none transition-all leading-relaxed`}
                />
                <div className="flex items-center justify-between">
                  {/* {errors.story ? (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.story}
                    </p>
                  ) : (
                    <span />
                  )} */}
                  {formik.touched.testimonial?.content &&
                    formik.errors.testimonial?.content && (
                      <div className="bg-red-500 text-white p-2 rounded mb-3">
                        <span>{formik.errors.testimonial?.content}</span>
                      </div>
                    )}
                  <span
                    className={`text-xs tabular-nums ${
                      formik.values.testimonial.content.length < 30
                        ? "text-[#adaaad]/50"
                        : "text-[#9333ea]"
                    }`}
                  >
                    {formik.values.testimonial.content.length} caracteres
                  </span>
                </div>
              </div>
              {/*${
                      errors.story
                        ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-[#262528] focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20"
                    }*/}

              {/* Video URL */}
              {/* <div className="space-y-2">
                <label
                  htmlFor="videoUrl"
                  className="text-xs font-bold uppercase tracking-widest text-[#adaaad]"
                >
                  Experiencia en video{" "}
                  <span className="normal-case font-normal text-[#adaaad]/50">
                    (opcional)
                  </span>
                </label>
                <div className="relative">
                  <FileVideo className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adaaad]/50" />
                  <input
                    id="videoUrl"
                    name="videoUrl"
                    type="url"
                    value={form.videoUrl}
                    onChange={handleChange}
                    placeholder="Pegá un link de YouTube o Vimeo"
                    className="w-full pl-10 pr-4 py-3 bg-[#131315] border border-[#262528] rounded-lg text-sm text-[#f9f5f8] placeholder:text-[#adaaad]/40 outline-none transition-all focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20"
                  />
                </div>
              </div> */}

              <div className="space-y-2">
                <label
                  htmlFor="imagen"
                  className="text-xs font-bold uppercase tracking-widest text-[#adaaad]"
                >
                  Experiencia en imagen{" "}
                  <span className="normal-case font-normal text-[#adaaad]/50">
                    (opcional)
                  </span>
                </label>
                <div className="relative">
                  <FileImage className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adaaad]/50" />
                  <input
                    // id="videoUrl"
                    // name="videoUrl"
                    type="file"
                    // value={form.videoUrl}
                    // onChange={handleChange}
                    onChange={(event) => {
                      const file = event.currentTarget.files
                        ? event.currentTarget.files[0]
                        : null;
                      formik.setFieldValue("media.url", file);
                    }}
                    placeholder="Pegá una imagen"
                    className="w-full pl-10 pr-4 py-3 bg-[#131315] border border-[#262528] rounded-lg text-sm text-[#f9f5f8] placeholder:text-[#adaaad]/40 outline-none transition-all focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20"
                  />
                </div>
                {formik.touched.media?.url && formik.errors.media?.url && (
                  <div className="bg-red-500 text-white p-2 rounded mb-3">
                    <span>{formik.errors.media?.url}</span>
                  </div>
                )}
              </div>

              {/* Nombre + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-xs font-bold uppercase tracking-widest text-[#adaaad]"
                  >
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adaaad]/50" />
                    <input
                      // id="fullName"
                      // name="fullName"
                      type="text"
                      // value={form.fullName}
                      // onChange={handleChange}
                      name="visitor.name"
                      value={formik.values.visitor.name}
                      onChange={formik.handleChange}
                      placeholder="Dra. Ana García"
                      className={`w-full pl-10 pr-4 py-3 bg-[#131315] border rounded-lg text-sm text-[#f9f5f8] placeholder:text-[#adaaad]/40 outline-none transition-all`}
                    />
                  </div>
                  {/* {errors.fullName && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )} */}
                  {formik.touched.visitor?.name &&
                    formik.errors.visitor?.name && (
                      <div className="bg-red-500 text-white p-2 rounded mb-3">
                        <span>{formik.errors.visitor?.name}</span>
                      </div>
                    )}
                </div>
                {/*${
                          errors.fullName
                            ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-[#262528] focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20"
                        }*/}

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-widest text-[#adaaad]"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adaaad]/50" />
                    <input
                      id="email"
                      name="visitor.email"
                      type="email"
                      // value={form.email}
                      // onChange={handleChange}
                      value={formik.values.visitor.email}
                      onChange={formik.handleChange}
                      placeholder="ana.garcia@universidad.edu.ar"
                      className={`w-full pl-10 pr-4 py-3 bg-[#131315] border rounded-lg text-sm text-[#f9f5f8] placeholder:text-[#adaaad]/40 outline-none transition-all`}
                    />
                  </div>
                  {/* {errors.email && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )} */}
                  {formik.touched.visitor?.email &&
                    formik.errors.visitor?.email && (
                      <div className="bg-red-500 text-white p-2 rounded mb-3">
                        <span>{formik.errors.visitor?.email}</span>
                      </div>
                    )}
                </div>
              </div>
              {/*${
                          errors.email
                            ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-[#262528] focus:border-[#9333ea]/60 focus:ring-2 focus:ring-[#9333ea]/20"
                        }*/}

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-base
                  bg-gradient-to-br from-[#aa3bff] to-[#7c3aed] text-white
                  shadow-[0_4px_24px_rgba(170,59,255,0.4)]
                  hover:shadow-[0_4px_32px_rgba(170,59,255,0.6)]
                  hover:opacity-90
                  active:scale-[0.98]
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {status === "loading" ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Publicar mi testimonio
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-[#adaaad]/50 uppercase tracking-widest">
                Al enviar, aceptás nuestras{" "}
                <a href="#" className="text-[#9333ea] hover:underline">
                  Pautas editoriales
                </a>
              </p>
            </form>

            {/* ── Panel lateral ────────────────────────────────────────── */}
            <aside className="space-y-6">
              {/* Tarjeta de producto destacado */}
              <div className="bg-[#131315] rounded-2xl overflow-hidden border border-[#262528]">
                <div className="h-36 bg-gradient-to-br from-[#1a1025] via-[#0e0e10] to-[#0d0c15] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.15),transparent_60%)]" />
                  <div className="text-center px-6 relative">
                    <p className="text-[#adaaad] text-xs mb-1">
                      Producto destacado
                    </p>
                    <h3 className="text-xl font-extrabold text-[#cc97ff] leading-tight">
                      Advanced Analytics Suite 2.0
                    </h3>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-[#9333ea]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9333ea]">
                      Producto verificado
                    </span>
                  </div>
                  <p className="text-[#adaaad] text-sm leading-relaxed">
                    Tu opinión ayuda a miles de investigadores a encontrar las
                    herramientas adecuadas. Compartí tu experiencia con la
                    comunidad académica global.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex -space-x-2">
                      {["#9333ea", "#cc97ff", "#7c3aed"].map((color, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-[#131315] flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ backgroundColor: color }}
                        >
                          {["J", "M", "A"][i]}
                        </div>
                      ))}
                    </div>
                    <span className="text-[#adaaad] text-xs">
                      Se sumaron más de 1.200 curadores
                    </span>
                  </div>
                </div>
              </div>

              {/* Consejos */}
              <div className="bg-[#131315] rounded-2xl p-5 border border-[#262528] space-y-4">
                <h4 className="text-sm font-bold text-[#f9f5f8] uppercase tracking-widest">
                  Consejos para escribir
                </h4>
                {[
                  {
                    tip: "Sé específico",
                    detail: "Incluí números, porcentajes y plazos concretos.",
                  },
                  {
                    tip: "Contá una historia",
                    detail:
                      "Describí el antes y el después en tu flujo de trabajo.",
                  },
                  {
                    tip: "Sé auténtico",
                    detail:
                      "Las experiencias reales impactan más que los elogios genéricos.",
                  },
                ].map(({ tip, detail }) => (
                  <div key={tip} className="flex gap-3">
                    <div className="w-1 rounded-full bg-[#9333ea]/60 shrink-0" />
                    <div>
                      <p className="text-[#f9f5f8] text-xs font-semibold">
                        {tip}
                      </p>
                      <p className="text-[#adaaad] text-xs">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
