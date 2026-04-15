import { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  Link2,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Star,
  Sun,
  Moon,
  LayoutGrid,
  Eye,
  Sparkles,
  Info,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  getApprovedTestimonials,
  publishWallChanges,
} from "../../services/testimonyService";
import type { Testimony } from "../../types/testimony";

// ─── Helpers ────────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-violet-600",
  "bg-indigo-600",
  "bg-fuchsia-600",
  "bg-purple-700",
  "bg-blue-600",
];

function avatarColor(id: string): string {
  const idx = id.charCodeAt(id.length - 1) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

// ─── StarRating ─────────────────────────────────────────────────────────────────

function StarRating({ rating, show }: { rating?: number; show: boolean }) {
  if (!show || !rating) return null;
  return (
    <div className="flex items-center gap-0.5 mt-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? "text-amber-400 fill-amber-400" : "text-[#3a3640]"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Testimony Preview Card ──────────────────────────────────────────────────────

interface PreviewCardProps {
  testimony: Testimony;
  darkMode: boolean;
  showRating: boolean;
  dense: boolean;
}

function PreviewCard({ testimony, darkMode, showRating, dense }: PreviewCardProps) {
  const dark = darkMode;
  return (
    <article
      className={`rounded-xl border transition-all duration-300 ${
        dense ? "p-3" : "p-4"
      } ${
        dark
          ? "bg-[#131315] border-[#262528] hover:border-[#9333ea]/40"
          : "bg-white border-gray-200 hover:border-violet-300 shadow-sm"
      }`}
    >
      {/* Avatar + nombre */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`${avatarColor(testimony.id)} flex-shrink-0 ${
            dense ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"
          } rounded-full flex items-center justify-center font-bold text-white`}
        >
          {getInitials(testimony.fullName)}
        </div>
        <div className="min-w-0">
          <p
            className={`font-semibold text-sm leading-tight truncate ${
              dark ? "text-[#f9f5f8]" : "text-gray-900"
            }`}
          >
            {testimony.fullName}
          </p>
          {testimony.role && (
            <p
              className={`text-xs truncate ${
                dark ? "text-[#adaaad]" : "text-gray-500"
              }`}
            >
              {testimony.role.toUpperCase()}
            </p>
          )}
        </div>
      </div>

      {/* Quote */}
      <p
        className={`text-sm italic leading-relaxed ${
          dark ? "text-[#c8c5c8]" : "text-gray-700"
        } ${dense ? "line-clamp-3" : "line-clamp-4"}`}
      >
        "{testimony.story}"
      </p>

      {/* Rating */}
      <StarRating rating={testimony.rating} show={showRating} />
    </article>
  );
}

// ─── Toggle Switch ───────────────────────────────────────────────────────────────

function Toggle({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9333ea]/40 ${
        checked ? "bg-[#9333ea]" : "bg-[#3a3640]"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? "translate-x-4.5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Página principal ────────────────────────────────────────────────────────────

export default function WallOfLovePage() {
  const [testimonials, setTestimonials] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Preview settings
  const [darkMode, setDarkMode] = useState(true);
  const [denseLayout, setDenseLayout] = useState(false);
  const [showRating, setShowRating] = useState(true);

  // Publish state
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  // Copy states
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [embedTab, setEmbedTab] = useState<"react" | "html">("react");

  // ── Carga ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelado = false;
    setLoading(true);

    getApprovedTestimonials()
      .then((data) => { if (!cancelado) setTestimonials(data); })
      .catch((err) => {
        if (!cancelado)
          setFetchError(err instanceof Error ? err.message : "Error al cargar testimonios.");
      })
      .finally(() => { if (!cancelado) setLoading(false); });

    return () => { cancelado = true; };
  }, []);

  // ── Handlers ──────────────────────────────────────────────
  async function handlePublish() {
    setPublishing(true);
    try {
      await publishWallChanges();
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
    } finally {
      setPublishing(false);
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText("https://wall.testimonialcms.app/v/s03-26").catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  function handleCopyEmbed() {
    navigator.clipboard.writeText(embedCode).catch(() => {});
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  }

  // ── Embed code ────────────────────────────────────────────
  const embedCode =
    embedTab === "react"
      ? `import WallOfLove from "@testimonialcms/react";\n\n<WallOfLove\n  id="s03-26"\n  theme="${darkMode ? "dark" : "light"}"\n  dense={${denseLayout}}\n  showRating={${showRating}}\n/>`
      : `<script src="https://cdn.testimonialcms.app/v/embed.js"></script>\n<div\n  id="wall-of-love"\n  data-id="s03-26"\n  data-theme="${darkMode ? "dark" : "light"}"\n  data-dense="${denseLayout}"\n  data-rating="${showRating}"\n></div>\n<script>WallCMS.init("#wall-of-love");</script>`;

  // ── Stats ─────────────────────────────────────────────────
  const stats = [
    {
      label: "Aprobados",
      value: testimonials.length.toString(),
      sub: "Testimonios en el wall",
      color: "from-violet-600 to-purple-700",
    },
    {
      label: "Alcance",
      value: "24.5k",
      sub: "Vistas embed este mes",
      color: "from-indigo-600 to-blue-700",
    },
    {
      label: "Sentimiento",
      value: "98%",
      sub: "Feedback positivo",
      color: "from-emerald-600 to-teal-700",
    },
  ];

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="flex bg-[#0e0e10] text-white min-h-screen">
      <Sidebar />

      <main className="md:ml-64 min-h-screen bg-[#0e0e10] pb-20 md:pb-0 flex-1">
        <Header />

        <div className="p-6 lg:p-10 space-y-8">

          {/* ── Encabezado de página ── */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="space-y-2">
              <span className="text-[#cc97ff] font-bold uppercase tracking-widest text-xs">
                Galería curada
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[#f9f5f8] tracking-tight flex items-center gap-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Heart className="w-9 h-9 text-[#9333ea] fill-[#9333ea]/30" />
                Wall of Love
              </h2>
              <p className="text-[#adaaad] max-w-xl">
                Diseñá tu galería de testimonios de alta conversión. Aprobá los
                mejores y generá el código embed para integrarlo en segundos.
              </p>
            </div>

            <button
              id="btn-publicar-cambios"
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-[#aa3bff] to-[#7c3aed] text-white text-sm font-bold shadow-[0_4px_20px_rgba(170,59,255,0.4)] hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap self-start md:self-auto"
            >
              {publishing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : published ? (
                <Check className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {published ? "¡Publicado!" : "Publicar cambios"}
            </button>
          </section>

          {/* ── Contenido principal ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

            {/* ── Panel izquierdo: Live Preview ── */}
            <section className="bg-[#131315] rounded-2xl border border-[#262528] overflow-hidden">
              {/* Barra del preview */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#262528] bg-[#0e0e10]/50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[#adaaad] text-xs font-semibold uppercase tracking-widest">
                    Vista previa en vivo
                  </span>
                </div>

                {/* Toggle Light/Dark */}
                <div className="flex items-center rounded-lg overflow-hidden border border-[#262528] text-xs font-semibold">
                  <button
                    id="preview-light"
                    onClick={() => setDarkMode(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                      !darkMode
                        ? "bg-[#f9f5f8] text-[#0e0e10]"
                        : "bg-transparent text-[#adaaad] hover:text-[#f9f5f8]"
                    }`}
                  >
                    <Sun className="w-3 h-3" /> Claro
                  </button>
                  <button
                    id="preview-dark"
                    onClick={() => setDarkMode(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                      darkMode
                        ? "bg-[#9333ea] text-white"
                        : "bg-transparent text-[#adaaad] hover:text-[#f9f5f8]"
                    }`}
                  >
                    <Moon className="w-3 h-3" /> Oscuro
                  </button>
                </div>
              </div>

              {/* Grid de testimonios */}
              <div
                className={`p-5 min-h-[380px] transition-colors duration-300 ${
                  darkMode ? "bg-[#131315]" : "bg-gray-100"
                }`}
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <Loader2 className="w-7 h-7 text-[#9333ea] animate-spin" />
                    <p className="text-[#adaaad] text-sm">Cargando testimonios…</p>
                  </div>
                ) : fetchError ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <AlertCircle className="w-7 h-7 text-red-400" />
                    <p className="text-red-400 text-sm">{fetchError}</p>
                  </div>
                ) : (
                  <div
                    className={`grid gap-3 ${
                      denseLayout
                        ? "grid-cols-1 sm:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-2"
                    }`}
                  >
                    {testimonials.map((t) => (
                      <PreviewCard
                        key={t.id}
                        testimony={t}
                        darkMode={darkMode}
                        showRating={showRating}
                        dense={denseLayout}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* ── Panel derecho: Share & Integrate ── */}
            <aside className="space-y-4">

              {/* Share & Integrate */}
              <div className="bg-[#131315] rounded-2xl border border-[#262528] p-5 space-y-5">
                <h3 className="flex items-center gap-2 text-[#f9f5f8] font-bold text-base">
                  <Share2 className="w-4 h-4 text-[#9333ea]" />
                  Compartir e Integrar
                </h3>

                {/* Public wall link */}
                <div className="space-y-1.5">
                  <p className="text-[#adaaad] text-xs font-semibold uppercase tracking-wider">
                    Link público del wall
                  </p>
                  <div className="flex items-center gap-2 bg-[#0e0e10] border border-[#262528] rounded-lg px-3 py-2.5">
                    <Link2 className="w-3.5 h-3.5 text-[#9333ea] flex-shrink-0" />
                    <span className="text-[#adaaad] text-xs truncate flex-1">
                      wall.testimonialcms.app/v/s03-26
                    </span>
                    <button
                      id="btn-copiar-link"
                      onClick={handleCopyLink}
                      title="Copiar link"
                      className="flex-shrink-0 text-[#9333ea] hover:text-[#cc97ff] transition-colors"
                    >
                      {copiedLink ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Embed code */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[#adaaad] text-xs font-semibold uppercase tracking-wider">
                      Código embed
                    </p>
                    <div className="flex rounded-md overflow-hidden border border-[#262528] text-[10px] font-bold">
                      <button
                        id="embed-tab-react"
                        onClick={() => setEmbedTab("react")}
                        className={`px-2.5 py-1 transition-colors ${
                          embedTab === "react"
                            ? "bg-[#9333ea] text-white"
                            : "text-[#adaaad] hover:text-white"
                        }`}
                      >
                        REACT
                      </button>
                      <button
                        id="embed-tab-html"
                        onClick={() => setEmbedTab("html")}
                        className={`px-2.5 py-1 transition-colors ${
                          embedTab === "html"
                            ? "bg-[#9333ea] text-white"
                            : "text-[#adaaad] hover:text-white"
                        }`}
                      >
                        HTML
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <pre className="bg-[#0e0e10] border border-[#262528] rounded-lg p-3 text-[10px] text-[#adaaad] overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed max-h-28 overflow-y-auto">
                      {embedCode}
                    </pre>
                    <button
                      id="btn-copiar-embed-icon"
                      onClick={handleCopyEmbed}
                      className="absolute top-2 right-2 p-1 rounded bg-[#1e1c23] border border-[#262528] text-[#adaaad] hover:text-white transition-colors"
                    >
                      {copiedEmbed ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Configuración de embed */}
                <div className="space-y-2.5">
                  <p className="text-[#adaaad] text-xs font-semibold uppercase tracking-wider">
                    Configuración del embed
                  </p>

                  {[
                    {
                      id: "toggle-dark-mode",
                      icon: Moon,
                      label: "Forzar modo oscuro",
                      checked: darkMode,
                      onChange: () => setDarkMode((v) => !v),
                    },
                    {
                      id: "toggle-dense",
                      icon: LayoutGrid,
                      label: "Diseño compacto",
                      checked: denseLayout,
                      onChange: () => setDenseLayout((v) => !v),
                    },
                    {
                      id: "toggle-rating",
                      icon: Eye,
                      label: "Mostrar estrellas",
                      checked: showRating,
                      onChange: () => setShowRating((v) => !v),
                    },
                  ].map(({ id, icon: Icon, label, checked, onChange }) => (
                    <div key={id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-[#adaaad]" />
                        <span className="text-[#f9f5f8] text-sm">{label}</span>
                      </div>
                      <Toggle id={id} checked={checked} onChange={onChange} />
                    </div>
                  ))}
                </div>

                {/* Botón copiar embed */}
                <button
                  id="btn-copiar-embed"
                  onClick={handleCopyEmbed}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-br from-[#aa3bff] to-[#7c3aed] text-white text-sm font-bold hover:opacity-90 active:scale-[.98] transition-all shadow-[0_4px_18px_rgba(170,59,255,0.35)]"
                >
                  {copiedEmbed ? (
                    <>
                      <Check className="w-4 h-4" /> ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copiar código embed
                    </>
                  )}
                </button>
              </div>

              {/* Banner tema custom */}
              <div className="bg-[#131315] rounded-2xl border border-[#9333ea]/20 p-4 flex gap-3">
                <Info className="w-4 h-4 text-[#9333ea] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#f9f5f8] text-sm font-semibold mb-0.5">
                    ¿Necesitás un tema personalizado?
                  </p>
                  <p className="text-[#adaaad] text-xs leading-relaxed">
                    Nuestro plan enterprise permite white-labeling completo con
                    CSS personalizado para el Wall of Love.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* ── Stats cards ── */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ label, value, sub, color }) => (
              <div
                key={label}
                className="bg-[#131315] rounded-xl border border-[#262528] p-5 flex items-center gap-4 overflow-hidden relative"
              >
                {/* Glow background */}
                <div
                  className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${color} opacity-10 blur-2xl`}
                />
                <div className="relative">
                  <p className="text-xs text-[#adaaad] uppercase tracking-widest font-semibold mb-1">
                    {label}
                  </p>
                  <p
                    className="text-4xl font-extrabold text-[#f9f5f8]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs text-[#adaaad] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
