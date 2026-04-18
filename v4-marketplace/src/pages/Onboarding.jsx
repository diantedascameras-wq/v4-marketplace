import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ─── V4 Design System Tokens ─── */
const V4 = {
  black: "#050505",
  darkGray: "#1E2124",
  gray: "#606060",
  lightGray: "#F2F2F2",
  white: "#FFFFFF",
  sectionBg: "#FAF9F7",
  accent: "#FB2E0A",
  accentDark: "#560303",
  gradPrimary: "linear-gradient(135deg, #560303, #FB2E0A)",
  gradSubtle: "linear-gradient(135deg, #560303, #C41E08)",
  gradFooter: "linear-gradient(135deg, #3D0202, #560303)",
};
const FONT = `'IBM Plex Sans', -apple-system, sans-serif`;

/* ─── Data ─── */
const NICHES = [
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "lifestyle", label: "Lifestyle", emoji: "✨" },
  { id: "moda", label: "Moda", emoji: "👗" },
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "fitness", label: "Fitness", emoji: "💪" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "beleza", label: "Beleza", emoji: "💄" },
  { id: "financas", label: "Finanças", emoji: "💰" },
  { id: "viagem", label: "Viagem", emoji: "✈️" },
  { id: "educacao", label: "Educação", emoji: "📚" },
  { id: "musica", label: "Música", emoji: "🎵" },
  { id: "humor", label: "Humor", emoji: "😂" },
];

const PLATFORMS = [
  { id: "tiktok", name: "TikTok", emoji: "🎵", hint: "@username" },
  { id: "instagram", name: "Instagram", emoji: "📸", hint: "@username" },
  { id: "youtube", name: "YouTube", emoji: "▶️", hint: "Canal" },
  { id: "linkedin", name: "LinkedIn", emoji: "💼", hint: "Perfil" },
];

const INDUSTRIES = [
  "Fintech", "Food & Beverage", "Moda", "Tech",
  "Beleza", "Gaming", "Educação", "Saúde",
  "Automotivo", "Entretenimento", "Varejo", "Outro",
];

const GOALS = [
  { id: "awareness", label: "Aumentar reconhecimento de marca", emoji: "📢" },
  { id: "conversion", label: "Gerar vendas e conversões", emoji: "💸" },
  { id: "launch", label: "Lançar novo produto", emoji: "🚀" },
  { id: "community", label: "Construir comunidade", emoji: "🤝" },
];

/* ─── Shared helpers ─── */
const input = (extra = {}) => ({
  width: "100%",
  padding: "14px 16px",
  fontSize: 14,
  fontFamily: FONT,
  border: `1px solid ${V4.lightGray}`,
  borderRadius: 10,
  background: V4.white,
  color: V4.black,
  outline: "none",
  transition: "border 0.2s ease, box-shadow 0.2s ease",
  ...extra,
});

const label = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: V4.darkGray,
  marginBottom: 6,
  letterSpacing: "0.02em",
};

