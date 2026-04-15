import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  BarChart3,
  Shield,
  Zap,
  Share2,
  MessageCircle,
  Globe,
  Link,
  Menu,
  X,
} from "lucide-react";
import "./LandingPage.css";
import dashboardMockup from "../assets/dashboard-mockup.png";

// ─── DATA ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Características", href: "#features" },
  { label: "Cómo funciona", href: "#how-it-works" },
  { label: "Precios", href: "#pricing" },
];

const HOW_IT_WORKS = [
  {
    icon: "📋",
    title: "Capturá",
    desc: "Recolectá testimonios de texto o video de alta calidad a través de tu link de colección personalizado con tu marca.",
  },
  {
    icon: "✏️",
    title: "Moderá",
    desc: "Revisá los testimonios en tu dashboard privado, editálos y organizálos con análisis de feedback impulsado por IA.",
  },
  {
    icon: "🔗",
    title: "Integrá",
    desc: "Compartí colecciones o links individuales e integrálos en tu sitio para mostrar el éxito de tus clientes en cualquier parte.",
  },
];

const FEATURES = [
  {
    icon: <Zap size={18} />,
    title: "Sin Integraciones Complejas",
    desc: "Todo en una sola plataforma. Herramientas que se integran perfectamente con tu flujo de trabajo y maximizan tu ROI.",
  },
  {
    icon: <Shield size={18} />,
    title: "Moderación Avanzada",
    desc: "Control total sobre la voz de tu marca. Aprobá, editá y organizá testimonios para construir tu narrativa con precisión.",
  },
  {
    icon: <BarChart3 size={18} />,
    title: "Analytics Profundos",
    desc: "Seguí vistas, clicks e impacto de cada testimonio. Medí tu ROI y optimizá tu estrategia de social proof con datos reales.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sara Jiménez",
    role: "CEO, StartupLatam",
    avatar: "SJ",
    color: "#7c3aed",
    stars: 5,
    text: "TestimonialCMS transformó cómo presentamos el éxito de nuestros clientes. Nuestras conversiones subieron un 40% en el primer mes de uso.",
  },
  {
    name: "Marco Delgado",
    role: "Director de Marketing, Agencia Nova",
    avatar: "MD",
    color: "#0891b2",
    stars: 5,
    text: "La facilidad para moderar y embeber testimonios es increíble. Antes pasábamos horas haciendo esto manualmente — ahora son minutos.",
  },
  {
    name: "Laura Herrera",
    role: "Fundadora, EduTech Pro",
    avatar: "LH",
    color: "#059669",
    stars: 5,
    text: "Gracias a la Wall of Love podemos mostrar el impacto real de nuestro producto. Es exactamente lo que necesitábamos para escalar.",
  },
];

const PRICING = [
  {
    name: "Growth",
    price: "$49",
    period: "/mes",
    desc: "Ideal para emprendedores y equipos pequeños",
    features: [
      "50 Testimonios al mes",
      "Wall of Love básica",
      "Embed en 1 sitio",
      "Email Support",
    ],
    cta: "Empezar Gratis",
    featured: false,
  },
  {
    name: "Profesional",
    price: "$199",
    period: "/mes",
    desc: "Para organizaciones en crecimiento",
    features: [
      "Testimonios ilimitados",
      "Wall of Love personalizada",
      "Moderación con IA",
      "Embed en sitios ilimitados",
      "Analytics avanzados",
    ],
    cta: "Comenzar",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Para instituciones y empresas grandes",
    features: [
      "Multi-organización",
      "SSO & auditoría de seguridad",
      "SLA dedicado",
      "Soporte dedicado",
      "Gerente de cuenta",
    ],
    cta: "Contactar Ventas",
    featured: false,
  },
];

