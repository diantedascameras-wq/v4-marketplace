import { useState, useRef } from "react";

/* ─── V4 Design System Tokens ─── */
const V4 = {
  black: "#050505",
  darkGray: "#1E2124",
  gray: "#606060",
  lightGray: "#F2F2F2",
  white: "#FFFFFF",
  black70: "#1c1c1cb3",
  white70: "#ffffffb3",
  sectionBg: "#FAF9F7",
  gradientPrimary: "linear-gradient(135deg, #560303, #FB2E0A)",
  gradientSubtle: "linear-gradient(135deg, #560303, #C41E08)",
  gradientRadial: "radial-gradient(circle at 30% 40%, #FB2E0A, #560303)",
  gradientFooter: "linear-gradient(135deg, #3D0202, #560303)",
  accent: "#FB2E0A",
  accentDark: "#560303",
  success: "#16a34a",
  successBg: "#16a34a12",
  warning: "#f59e0b",
  warningBg: "#f59e0b12",
};
const FONT = `'IBM Plex Sans', -apple-system, sans-serif`;

/* ─── Icons ─── */
const I = ({ children, size = 20, color = "currentColor", fill = "none", sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const Icons = {
  home: (p = {}) => <I {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></I>,
  deals: (p = {}) => <I {...p}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></I>,
  stats: (p = {}) => <I {...p}><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></I>,
  wallet: (p = {}) => <I {...p}><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></I>,
  profile: (p = {}) => <I {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></I>,
  settings: (p = {}) => <I {...p}><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></I>,
  bell: (p = {}) => <I {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></I>,
  check: (p = {}) => <I {...p}><path d="M20 6 9 17l-5-5"/></I>,
  star: (p = {}) => <I {...p} fill={p.color || "currentColor"} sw={0}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></I>,
  starOutline: (p = {}) => <I {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></I>,
  edit: (p = {}) => <I {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></I>,
  link: (p = {}) => <I {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></I>,
  mapPin: (p = {}) => <I {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></I>,
  calendar: (p = {}) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></I>,
  eye: (p = {}) => <I {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></I>,
  heart: (p = {}) => <I {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></I>,
  share: (p = {}) => <I {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></I>,
  camera: (p = {}) => <I {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></I>,
  award: (p = {}) => <I {...p}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></I>,
  trendUp: (p = {}) => <I {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></I>,
  play: (p = {}) => <I {...p} fill={p.color || "currentColor"} sw={0}><polygon points="5 3 19 12 5 21 5 3"/></I>,
  grid: (p = {}) => <I {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></I>,
  list: (p = {}) => <I {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></I>,
  shield: (p = {}) => <I {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></I>,
  upload: (p = {}) => <I {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></I>,
  x: (p = {}) => <I {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></I>,
};

/* ─── Mock Creator Data ─── */
const CREATOR = {
  name: "Ana Beatriz Ferreira",
  handle: "@anab.creates",
  avatar: "AB",
  bio: "Criadora de conteúdo sobre lifestyle, tech e finanças pessoais. Apaixonada por contar histórias autênticas que conectam marcas a pessoas reais.",
  location: "São Paulo, SP",
  joinedAt: "Jan 2025",
  website: "anabcreates.com.br",
  verified: true,
  level: "Gold",
  followers: { tiktok: "124K", reels: "89.2K", shorts: "45.8K" },
  totalFollowers: "259K",
  stats: {
    completedDeals: 28,
    totalViews: "4.2M",
    avgEngagement: "6.8%",
    avgRating: 4.9,
    totalRatings: 24,
    totalEarnings: "R$ 18.450",
    onTimeRate: "96%",
    responseTime: "2h",
  },
  tags: ["Lifestyle", "Tech", "Finanças", "Reviews", "Unboxing"],
  platforms: [
    { name: "TikTok", handle: "@anab.creates", followers: "124K", icon: "♪", color: "#000" },
    { name: "Instagram", handle: "@anab.creates", followers: "89.2K", icon: "◎", color: "#E1306C" },
    { name: "YouTube", handle: "Ana B Creates", followers: "45.8K", icon: "▶", color: "#FF0000" },
  ],
};

const PORTFOLIO = [
  { id: 1, brand: "Nubank", title: "NuCripto — Investir é simples", views: "482K", likes: "34K", thumbnail: "💜", platform: "TikTok", date: "Mar 2026", engagement: "7.1%" },
  { id: 2, brand: "iFood", title: "Um dia com iFood Benefícios", views: "310K", likes: "22K", thumbnail: "🍕", platform: "Reels", date: "Fev 2026", engagement: "7.1%" },
  { id: 3, brand: "Insider", title: "72h com a Tech T-Shirt", views: "245K", likes: "18K", thumbnail: "👕", platform: "TikTok", date: "Jan 2026", engagement: "7.3%" },
  { id: 4, brand: "Havaianas", title: "OOTD Coleção Verão", views: "198K", likes: "15K", thumbnail: "🩴", platform: "Reels", date: "Dez 2025", engagement: "7.6%" },
  { id: 5, brand: "Amazon BR", title: "Prime Day Haul — Top 5", views: "520K", likes: "41K", thumbnail: "📦", platform: "Shorts", date: "Nov 2025", engagement: "7.9%" },
  { id: 6, brand: "Feastables", title: "Taste Test Dark Chocolate", views: "156K", likes: "12K", thumbnail: "🍫", platform: "TikTok", date: "Out 2025", engagement: "7.7%" },
];

const REVIEWS = [
  { brand: "Nubank", brandAvatar: "NU", rating: 5, text: "Ana entregou antes do prazo com um conteúdo extremamente autêntico. O vídeo superou todas as nossas expectativas de views e engajamento. Parceria incrível.", date: "Mar 2026" },
  { brand: "iFood", brandAvatar: "iF", rating: 5, text: "Profissionalismo impecável. Seguiu o briefing à risca mas ainda trouxe sua personalidade única. Os números falam por si.", date: "Fev 2026" },
  { brand: "Insider Store", brandAvatar: "IS", rating: 5, text: "Review super genuíno que gerou conversão real. A Ana tem um dom para apresentar produtos de forma natural. Recomendo fortemente.", date: "Jan 2026" },
  { brand: "Amazon BR", brandAvatar: "AZ", rating: 4, text: "Ótimo conteúdo e boa comunicação durante todo o processo. O unboxing ficou dinâmico e divertido, perfeito para o público jovem.", date: "Nov 2025" },
];

const DEAL_HISTORY = [
  { brand: "Nubank", title: "NuCripto — Educação Financeira", status: "completed", earnings: "R$ 2.400", date: "Mar 2026" },
  { brand: "iFood", title: "iFood Benefícios — Corporativo", status: "completed", earnings: "R$ 1.860", date: "Fev 2026" },
  { brand: "Insider", title: "Review Tech T-Shirt", status: "completed", earnings: "R$ 980", date: "Jan 2026" },
  { brand: "Feastables", title: "Dark Chocolate Launch", status: "active", earnings: "R$ 720", date: "Abr 2026" },
  { brand: "Havaianas", title: "Coleção Outono Street Style", status: "active", earnings: "—", date: "Abr 2026" },
];

/* ─── Sub-components ─── */
const PlatformPill = ({ name, small }) => {
  const c = { TikTok: "#000", Reels: "#E1306C", Shorts: "#FF0000", Instagram: "#E1306C", YouTube: "#FF0000", LinkedIn: "#0077B5" };
  return (
    <span style={{
      padding: small ? "2px 8px" : "3px 10px", borderRadius: 4,
      fontSize: small ? 10 : 11, fontWeight: 600, fontFamily: FONT,
      background: `${c[name] || V4.gray}12`, color: c[name] || V4.gray,
    }}>{name}</span>
  );
};

const StarRating = ({ rating, size = 14 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} style={{ color: i <= rating ? "#f59e0b" : "#e5e7eb" }}>
        {i <= rating ? Icons.star({ size, color: "#f59e0b" }) : Icons.starOutline({ size, color: "#e5e7eb" })}
      </span>
    ))}
  </div>
);

const StatusBadge = ({ status }) => {
  const m = {
    active: { bg: V4.successBg, color: V4.success, label: "Ativa" },
    completed: { bg: `${V4.gray}15`, color: V4.gray, label: "Concluída" },
    pending: { bg: V4.warningBg, color: V4.warning, label: "Pendente" },
  };
  const s = m[status] || m.completed;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 6, fontSize: 11,
      fontWeight: 600, fontFamily: FONT, background: s.bg, color: s.color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
      {s.label}
    </span>
  );
};

const ProgressRing = ({ value, max, size = 64, stroke = 5, color = V4.accent }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={V4.lightGray} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)" }} />
    </svg>
  );
};

/* ─── Edit Profile Modal ─── */
const EditProfileModal = ({ creator, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: creator.name, handle: creator.handle, bio: creator.bio,
    location: creator.location, website: creator.website,
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(5,5,5,0.55)",
      backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, animation: "fadeIn 0.2s ease", padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: V4.white, borderRadius: 20, width: "100%", maxWidth: 560,
        maxHeight: "85vh", overflow: "auto", animation: "slideUp 0.35s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{
          padding: "24px 28px 20px", borderBottom: `1px solid ${V4.lightGray}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <h2 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: V4.black, margin: 0 }}>Editar Perfil</h2>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10, border: "none",
            background: V4.lightGray, cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", color: V4.gray,
          }}>{Icons.x({ size: 16 })}</button>
        </div>

        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Avatar upload */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20, background: V4.gradientRadial,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: V4.white, fontFamily: FONT, fontSize: 24, fontWeight: 700,
              }}>AB</div>
              <button style={{
                position: "absolute", bottom: -4, right: -4, width: 28, height: 28,
                borderRadius: 8, background: V4.black, border: `2px solid ${V4.white}`,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>{Icons.camera({ size: 12, color: V4.white })}</button>
            </div>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>Foto de perfil</p>
              <p style={{ fontFamily: FONT, fontSize: 12, color: V4.gray }}>JPG ou PNG, máx 2MB</p>
            </div>
          </div>

          {/* Fields */}
          {[
            { label: "Nome Completo", key: "name", placeholder: "Seu nome" },
            { label: "Handle", key: "handle", placeholder: "@seuhandle" },
            { label: "Localização", key: "location", placeholder: "Cidade, Estado" },
            { label: "Website", key: "website", placeholder: "seusite.com.br" },
          ].map((f) => (
            <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black }}>{f.label}</label>
              <input value={form[f.key]} onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                style={{
                  padding: "11px 14px", borderRadius: 10, border: `1px solid #00000012`,
                  background: V4.white, fontFamily: FONT, fontSize: 14, color: V4.black, outline: "none",
                }} />
            </div>
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black }}>Bio</label>
            <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)}
              rows={4} style={{
                padding: "11px 14px", borderRadius: 10, border: `1px solid #00000012`,
                background: V4.white, fontFamily: FONT, fontSize: 14, color: V4.black,
                outline: "none", resize: "vertical",
              }} />
            <span style={{ fontFamily: FONT, fontSize: 11, color: V4.gray, textAlign: "right" }}>
              {form.bio.length}/280
            </span>
          </div>

          {/* Platforms */}
          <div>
            <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black, display: "block", marginBottom: 10 }}>
              Plataformas Conectadas
            </label>
            {creator.platforms.map((p) => (
              <div key={p.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 10, background: V4.sectionBg,
                marginBottom: 8,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <div>
                    <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black }}>{p.name}</span>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginLeft: 8 }}>{p.handle}</span>
                  </div>
                </div>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%", background: V4.success,
                }} />
              </div>
            ))}
            <button style={{
              width: "100%", padding: "10px 14px", borderRadius: 10,
              border: `2px dashed #00000012`, background: "transparent",
              fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.gray,
              cursor: "pointer", marginTop: 4,
            }}>
              + Conectar nova plataforma
            </button>
          </div>
        </div>

        <div style={{
          padding: "16px 28px 24px", borderTop: `1px solid ${V4.lightGray}`,
          display: "flex", justifyContent: "flex-end", gap: 10,
        }}>
          <button onClick={onClose} style={{
            padding: "10px 20px", borderRadius: 10, border: `1px solid #00000012`,
            background: V4.white, fontFamily: FONT, fontSize: 14, fontWeight: 600,
            color: V4.gray, cursor: "pointer",
          }}>Cancelar</button>
          <button onClick={() => { setSaving(true); setTimeout(() => { setSaving(false); onSave(form); }, 1000); }}
            style={{
              padding: "10px 24px", borderRadius: 10, border: "none",
              background: saving ? V4.success : V4.gradientPrimary,
              fontFamily: FONT, fontSize: 14, fontWeight: 600,
              color: V4.white, cursor: "pointer", transition: "all 0.3s ease",
            }}>
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main App ─── */
export default function CreatorProfile() {
  const [activeNav, setActiveNav] = useState("profile");
  const [activeTab, setActiveTab] = useState("portfolio");
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [toast, setToast] = useState(null);
  const [creator, setCreator] = useState(CREATOR);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const navItems = [
    { id: "home", icon: "home", label: "Início" },
    { id: "deals", icon: "deals", label: "Deals" },
    { id: "stats", icon: "stats", label: "Analytics" },
    { id: "wallet", icon: "wallet", label: "Carteira" },
    { id: "profile", icon: "profile", label: "Perfil" },
  ];

  const tabs = [
    { id: "portfolio", label: "Portfólio", count: PORTFOLIO.length },
    { id: "reviews", label: "Avaliações", count: REVIEWS.length },
    { id: "history", label: "Histórico", count: DEAL_HISTORY.length },
  ];

  return (
    <div style={{ minHeight: "100vh", background: V4.sectionBg, fontFamily: FONT }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px }
        input:focus, textarea:focus, button:focus { outline: none }
      `}</style>

      {/* ─── Sidebar ─── */}
      <nav style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: 240,
        background: V4.black, display: "flex", flexDirection: "column",
        padding: "28px 16px", zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 12px", marginBottom: 36 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: V4.gradientPrimary,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: V4.white, fontSize: 16, fontWeight: 800, fontFamily: FONT }}>V4</span>
          </div>
          <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: V4.white, letterSpacing: "-0.02em" }}>Creators</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => {
            const active = activeNav === item.id;
            const Ic = Icons[item.icon];
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                borderRadius: 8, border: "none",
                background: active ? "#ffffff12" : "transparent",
                color: active ? V4.white : "#ffffff60",
                cursor: "pointer", fontFamily: FONT, fontSize: 14,
                fontWeight: active ? 600 : 400, textAlign: "left",
                transition: "all 0.2s ease",
              }}>
                {Ic && Ic({ size: 18 })}
                {item.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: "auto" }}>
          <div style={{ padding: 16, borderRadius: 12, background: "#ffffff08", marginBottom: 16 }}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: "#ffffff80", marginBottom: 6 }}>Nível do Criador</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>🥇</span>
              <div>
                <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: V4.white }}>Gold</span>
                <div style={{ marginTop: 4, width: 100, height: 3, borderRadius: 2, background: "#ffffff15", overflow: "hidden" }}>
                  <div style={{ width: "72%", height: "100%", borderRadius: 2, background: "#f59e0b" }} />
                </div>
              </div>
            </div>
            <span style={{ fontFamily: FONT, fontSize: 10, color: "#ffffff50", marginTop: 6, display: "block" }}>72% para Platinum</span>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
            borderRadius: 8, border: "none", background: "transparent",
            color: "#ffffff50", cursor: "pointer", fontFamily: FONT, fontSize: 13,
            width: "100%", textAlign: "left",
          }}>
            {Icons.settings({ size: 16 })} Configurações
          </button>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main style={{ marginLeft: 240, minHeight: "100vh", padding: "0 40px 60px" }}>
        {/* Top bar */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          padding: "24px 0", gap: 12,
        }}>
          <button style={{
            position: "relative", width: 40, height: 40, borderRadius: 10,
            border: `1px solid #00000008`, background: V4.white,
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: V4.gray,
          }}>
            {Icons.bell({ size: 18 })}
            <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: V4.accent }} />
          </button>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: V4.gradientSubtle,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: V4.white, fontFamily: FONT, fontSize: 14, fontWeight: 700,
          }}>AB</div>
        </header>

        {/* ─── Profile Hero ─── */}
        <div style={{
          background: V4.white, borderRadius: 20, overflow: "hidden",
          border: `1px solid #00000006`, marginBottom: 28,
          animation: "fadeUp 0.5s ease both",
        }}>
          {/* Cover */}
          <div style={{
            height: 160, background: V4.gradientRadial, position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: 0, opacity: 0.15,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            <button onClick={() => setShowEditModal(true)} style={{
              position: "absolute", top: 16, right: 16, padding: "8px 16px",
              borderRadius: 8, border: `1px solid #ffffff30`, background: "#00000030",
              backdropFilter: "blur(8px)", color: V4.white, fontFamily: FONT,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              {Icons.edit({ size: 13, color: V4.white })} Editar Perfil
            </button>
          </div>

          {/* Profile Info */}
          <div style={{ padding: "0 32px 28px", marginTop: -44 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginBottom: 20 }}>
              {/* Avatar */}
              <div style={{
                width: 96, height: 96, borderRadius: 24, background: V4.gradientRadial,
                border: `4px solid ${V4.white}`, display: "flex", alignItems: "center",
                justifyContent: "center", color: V4.white, fontFamily: FONT,
                fontSize: 32, fontWeight: 700, flexShrink: 0,
                boxShadow: "0 8px 24px rgba(86,3,3,0.2)",
              }}>
                {creator.avatar}
              </div>
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <h1 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: V4.black, margin: 0 }}>
                    {creator.name}
                  </h1>
                  {creator.verified && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: 22, height: 22, borderRadius: "50%", background: V4.gradientPrimary,
                    }}>{Icons.check({ size: 13, color: V4.white })}</span>
                  )}
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "3px 10px", borderRadius: 6, background: "#f59e0b15",
                    fontFamily: FONT, fontSize: 11, fontWeight: 700, color: "#b45309",
                  }}>
                    🥇 {creator.level}
                  </span>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 14, color: V4.gray, marginTop: 2 }}>
                  {creator.handle}
                </p>
              </div>
              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0, paddingBottom: 4 }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "9px 18px",
                  borderRadius: 10, border: `1px solid #00000010`, background: V4.white,
                  fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.darkGray, cursor: "pointer",
                }}>
                  {Icons.share({ size: 14 })} Compartilhar
                </button>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "9px 18px",
                  borderRadius: 10, border: "none", background: V4.gradientPrimary,
                  fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.white, cursor: "pointer",
                }}>
                  {Icons.link({ size: 14, color: V4.white })} Link Público
                </button>
              </div>
            </div>

            {/* Bio */}
            <p style={{
              fontFamily: FONT, fontSize: 15, color: V4.darkGray, lineHeight: 1.6,
              maxWidth: 700, marginBottom: 16,
            }}>
              {creator.bio}
            </p>

            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
              {[
                { icon: Icons.mapPin, text: creator.location },
                { icon: Icons.link, text: creator.website },
                { icon: Icons.calendar, text: `Membro desde ${creator.joinedAt}` },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, color: V4.gray }}>
                  {m.icon({ size: 14 })}
                  <span style={{ fontFamily: FONT, fontSize: 13 }}>{m.text}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {creator.tags.map((t) => (
                <span key={t} style={{
                  padding: "5px 14px", borderRadius: 6, background: V4.lightGray,
                  fontFamily: FONT, fontSize: 12, fontWeight: 600, color: V4.darkGray,
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Stats & Platforms Row ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
          {/* Performance Stats */}
          <div style={{
            background: V4.white, borderRadius: 16, padding: 24,
            border: `1px solid #00000006`, animation: "fadeUp 0.5s ease 0.1s both",
          }}>
            <h3 style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: V4.black, marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 12 }}>
              Performance
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Deals Concluídos", value: creator.stats.completedDeals, icon: Icons.deals },
                { label: "Total de Views", value: creator.stats.totalViews, icon: Icons.eye },
                { label: "Engajamento Médio", value: creator.stats.avgEngagement, icon: Icons.heart },
                { label: "Ganhos Totais", value: creator.stats.totalEarnings, icon: Icons.wallet },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: 16, borderRadius: 12, background: V4.sectionBg,
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: V4.white,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: V4.accent, flexShrink: 0,
                  }}>
                    {s.icon({ size: 18, color: V4.accent })}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray }}>{s.label}</div>
                    <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: V4.black, letterSpacing: "-0.02em" }}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reliability row */}
            <div style={{
              display: "flex", gap: 12, marginTop: 16, padding: "16px 0 0",
              borderTop: `1px solid ${V4.lightGray}`,
            }}>
              {[
                { label: "Avaliação Média", value: `${creator.stats.avgRating}/5`, extra: `(${creator.stats.totalRatings} reviews)` },
                { label: "Entregas no Prazo", value: creator.stats.onTimeRate },
                { label: "Tempo de Resposta", value: creator.stats.responseTime },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: V4.black }}>{s.value}</div>
                  {s.extra && <div style={{ fontFamily: FONT, fontSize: 10, color: V4.gray }}>{s.extra}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Connected Platforms */}
          <div style={{
            background: V4.white, borderRadius: 16, padding: 24,
            border: `1px solid #00000006`, animation: "fadeUp 0.5s ease 0.15s both",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: V4.black, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Plataformas Conectadas
              </h3>
              <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: V4.accent }}>
                {creator.totalFollowers} total
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {creator.platforms.map((p) => (
                <div key={p.name} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: 16,
                  borderRadius: 12, background: V4.sectionBg,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${p.color}12`, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 20, flexShrink: 0,
                  }}>{p.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{p.name}</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray }}>{p.handle}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: V4.black }}>{p.followers}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray }}>seguidores</div>
                  </div>
                  <span style={{
                    width: 10, height: 10, borderRadius: "50%", background: V4.success,
                    border: `2px solid ${V4.white}`, flexShrink: 0,
                  }} />
                </div>
              ))}
            </div>

            {/* Achievement badges */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${V4.lightGray}` }}>
              <h4 style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: V4.black, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                Conquistas
              </h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { emoji: "⚡", label: "Fast Responder" },
                  { emoji: "🎯", label: "Top Performer" },
                  { emoji: "🔥", label: "10+ Deals" },
                  { emoji: "⭐", label: "5-Star Creator" },
                  { emoji: "📈", label: "1M+ Views" },
                ].map((b) => (
                  <div key={b.label} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", borderRadius: 8, background: V4.sectionBg,
                    fontFamily: FONT, fontSize: 11, fontWeight: 600, color: V4.darkGray,
                  }}>
                    <span style={{ fontSize: 14 }}>{b.emoji}</span> {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: "9px 20px", borderRadius: 8, border: "none",
                background: activeTab === t.id ? V4.black : "transparent",
                color: activeTab === t.id ? V4.white : V4.gray,
                fontFamily: FONT, fontSize: 13, fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 6,
              }}>
                {t.label}
                <span style={{
                  padding: "1px 7px", borderRadius: 4, fontSize: 11,
                  background: activeTab === t.id ? "#ffffff20" : V4.lightGray,
                  color: activeTab === t.id ? V4.white : V4.gray,
                }}>{t.count}</span>
              </button>
            ))}
          </div>

          {activeTab === "portfolio" && (
            <div style={{ display: "flex", gap: 4 }}>
              {[{ id: "grid", icon: Icons.grid }, { id: "list", icon: Icons.list }].map((v) => (
                <button key={v.id} onClick={() => setViewMode(v.id)} style={{
                  width: 36, height: 36, borderRadius: 8, border: "none",
                  background: viewMode === v.id ? V4.lightGray : "transparent",
                  color: viewMode === v.id ? V4.black : V4.gray,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {v.icon({ size: 16 })}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── Portfolio Tab ─── */}
        {activeTab === "portfolio" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(300px, 1fr))" : "1fr",
            gap: viewMode === "grid" ? 16 : 10,
          }}>
            {PORTFOLIO.map((item, i) => (
              viewMode === "grid" ? (
                /* Grid Card */
                <div key={item.id} style={{
                  background: V4.white, borderRadius: 14, overflow: "hidden",
                  border: `1px solid #00000006`, cursor: "pointer",
                  transition: "all 0.3s ease", animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(86,3,3,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    height: 180, background: V4.gradientFooter, position: "relative",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 56 }}>{item.thumbnail}</span>
                    <div style={{
                      position: "absolute", top: 12, left: 12,
                    }}>
                      <PlatformPill name={item.platform} small />
                    </div>
                    <div style={{
                      position: "absolute", bottom: 12, right: 12,
                      background: "#00000060", backdropFilter: "blur(4px)",
                      borderRadius: 6, padding: "4px 10px",
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      {Icons.eye({ size: 12, color: V4.white })}
                      <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: V4.white }}>{item.views}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: 18 }}>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginBottom: 4, fontWeight: 500 }}>
                      {item.brand} · {item.date}
                    </div>
                    <h4 style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: V4.black, margin: "0 0 12px 0", lineHeight: 1.3 }}>
                      {item.title}
                    </h4>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        {Icons.heart({ size: 13, color: V4.gray })}
                        <span style={{ fontFamily: FONT, fontSize: 12, color: V4.gray }}>{item.likes}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        {Icons.trendUp({ size: 13, color: V4.success })}
                        <span style={{ fontFamily: FONT, fontSize: 12, color: V4.success, fontWeight: 600 }}>{item.engagement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* List Row */
                <div key={item.id} style={{
                  background: V4.white, borderRadius: 12, padding: "14px 20px",
                  border: `1px solid #00000006`, display: "flex",
                  alignItems: "center", gap: 16, cursor: "pointer",
                  transition: "background 0.2s", animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
                }}
                  onMouseEnter={(e) => e.currentTarget.style.background = V4.sectionBg}
                  onMouseLeave={(e) => e.currentTarget.style.background = V4.white}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 12, background: V4.gradientFooter,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, flexShrink: 0,
                  }}>{item.thumbnail}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{item.title}</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginTop: 2 }}>{item.brand} · {item.date}</div>
                  </div>
                  <PlatformPill name={item.platform} small />
                  <div style={{ textAlign: "right", minWidth: 70 }}>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{item.views}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray }}>views</div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 50 }}>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.success }}>{item.engagement}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray }}>eng.</div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* ─── Reviews Tab ─── */}
        {activeTab === "reviews" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Summary */}
            <div style={{
              background: V4.white, borderRadius: 16, padding: 28,
              border: `1px solid #00000006`, display: "flex",
              alignItems: "center", gap: 32, marginBottom: 8,
              animation: "fadeUp 0.4s ease both",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 700, color: V4.black, letterSpacing: "-0.03em" }}>
                  {creator.stats.avgRating}
                </div>
                <StarRating rating={Math.round(creator.stats.avgRating)} size={16} />
                <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginTop: 6 }}>
                  {creator.stats.totalRatings} avaliações
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                {[5, 4, 3, 2, 1].map((n) => {
                  const count = REVIEWS.filter((r) => r.rating === n).length;
                  const pct = (count / REVIEWS.length) * 100;
                  return (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, width: 12, textAlign: "right" }}>{n}</span>
                      <span style={{ color: "#f59e0b", fontSize: 12 }}>★</span>
                      <div style={{ flex: 1, height: 6, borderRadius: 3, background: V4.lightGray, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: "#f59e0b", transition: "width 0.6s ease" }} />
                      </div>
                      <span style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, width: 24 }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review Cards */}
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: V4.white, borderRadius: 14, padding: 24,
                border: `1px solid #00000006`,
                animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, background: V4.lightGray,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: FONT, fontSize: 13, fontWeight: 700, color: V4.darkGray,
                    }}>{r.brandAvatar}</div>
                    <div>
                      <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{r.brand}</div>
                      <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray }}>{r.date}</div>
                    </div>
                  </div>
                  <StarRating rating={r.rating} size={14} />
                </div>
                <p style={{ fontFamily: FONT, fontSize: 14, color: V4.darkGray, lineHeight: 1.6 }}>
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ─── History Tab ─── */}
        {activeTab === "history" && (
          <div style={{
            background: V4.white, borderRadius: 14, border: `1px solid #00000006`, overflow: "hidden",
            animation: "fadeUp 0.4s ease both",
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 100px",
              padding: "14px 24px", borderBottom: `1px solid ${V4.lightGray}`,
              fontFamily: FONT, fontSize: 11, fontWeight: 600, color: V4.gray,
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}>
              <span>Campanha</span><span>Data</span><span>Ganhos</span><span>Status</span>
            </div>
            {DEAL_HISTORY.map((d, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 100px",
                padding: "16px 24px", borderBottom: `1px solid #00000004`,
                alignItems: "center", animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
              }}>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{d.title}</div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginTop: 2 }}>{d.brand}</div>
                </div>
                <span style={{ fontFamily: FONT, fontSize: 13, color: V4.gray }}>{d.date}</span>
                <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: d.earnings === "—" ? V4.gray : V4.black }}>
                  {d.earnings}
                </span>
                <StatusBadge status={d.status} />
              </div>
            ))}

            {/* Total */}
            <div style={{
              display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 100px",
              padding: "16px 24px", background: V4.sectionBg,
            }}>
              <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: V4.black }}>Total acumulado</span>
              <span />
              <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: V4.accent }}>{creator.stats.totalEarnings}</span>
              <span />
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {showEditModal && (
        <EditProfileModal
          creator={creator}
          onClose={() => setShowEditModal(false)}
          onSave={(form) => {
            setCreator((prev) => ({ ...prev, ...form }));
            setShowEditModal(false);
            showToast("Perfil atualizado com sucesso!");
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
          background: V4.black, color: V4.white, fontFamily: FONT, fontSize: 14,
          fontWeight: 600, padding: "14px 28px", borderRadius: 12,
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          animation: "toastIn 0.3s cubic-bezier(.22,1,.36,1)", zIndex: 2000,
        }}>
          <span style={{
            width: 22, height: 22, borderRadius: "50%", background: V4.success,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{Icons.check({ size: 13, color: V4.white })}</span>
          {toast}
        </div>
      )}
    </div>
  );
}