/* ══════════════════════════════════════════════════════════════════ */
export default function Onboarding() {
  const navigate = useNavigate();
  const [view, setView] = useState("welcome"); // welcome | login | creator | brand
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({
    email: "", password: "",
    name: "", username: "", bio: "", location: "",
    niches: [],
    platforms: { tiktok: "", instagram: "", youtube: "", linkedin: "" },
    companyName: "", website: "", industry: "",
    goals: [],
  });

  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 30);
    return () => clearTimeout(t);
  }, [view, step]);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleInArray = (key, id, max = 99) => {
    setForm(f => {
      const has = f[key].includes(id);
      if (has) return { ...f, [key]: f[key].filter(x => x !== id) };
      if (f[key].length >= max) return f;
      return { ...f, [key]: [...f[key], id] };
    });
  };

  const go = (next) => { setView(next); setStep(0); };
  const finish = (target) => navigate(target);

  /* ─── Global keyframes ─── */
  const keyframes = `
    @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    @keyframes float1 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(40px,-30px) } }
    @keyframes float2 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-30px,40px) } }
    @keyframes pulse  { 0%,100% { opacity: 0.7 } 50% { opacity: 1 } }
    @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
    input:focus { border-color: ${V4.accent} !important; box-shadow: 0 0 0 3px ${V4.accent}22; }
    textarea:focus { border-color: ${V4.accent} !important; box-shadow: 0 0 0 3px ${V4.accent}22; }
    button { font-family: ${FONT}; }
    * { box-sizing: border-box; }
  `;

  return (
    <div style={{ minHeight: "100vh", background: V4.sectionBg, fontFamily: FONT }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{keyframes}</style>

      {view === "welcome"    && <Welcome  onPick={go} ready={ready} />}
      {view === "login"      && <Login    onBack={() => go("welcome")} onSuccess={() => finish("/creator")} onSignup={() => go("welcome")} ready={ready} form={form} update={update} />}
      {view === "creator"    && <CreatorFlow  step={step} setStep={setStep} form={form} update={update} toggleInArray={toggleInArray} onBack={() => go("welcome")} onDone={() => finish("/creator")} ready={ready} />}
      {view === "brand"      && <BrandFlow    step={step} setStep={setStep} form={form} update={update} toggleInArray={toggleInArray} onBack={() => go("welcome")} onDone={() => finish("/brand")} ready={ready} />}
    </div>
  );
}