// ─── COMPONENT ─────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing-root">
      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <nav className="landing-nav">
        <div className="landing-nav__inner">
          <div className="landing-nav__logo">
            <span className="landing-nav__logo-dot" />
            TestimonialCMS
          </div>

          <div className="landing-nav__links">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="landing-nav__link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="landing-nav__actions">
            <button
              id="nav-login-btn"
              onClick={() => navigate("/login")}
              className="landing-btn-ghost"
            >
              Iniciar sesión
            </button>
            <button
              id="nav-register-btn"
              onClick={() => navigate("/register")}
              className="landing-btn-primary"
            >
              Empezar gratis
            </button>
          </div>

          <button
            className="landing-nav__hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="hero-section" id="hero">
        <div className="hero-inner">
          {/* Left: Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Zap size={12} />
              PLATAFORMA DE TESTIMONIOS
            </div>

            <h1 className="hero-headline">
              Capturá el éxito de
              <br />
              tus <span className="hero-headline--accent">clientes.</span>
            </h1>

            <p className="hero-subtitle">
              La plataforma definitiva para que tu negocio recolecte, module y
              muestre testimonios de clientes que impulsan el engagement y
              construyen confianza real.
            </p>

            <div className="hero-ctas">
              <button
                id="hero-start-btn"
                onClick={() => navigate("/register")}
                className="landing-btn-primary landing-btn-lg"
              >
                Empezar Gratis <ArrowRight size={16} />
              </button>
              <button
                id="hero-demo-btn"
                onClick={() => navigate("/login")}
                className="landing-btn-ghost landing-btn-lg"
              >
                <Play size={14} fill="currentColor" />
                Ver Demo
              </button>
            </div>

            <div className="hero-social-proof">
              <div className="hero-avatars">
                {["AG", "LM", "CT", "MR"].map((initials, i) => (
                  <div
                    key={i}
                    className="hero-avatar"
                    style={{ zIndex: 4 - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="hero-stars">★★★★★</div>
                <div className="hero-proof-text">
                  +500 organizaciones confían en nosotros
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hero-visual">
            <div className="hero-visual__glow" />
            <div className="hero-card hero-card--main">
              <div className="hero-card__header">
                <div className="hero-card__dot hero-card__dot--red" />
                <div className="hero-card__dot hero-card__dot--yellow" />
                <div className="hero-card__dot hero-card__dot--green" />
                <span className="hero-card__title">Wall of Love Preview</span>
              </div>
              <div className="hero-card__body">
                {[
                  {
                    name: "Ana García",
                    text: "El mejor CMS de testimonios que usé.",
                    rating: 5,
                    avatar: "AG",
                    grad: "linear-gradient(135deg,#7c3aed,#2563eb)",
                  },
                  {
                    name: "Luis Martínez",
                    text: "Subió nuestras conversiones un 35%.",
                    rating: 5,
                    avatar: "LM",
                    grad: "linear-gradient(135deg,#0891b2,#059669)",
                  },
                  {
                    name: "Carla Torres",
                    text: "Increíble facilidad de embedding.",
                    rating: 5,
                    avatar: "CT",
                    grad: "linear-gradient(135deg,#dc2626,#9333ea)",
                  },
                ].map((t, i) => (
                  <div key={i} className="hero-testimonial-item">
                    <div
                      className="hero-testimonial-avatar"
                      style={{ background: t.grad }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="hero-testimonial-name">{t.name}</div>
                      <div className="hero-testimonial-text">{t.text}</div>
                      <div className="hero-testimonial-stars">
                        {"★".repeat(t.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification */}
            <div className="hero-float-card">
              <CheckCircle2 size={16} style={{ color: "#34d399" }} />
              <div>
                <div className="hero-float-title">Nuevo testimonio</div>
                <div className="hero-float-sub">aprobado hace 2 min</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="hiw-section" id="how-it-works">
        <div className="section-inner">
          <div className="section-label">EL PROCESO</div>
          <h2 className="section-title">Cómo funciona</h2>
          <div className="hiw-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="hiw-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="hiw-card__icon">{step.icon}</div>
                <h3 className="hiw-card__title">{step.title}</h3>
                <p className="hiw-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="features-section" id="features">
        <div className="section-inner features-inner">
          {/* Left: Feature list */}
          <div className="features-list">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="feature-item"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="feature-item__icon">{f.icon}</div>
                <div>
                  <h3 className="feature-item__title">{f.title}</h3>
                  <p className="feature-item__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Dashboard mockup */}
          <div className="features-mockup">
            <div className="mockup-glow" />
            <img
              src={dashboardMockup}
              alt="Dashboard de TestimonialCMS mostrando testimonios, analytics y moderación"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════ WALL OF LOVE ═══════════════════ */}
      <section className="wol-section" id="wall-of-love">
        <div className="section-inner">
          <h2 className="section-title">Wall of Love</h2>
          <p className="section-subtitle">
            Mirá cómo las principales organizaciones están mostrando su éxito con
            clientes reales
          </p>
          <div className="wol-grid">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="wol-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="wol-card__header">
                  <div className="wol-avatar" style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="wol-name">{t.name}</div>
                    <div className="wol-role">{t.role}</div>
                  </div>
                </div>
                <div className="wol-stars">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="wol-text">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      <section className="pricing-section" id="pricing">
        <div className="section-inner">
          <h2 className="section-title">Invertí en tu reputación</h2>
          <p className="section-subtitle">
            Precios simples y transparentes para organizaciones de todos los tamaños
          </p>
          <div className="pricing-grid">
            {PRICING.map((plan, i) => (
              <div
                key={i}
                className={`pricing-card ${plan.featured ? "pricing-card--featured" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.featured && (
                  <div className="pricing-featured-badge">Más popular</div>
                )}
                <div className="pricing-card__name">{plan.name}</div>
                <div className="pricing-card__price">
                  <span className="pricing-amount">{plan.price}</span>
                  <span className="pricing-period">{plan.period}</span>
                </div>
                <p className="pricing-desc">{plan.desc}</p>
                <ul className="pricing-features">
                  {plan.features.map((f, j) => (
                    <li key={j} className="pricing-feature">
                      <CheckCircle2 size={15} className="pricing-check" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  id={`pricing-cta-${plan.name.toLowerCase()}`}
                  onClick={() => navigate("/register")}
                  className={
                    plan.featured ? "landing-btn-primary" : "landing-btn-outline"
                  }
                  style={{ width: "100%", marginTop: "16px", justifyContent: "center" }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <section className="cta-section" id="cta">
        <div className="cta-inner">
          <h2 className="cta-title">¿Listo para mostrar tu éxito?</h2>
          <p className="cta-subtitle">
            Únite a +500 organizaciones que ya construyen su reputación con
            TestimonialCMS.
          </p>
          <div className="cta-buttons">
            <button
              id="cta-start-btn"
              onClick={() => navigate("/register")}
              className="landing-btn-primary landing-btn-lg"
            >
              Empezar Gratis
            </button>
            <button
              id="cta-demo-btn"
              onClick={() => navigate("/login")}
              className="landing-btn-ghost landing-btn-lg"
            >
              Agendar una Demo
            </button>
          </div>
          <div className="cta-disclaimer">
            SIN TARJETA DE CRÉDITO • PRUEBA GRATUITA DE 30 DÍAS
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="landing-footer">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div className="landing-nav__logo">
              <span className="landing-nav__logo-dot" />
              TestimonialCMS
            </div>
            <p className="footer-brand__desc">
              La plataforma líder para recolectar, moderar y mostrar testimonios
              de clientes que impulsan tu negocio.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <Share2 size={16} />
              </a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <Link size={16} />
              </a>
              <a href="#" className="footer-social-link" aria-label="GitHub">
                <Globe size={16} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-col__title">Producto</h4>
              <a href="#features" className="footer-link">Características</a>
              <a href="#pricing" className="footer-link">Precios</a>
              <a href="#wall-of-love" className="footer-link">Wall of Love</a>
              <a href="#" className="footer-link">Integraciones</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-col__title">Empresa</h4>
              <a href="#" className="footer-link">Nosotros</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Casos de éxito</a>
              <a href="#" className="footer-link">Contacto</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-col__title">Careers</h4>
              <a href="#" className="footer-link">Posiciones abiertas</a>
              <a href="#" className="footer-link">Cultura</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 TestimonialCMS. Todos los derechos reservados.</span>
          <div className="footer-bottom-links">
            <a href="#" className="footer-link">Privacidad</a>
            <a href="#" className="footer-link">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