/* ══════════════════════ WELCOME ══════════════════════ */
function Welcome({ onPick, ready }) {
  const [hovered, setHovered] = useState(null);
  const anim = (delay) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: V4.black,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* ─── Floating orbs ─── */}
      <div style={{
        position: "absolute", top: "-10%", left: "-15%",
        width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle, #FB2E0A 0%, transparent 70%)",
        opacity: 0.35, filter: "blur(60px)",
        animation: "float1 14s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", right: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, #560303 0%, transparent 70%)",
        opacity: 0.55, filter: "blur(80px)",
        animation: "float2 18s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "60%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, #C41E08 0%, transparent 70%)",
        opacity: 0.25, filter: "blur(50px)",
        animation: "float1 20s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />

      {/* ─── Top bar ─── */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "28px 48px", position: "relative", zIndex: 2,
        ...anim(0),
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: V4.gradPrimary,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: V4.white, fontWeight: 700, fontSize: 15,
          }}>V4</div>
          <div>
            <div style={{ color: V4.white, fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>Creators</div>
            <div style={{ color: V4.gray, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em" }}>MARKETPLACE</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 13, color: V4.gray }}>Já tem conta?</span>
          <button onClick={() => onPick("login")} style={{
            padding: "10px 20px", borderRadius: 10,
            border: `1px solid ${V4.white}30`,
            background: "transparent", color: V4.white,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = V4.white; e.currentTarget.style.color = V4.black; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = V4.white; }}
          >Entrar</button>
        </div>
      </header>

      {/* ─── Main content ─── */}
      <main style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "40px 48px", position: "relative", zIndex: 2,
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 14px", borderRadius: 100,
          background: `${V4.accent}18`, color: V4.accent,
          fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 28, border: `1px solid ${V4.accent}30`,
          ...anim(0.1),
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: V4.accent, animation: "pulse 2s infinite" }} />
          Novo — Programa Beta aberto
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 700,
          color: V4.white,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          marginBottom: 20,
          maxWidth: 900,
          ...anim(0.2),
        }}>
          Onde marcas e{" "}
          <span style={{
            background: V4.gradPrimary,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>criadores</span>{" "}
          se encontram
        </h1>

        <p style={{
          fontSize: 17, color: "#ffffffaa", maxWidth: 560,
          lineHeight: 1.6, marginBottom: 48, fontWeight: 400,
          ...anim(0.3),
        }}>
          A plataforma de parcerias verificadas do Brasil. Conecte-se com quem importa,
          publique deals e cresça com transparência.
        </p>

        {/* Choice cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20,
          maxWidth: 720, width: "100%",
          ...anim(0.4),
        }}>
          {[
            { id: "creator", title: "Sou Criador", emoji: "🎨", desc: "Quero encontrar deals de marcas que combinam com meu conteúdo", cta: "Começar como Criador" },
            { id: "brand",   title: "Sou Marca",   emoji: "🏢", desc: "Quero publicar campanhas e conectar com criadores verificados",  cta: "Começar como Marca"   },
          ].map(card => (
            <button key={card.id} onClick={() => onPick(card.id)}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "36px 28px 32px",
                borderRadius: 18,
                border: `1px solid ${hovered === card.id ? V4.accent : V4.white}20`,
                background: hovered === card.id
                  ? "linear-gradient(180deg, #1E2124 0%, #0A0A0A 100%)"
                  : "#ffffff08",
                backdropFilter: "blur(12px)",
                textAlign: "left", cursor: "pointer",
                transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                transform: hovered === card.id ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered === card.id ? `0 20px 40px ${V4.accent}30, 0 0 0 1px ${V4.accent}40` : "none",
              }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: hovered === card.id ? V4.gradPrimary : "#ffffff10",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, marginBottom: 20,
                transition: "all 0.4s ease",
              }}>{card.emoji}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: V4.white, marginBottom: 8, letterSpacing: "-0.02em" }}>
                {card.title}
              </div>
              <div style={{ fontSize: 13, color: "#ffffff88", lineHeight: 1.55, marginBottom: 24, minHeight: 48 }}>
                {card.desc}
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 600,
                color: hovered === card.id ? V4.accent : V4.white,
                transition: "all 0.3s ease",
              }}>
                {card.cta}
                <span style={{ transform: hovered === card.id ? "translateX(4px)" : "translateX(0)", transition: "transform 0.3s ease" }}>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Social proof */}
        <div style={{
          marginTop: 56, display: "flex", gap: 40, flexWrap: "wrap",
          justifyContent: "center", alignItems: "center",
          ...anim(0.5),
        }}>
          {[
            { v: "5.000+", l: "criadores verificados" },
            { v: "200+",   l: "marcas ativas" },
            { v: "R$ 2M+", l: "pagos em deals" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: V4.white, letterSpacing: "-0.02em" }}>{s.v}</div>
              <div style={{ fontSize: 11, color: V4.gray, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{
        padding: "24px 48px", position: "relative", zIndex: 2,
        fontSize: 11, color: V4.gray, textAlign: "center",
        ...anim(0.6),
      }}>
        © 2026 V4 Creators · feito com ♥ no Brasil
      </footer>
    </div>
  );
}

/* ══════════════════════ LOGIN ══════════════════════ */
function Login({ onBack, onSuccess, onSignup, ready, form, update }) {
  const anim = (delay) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(16px)",
    transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)" }}>
      {/* ── Left panel (gradient) ── */}
      <div style={{
        background: V4.gradPrimary,
        padding: "48px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: V4.white,
      }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-20%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, #ffffff30 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-30%", left: "-10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, #3D020280 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", ...anim(0) }}>
          <button onClick={onBack} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "transparent", border: "none", color: V4.white,
            fontSize: 13, fontWeight: 500, cursor: "pointer", padding: 0,
            opacity: 0.85,
          }}>← Voltar</button>
        </div>

        <div style={{ position: "relative", ...anim(0.15) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: V4.white,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: V4.accentDark, fontWeight: 700, fontSize: 17,
            }}>V4</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Creators</div>
              <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.7, letterSpacing: "0.1em" }}>MARKETPLACE</div>
            </div>
          </div>

          <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Bem-vindo de volta
          </h2>
          <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.6, maxWidth: 440 }}>
            Entre para ver novos deals, acompanhar candidaturas e gerenciar seus conteúdos.
          </p>

          {/* Testimonial */}
          <div style={{
            marginTop: 48, padding: 24, borderRadius: 14,
            background: "#00000020", backdropFilter: "blur(8px)",
            border: "1px solid #ffffff20",
          }}>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>
              “Fechei meu primeiro deal em 48h depois de me verificar. Transparência e pagamentos
              pontuais fazem a diferença.”
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: V4.white, color: V4.accentDark,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14,
              }}>MR</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Marina Rocha</div>
                <div style={{ fontSize: 11, opacity: 0.75 }}>Criadora · 120K no TikTok</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", fontSize: 11, opacity: 0.7, ...anim(0.3) }}>
          © 2026 V4 Creators
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div style={{
        padding: "48px",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        background: V4.white,
      }}>
        <div style={{ width: "100%", maxWidth: 380, ...anim(0.1) }}>
          <h3 style={{ fontSize: 28, fontWeight: 700, color: V4.black, letterSpacing: "-0.02em", marginBottom: 8 }}>
            Entrar na sua conta
          </h3>
          <p style={{ fontSize: 14, color: V4.gray, marginBottom: 32 }}>
            Use seu e-mail e senha para continuar
          </p>

          {/* Social login */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {[
              { label: "Google", icon: "G" },
              { label: "Apple", icon: "" },
            ].map(s => (
              <button key={s.label} style={{
                flex: 1, padding: "12px 16px", borderRadius: 10,
                border: `1px solid ${V4.lightGray}`,
                background: V4.white, color: V4.darkGray,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = V4.sectionBg; e.currentTarget.style.borderColor = V4.gray; }}
                onMouseLeave={e => { e.currentTarget.style.background = V4.white;      e.currentTarget.style.borderColor = V4.lightGray; }}
              >
                <span style={{ fontWeight: 700 }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: V4.lightGray }} />
            <div style={{ fontSize: 11, color: V4.gray, fontWeight: 500 }}>ou com e-mail</div>
            <div style={{ flex: 1, height: 1, background: V4.lightGray }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={label}>E-mail</label>
            <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
              placeholder="voce@exemplo.com" style={input()} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={label}>Senha</label>
            <input type="password" value={form.password} onChange={e => update("password", e.target.value)}
              placeholder="Sua senha" style={input()} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
            <button style={{ background: "none", border: "none", color: V4.accent, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}>
              Esqueceu a senha?
            </button>
          </div>

          <button onClick={onSuccess} style={{
            width: "100%", padding: "14px 20px", borderRadius: 10, border: "none",
            background: V4.gradPrimary, color: V4.white,
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            marginBottom: 20,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 20px ${V4.accent}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none"; }}
          >
            Entrar →
          </button>

          <p style={{ fontSize: 13, color: V4.gray, textAlign: "center" }}>
            Ainda não tem conta?{" "}
            <button onClick={onSignup} style={{ background: "none", border: "none", color: V4.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 }}>
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════ STEPPER (shared) ══════════════════════ */
function Stepper({ total, current, onBack, brandLabel }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "24px 48px", borderBottom: `1px solid ${V4.lightGray}`,
      background: V4.white, position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 10,
          border: `1px solid ${V4.lightGray}`, background: V4.white,
          color: V4.darkGray, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = V4.sectionBg; }}
          onMouseLeave={e => { e.currentTarget.style.background = V4.white; }}
        >←</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: V4.gradPrimary,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: V4.white, fontWeight: 700, fontSize: 12,
          }}>V4</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: V4.darkGray }}>
            {brandLabel}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: i === current ? 28 : 8, height: 8, borderRadius: 4,
            background: i <= current ? V4.accent : V4.lightGray,
            transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
          }} />
        ))}
      </div>

      <div style={{ fontSize: 12, color: V4.gray, fontWeight: 500 }}>
        Passo {current + 1} de {total}
      </div>
    </header>
  );
}

/* ══════════════════════ CREATOR FLOW ══════════════════════ */
function CreatorFlow({ step, setStep, form, update, toggleInArray, onBack, onDone, ready }) {
  const TOTAL = 4;
  const next = () => setStep(s => Math.min(TOTAL - 1, s + 1));
  const prev = () => step === 0 ? onBack() : setStep(s => s - 1);

  const canAdvance = () => {
    if (step === 0) return form.name.trim() && form.email.trim() && form.password.trim();
    if (step === 1) return form.niches.length >= 1;
    if (step === 2) return Object.values(form.platforms).some(v => v.trim().length > 0);
    return true;
  };

  const anim = {
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
  };

  return (
    <div style={{ minHeight: "100vh", background: V4.sectionBg, display: "flex", flexDirection: "column" }}>
      <Stepper total={TOTAL} current={step} onBack={prev} brandLabel="Cadastro de Criador" />

      <main style={{ flex: 1, display: "flex", justifyContent: "center", padding: "48px 24px 120px" }}>
        <div style={{ width: "100%", maxWidth: 640, ...anim }}>
          {step === 0 && <CreatorStep0 form={form} update={update} />}
          {step === 1 && <CreatorStep1 form={form} toggleInArray={toggleInArray} />}
          {step === 2 && <CreatorStep2 form={form} update={update} />}
          {step === 3 && <CreatorDone form={form} onDone={onDone} />}
        </div>
      </main>

      {step < TOTAL - 1 && (
        <footer style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: V4.white, borderTop: `1px solid ${V4.lightGray}`,
          padding: "16px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 10,
        }}>
          <button onClick={prev} style={{
            padding: "12px 20px", borderRadius: 10,
            border: `1px solid ${V4.lightGray}`, background: V4.white,
            color: V4.darkGray, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>Voltar</button>
          <button onClick={next} disabled={!canAdvance()} style={{
            padding: "12px 28px", borderRadius: 10, border: "none",
            background: canAdvance() ? V4.gradPrimary : V4.lightGray,
            color: canAdvance() ? V4.white : V4.gray,
            fontSize: 13, fontWeight: 600,
            cursor: canAdvance() ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}>
            Continuar →
          </button>
        </footer>
      )}
    </div>
  );
}

function CreatorStep0({ form, update }) {
  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 600, color: V4.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
        Informações básicas
      </div>
      <h2 style={{ fontSize: 32, fontWeight: 700, color: V4.black, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.15 }}>
        Vamos criar sua conta de criador
      </h2>
      <p style={{ fontSize: 15, color: V4.gray, lineHeight: 1.55, marginBottom: 32 }}>
        Precisamos de algumas informações para começar. Seu perfil público pode ser editado depois.
      </p>

      <div style={{ background: V4.white, padding: 28, borderRadius: 16, border: `1px solid ${V4.lightGray}` }}>
        <div style={{ marginBottom: 18 }}>
          <label style={label}>Nome completo *</label>
          <input value={form.name} onChange={e => update("name", e.target.value)}
            placeholder="Seu nome como aparece em documentos" style={input()} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={label}>Nome de usuário</label>
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
              color: V4.gray, fontSize: 14, pointerEvents: "none",
            }}>@</span>
            <input value={form.username} onChange={e => update("username", e.target.value.replace(/[^a-z0-9_]/gi, "").toLowerCase())}
              placeholder="seu_usuario" style={input({ paddingLeft: 32 })} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          <div>
            <label style={label}>E-mail *</label>
            <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
              placeholder="voce@exemplo.com" style={input()} />
          </div>
          <div>
            <label style={label}>Senha *</label>
            <input type="password" value={form.password} onChange={e => update("password", e.target.value)}
              placeholder="Mín. 8 caracteres" style={input()} />
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={label}>Cidade</label>
          <input value={form.location} onChange={e => update("location", e.target.value)}
            placeholder="São Paulo, SP" style={input()} />
        </div>

        <div>
          <label style={label}>Bio curta</label>
          <textarea value={form.bio} onChange={e => update("bio", e.target.value)}
            placeholder="Conte em 1-2 frases quem você é e o que cria"
            rows={3}
            style={input({ resize: "vertical", minHeight: 80, fontFamily: FONT })} />
          <div style={{ fontSize: 11, color: V4.gray, marginTop: 4, textAlign: "right" }}>
            {form.bio.length}/160
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: V4.gray, marginTop: 16, lineHeight: 1.5 }}>
        Ao continuar, você concorda com os <strong style={{ color: V4.darkGray }}>Termos de Uso</strong> e{" "}
        <strong style={{ color: V4.darkGray }}>Política de Privacidade</strong>.
      </p>
    </>
  );
}

function CreatorStep1({ form, toggleInArray }) {
  const selected = form.niches;
  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 600, color: V4.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
        Seus nichos
      </div>
      <h2 style={{ fontSize: 32, fontWeight: 700, color: V4.black, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.15 }}>
        Sobre o que você cria?
      </h2>
      <p style={{ fontSize: 15, color: V4.gray, lineHeight: 1.55, marginBottom: 8 }}>
        Escolha até 5 nichos para ajudar marcas a te encontrar. Você pode ajustar depois.
      </p>
      <div style={{ fontSize: 12, color: V4.accent, fontWeight: 600, marginBottom: 28 }}>
        {selected.length}/5 selecionados
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {NICHES.map(n => {
          const isSelected = selected.includes(n.id);
          const disabled = !isSelected && selected.length >= 5;
          return (
            <button key={n.id} disabled={disabled}
              onClick={() => toggleInArray("niches", n.id, 5)}
              style={{
                padding: "20px 16px", borderRadius: 14,
                border: `1.5px solid ${isSelected ? V4.accent : V4.lightGray}`,
                background: isSelected ? `${V4.accent}10` : V4.white,
                color: isSelected ? V4.accent : V4.darkGray,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.4 : 1,
                transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                position: "relative",
                transform: isSelected ? "scale(1.02)" : "scale(1)",
              }}>
              <span style={{ fontSize: 28 }}>{n.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{n.label}</span>
              {isSelected && (
                <span style={{
                  position: "absolute", top: 8, right: 8,
                  width: 18, height: 18, borderRadius: "50%",
                  background: V4.accent, color: V4.white,
                  fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>✓</span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

function CreatorStep2({ form, update }) {
  const setPlatform = (id, v) => update("platforms", { ...form.platforms, [id]: v });

  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 600, color: V4.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
        Suas plataformas
      </div>
      <h2 style={{ fontSize: 32, fontWeight: 700, color: V4.black, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.15 }}>
        Conecte onde você publica
      </h2>
      <p style={{ fontSize: 15, color: V4.gray, lineHeight: 1.55, marginBottom: 28 }}>
        Adicione pelo menos uma plataforma. Quanto mais, melhor — marcas veem todo seu alcance.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {PLATFORMS.map(p => {
          const filled = form.platforms[p.id]?.trim().length > 0;
          return (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "16px 20px", borderRadius: 14,
              background: V4.white,
              border: `1.5px solid ${filled ? V4.accent : V4.lightGray}`,
              transition: "border 0.2s ease",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: V4.lightGray,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: V4.black, marginBottom: 2 }}>{p.name}</div>
                <input value={form.platforms[p.id]} onChange={e => setPlatform(p.id, e.target.value)}
                  placeholder={p.hint}
                  style={{
                    width: "100%", border: "none", outline: "none",
                    fontSize: 13, color: V4.gray, padding: 0,
                    fontFamily: FONT, background: "transparent",
                  }} />
              </div>
              {filled && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "4px 10px", borderRadius: 20,
                  background: `${V4.accent}14`, color: V4.accent,
                  fontSize: 11, fontWeight: 600,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: V4.accent }} />
                  Conectado
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 24, padding: 16, borderRadius: 12,
        background: `${V4.accent}08`, border: `1px solid ${V4.accent}20`,
        fontSize: 13, color: V4.darkGray, lineHeight: 1.5,
      }}>
        <strong>💡 Dica:</strong> Após o cadastro, nosso time analisa seus perfis e te atribui um selo
        de verificação — o que aumenta sua visibilidade para marcas premium.
      </div>
    </>
  );
}

function CreatorDone({ form, onDone }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{
        width: 88, height: 88, borderRadius: "50%",
        background: V4.gradPrimary,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: 44, color: V4.white,
        marginBottom: 28,
        boxShadow: `0 20px 40px ${V4.accent}40`,
        animation: "fadeIn 0.6s ease",
      }}>🎉</div>

      <h2 style={{ fontSize: 36, fontWeight: 700, color: V4.black, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.15 }}>
        Bem-vindo, {form.name.split(" ")[0] || "criador"}!
      </h2>
      <p style={{ fontSize: 16, color: V4.gray, lineHeight: 1.55, marginBottom: 36, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
        Sua conta foi criada. Nosso time vai analisar seus perfis nas próximas 24h para te atribuir um selo de verificação.
      </p>

      <div style={{
        background: V4.white, borderRadius: 16, padding: 28,
        border: `1px solid ${V4.lightGray}`, textAlign: "left", marginBottom: 28,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: V4.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Próximos passos
        </div>
        {[
          { n: "1", t: "Explore deals disponíveis", d: "Veja campanhas que combinam com seu perfil" },
          { n: "2", t: "Candidate-se aos que gostar", d: "Marcas aprovam em até 72h" },
          { n: "3", t: "Entregue e receba", d: "Pagamentos automáticos em 7 dias úteis" },
        ].map((s, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, alignItems: "flex-start",
            padding: "12px 0",
            borderBottom: i < 2 ? `1px solid ${V4.lightGray}` : "none",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: `${V4.accent}14`, color: V4.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>{s.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: V4.black, marginBottom: 2 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: V4.gray }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onDone} style={{
        padding: "16px 36px", borderRadius: 12, border: "none",
        background: V4.gradPrimary, color: V4.white,
        fontSize: 15, fontWeight: 600, cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 24px ${V4.accent}40`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none"; }}
      >
        Ir para o Dashboard →
      </button>
    </div>
  );
}

/* ══════════════════════ BRAND FLOW ══════════════════════ */
function BrandFlow({ step, setStep, form, update, toggleInArray, onBack, onDone, ready }) {
  const TOTAL = 3;
  const next = () => setStep(s => Math.min(TOTAL - 1, s + 1));
  const prev = () => step === 0 ? onBack() : setStep(s => s - 1);

  const canAdvance = () => {
    if (step === 0) return form.companyName.trim() && form.email.trim() && form.password.trim() && form.industry.trim();
    if (step === 1) return form.goals.length >= 1;
    return true;
  };

  const anim = {
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
  };

  return (
    <div style={{ minHeight: "100vh", background: V4.sectionBg, display: "flex", flexDirection: "column" }}>
      <Stepper total={TOTAL} current={step} onBack={prev} brandLabel="Cadastro de Marca" />

      <main style={{ flex: 1, display: "flex", justifyContent: "center", padding: "48px 24px 120px" }}>
        <div style={{ width: "100%", maxWidth: 640, ...anim }}>
          {step === 0 && <BrandStep0 form={form} update={update} />}
          {step === 1 && <BrandStep1 form={form} toggleInArray={toggleInArray} />}
          {step === 2 && <BrandDone form={form} onDone={onDone} />}
        </div>
      </main>

      {step < TOTAL - 1 && (
        <footer style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: V4.white, borderTop: `1px solid ${V4.lightGray}`,
          padding: "16px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 10,
        }}>
          <button onClick={prev} style={{
            padding: "12px 20px", borderRadius: 10,
            border: `1px solid ${V4.lightGray}`, background: V4.white,
            color: V4.darkGray, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>Voltar</button>
          <button onClick={next} disabled={!canAdvance()} style={{
            padding: "12px 28px", borderRadius: 10, border: "none",
            background: canAdvance() ? V4.gradPrimary : V4.lightGray,
            color: canAdvance() ? V4.white : V4.gray,
            fontSize: 13, fontWeight: 600,
            cursor: canAdvance() ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}>
            Continuar →
          </button>
        </footer>
      )}
    </div>
  );
}

function BrandStep0({ form, update }) {
  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 600, color: V4.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
        Sua empresa
      </div>
      <h2 style={{ fontSize: 32, fontWeight: 700, color: V4.black, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.15 }}>
        Conte sobre sua marca
      </h2>
      <p style={{ fontSize: 15, color: V4.gray, lineHeight: 1.55, marginBottom: 32 }}>
        Usaremos essas informações para personalizar sua experiência e validar sua conta.
      </p>

      <div style={{ background: V4.white, padding: 28, borderRadius: 16, border: `1px solid ${V4.lightGray}` }}>
        <div style={{ marginBottom: 18 }}>
          <label style={label}>Nome da empresa *</label>
          <input value={form.companyName} onChange={e => update("companyName", e.target.value)}
            placeholder="Ex: Nubank, Nike, Spotify..." style={input()} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={label}>Website</label>
          <input value={form.website} onChange={e => update("website", e.target.value)}
            placeholder="https://suaempresa.com" style={input()} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          <div>
            <label style={label}>E-mail corporativo *</label>
            <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
              placeholder="voce@empresa.com" style={input()} />
          </div>
          <div>
            <label style={label}>Senha *</label>
            <input type="password" value={form.password} onChange={e => update("password", e.target.value)}
              placeholder="Mín. 8 caracteres" style={input()} />
          </div>
        </div>

        <div>
          <label style={label}>Indústria *</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {INDUSTRIES.map(ind => {
              const selected = form.industry === ind;
              return (
                <button key={ind} onClick={() => update("industry", ind)} style={{
                  padding: "11px 12px", borderRadius: 10,
                  border: `1.5px solid ${selected ? V4.accent : V4.lightGray}`,
                  background: selected ? `${V4.accent}10` : V4.white,
                  color: selected ? V4.accent : V4.darkGray,
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.2s ease",
                }}>
                  {ind}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function BrandStep1({ form, toggleInArray }) {
  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 600, color: V4.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
        Seus objetivos
      </div>
      <h2 style={{ fontSize: 32, fontWeight: 700, color: V4.black, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.15 }}>
        O que você quer alcançar?
      </h2>
      <p style={{ fontSize: 15, color: V4.gray, lineHeight: 1.55, marginBottom: 28 }}>
        Selecione seus principais objetivos de marketing. Vamos sugerir criadores alinhados a eles.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {GOALS.map(g => {
          const selected = form.goals.includes(g.id);
          return (
            <button key={g.id} onClick={() => toggleInArray("goals", g.id)} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "18px 22px", borderRadius: 14,
              border: `1.5px solid ${selected ? V4.accent : V4.lightGray}`,
              background: selected ? `${V4.accent}10` : V4.white,
              cursor: "pointer", textAlign: "left",
              transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
              transform: selected ? "scale(1.01)" : "scale(1)",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: selected ? V4.gradPrimary : V4.lightGray,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, flexShrink: 0,
                transition: "all 0.25s ease",
              }}>{g.emoji}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: selected ? V4.accent : V4.black }}>
                {g.label}
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                border: `2px solid ${selected ? V4.accent : V4.lightGray}`,
                background: selected ? V4.accent : V4.white,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: V4.white, fontSize: 12, fontWeight: 700,
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}>
                {selected && "✓"}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function BrandDone({ form, onDone }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{
        width: 88, height: 88, borderRadius: "50%",
        background: V4.gradPrimary,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: 44, color: V4.white,
        marginBottom: 28,
        boxShadow: `0 20px 40px ${V4.accent}40`,
        animation: "fadeIn 0.6s ease",
      }}>🚀</div>

      <h2 style={{ fontSize: 36, fontWeight: 700, color: V4.black, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.15 }}>
        Tudo pronto, {form.companyName || "marca"}!
      </h2>
      <p style={{ fontSize: 16, color: V4.gray, lineHeight: 1.55, marginBottom: 36, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
        Sua conta foi criada. Você já pode criar sua primeira campanha e descobrir criadores verificados.
      </p>

      <div style={{
        background: V4.white, borderRadius: 16, padding: 28,
        border: `1px solid ${V4.lightGray}`, textAlign: "left", marginBottom: 28,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: V4.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          O que você pode fazer agora
        </div>
        {[
          { n: "1", t: "Criar sua primeira campanha", d: "Defina briefing, plataformas e budget em 4 passos" },
          { n: "2", t: "Revisar candidaturas", d: "Aprove os criadores que mais combinam com sua marca" },
          { n: "3", t: "Acompanhar performance", d: "Veja métricas em tempo real no dashboard" },
        ].map((s, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, alignItems: "flex-start",
            padding: "12px 0",
            borderBottom: i < 2 ? `1px solid ${V4.lightGray}` : "none",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: `${V4.accent}14`, color: V4.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>{s.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: V4.black, marginBottom: 2 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: V4.gray }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onDone} style={{
        padding: "16px 36px", borderRadius: 12, border: "none",
        background: V4.gradPrimary, color: V4.white,
        fontSize: 15, fontWeight: 600, cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 24px ${V4.accent}40`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none"; }}
      >
        Ir para o Painel da Marca →
      </button>
    </div>
  );
}
