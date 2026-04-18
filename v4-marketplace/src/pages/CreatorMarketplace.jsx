import { useState, useEffect, useRef } from "react";

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
  gradientRadial: "radial-gradient(circle, #FB2E0A, #560303)",
  gradientFooter: "linear-gradient(135deg, #3D0202, #560303)",
  accent: "#FB2E0A",
  accentDark: "#560303",
};

const FONT = `'IBM Plex Sans', -apple-system, sans-serif`;

/* ─── Mock Data ─── */
const DEALS = [
  {
    id: 1,
    brand: "Feastables",
    logo: "🍫",
    title: "Lançamento Feastables Dark Chocolate",
    category: "Food & Beverage",
    budget: "R$ 5.000",
    cpm: "R$ 18",
    deadline: "28 Abr 2026",
    slots: 12,
    slotsUsed: 7,
    platforms: ["TikTok", "Reels", "Shorts"],
    description: "Crie conteúdo autêntico mostrando o novo sabor Dark Chocolate. Vídeos de 30-60s com reação genuína.",
    status: "active",
    verified: true,
  },
  {
    id: 2,
    brand: "Nubank",
    logo: "💜",
    title: "Campanha NuCripto — Educação Financeira",
    category: "Fintech",
    budget: "R$ 8.500",
    cpm: "R$ 24",
    deadline: "15 Mai 2026",
    slots: 20,
    slotsUsed: 3,
    platforms: ["TikTok", "Reels"],
    description: "Explique de forma simples como investir em cripto pelo Nubank. Foco em Gen Z, tom descontraído.",
    status: "active",
    verified: true,
  },
  {
    id: 3,
    brand: "Insider Store",
    logo: "👕",
    title: "Review Tech T-Shirt Anti-odor",
    category: "Fashion & Tech",
    budget: "R$ 3.200",
    cpm: "R$ 15",
    deadline: "10 Mai 2026",
    slots: 8,
    slotsUsed: 8,
    platforms: ["Reels", "Shorts"],
    description: "Teste real da camiseta anti-odor em atividades do dia a dia. Mostre before/after.",
    status: "filled",
    verified: true,
  },
  {
    id: 4,
    brand: "iFood",
    logo: "🍕",
    title: "iFood Benefícios — Campanha Corporativa",
    category: "Food & Tech",
    budget: "R$ 12.000",
    cpm: "R$ 30",
    deadline: "20 Mai 2026",
    slots: 15,
    slotsUsed: 4,
    platforms: ["TikTok", "Reels", "Shorts", "LinkedIn"],
    description: "Mostre como o iFood Benefícios transforma o dia a dia no trabalho. Tom profissional mas humano.",
    status: "active",
    verified: true,
  },
  {
    id: 5,
    brand: "Havaianas",
    logo: "🩴",
    title: "Coleção Outono — Street Style",
    category: "Fashion",
    budget: "R$ 4.500",
    cpm: "R$ 20",
    deadline: "05 Mai 2026",
    slots: 10,
    slotsUsed: 6,
    platforms: ["TikTok", "Reels"],
    description: "OOTD com Havaianas da nova coleção. Estilo urbano, autêntico, sem script.",
    status: "active",
    verified: true,
  },
  {
    id: 6,
    brand: "Amazon BR",
    logo: "📦",
    title: "Prime Day Unboxing Marathon",
    category: "E-commerce",
    budget: "R$ 6.800",
    cpm: "R$ 22",
    deadline: "01 Mai 2026",
    slots: 25,
    slotsUsed: 18,
    platforms: ["TikTok", "Reels", "Shorts"],
    description: "Unboxing de produtos Prime Day. Reação genuína, mostre o melhor custo-benefício.",
    status: "active",
    verified: false,
  },
];

const STATS = [
  { label: "Deals Ativos", value: "47", change: "+12%", up: true },
  { label: "Ganhos do Mês", value: "R$ 4.820", change: "+23%", up: true },
  { label: "Visualizações", value: "1.2M", change: "+8%", up: true },
  { label: "Taxa de Aceite", value: "89%", change: "-2%", up: false },
];

/* ─── Icons as SVG components ─── */
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
    ),
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
    deals: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
    ),
    stats: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
    ),
    wallet: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><path d="M1 10h22"/></svg>
    ),
    profile: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
    ),
    arrow: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    ),
    bell: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    ),
    fire: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
    ),
    filter: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
    ),
    clock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    ),
  };
  return icons[name] || null;
};

/* ─── Platform Badge ─── */
const PlatformBadge = ({ name }) => {
  const colors = {
    TikTok: { bg: "#00000015", text: V4.black },
    Reels: { bg: "#E1306C15", text: "#E1306C" },
    Shorts: { bg: "#FF000015", text: "#FF0000" },
    LinkedIn: { bg: "#0077B515", text: "#0077B5" },
  };
  const c = colors[name] || { bg: V4.lightGray, text: V4.gray };
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: FONT,
      background: c.bg,
      color: c.text,
      letterSpacing: "0.02em",
    }}>
      {name}
    </span>
  );
};

/* ─── Progress Bar ─── */
const ProgressBar = ({ used, total }) => {
  const pct = Math.round((used / total) * 100);
  const full = pct >= 100;
  return (
    <div style={{ width: "100%", height: 4, borderRadius: 2, background: V4.lightGray, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min(pct, 100)}%`,
        height: "100%",
        borderRadius: 2,
        background: full ? V4.gray : V4.gradientPrimary,
        transition: "width 0.6s cubic-bezier(.22,1,.36,1)",
      }} />
    </div>
  );
};

/* ─── Deal Card ─── */
const DealCard = ({ deal, index, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const isFilled = deal.status === "filled";
  const slotsLeft = deal.slots - deal.slotsUsed;

  return (
    <div
      onClick={() => onClick(deal)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: V4.white,
        borderRadius: 12,
        padding: 24,
        cursor: "pointer",
        border: `1px solid ${hovered ? "#FB2E0A30" : "#00000008"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 40px rgba(86, 3, 3, 0.08)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        opacity: isFilled ? 0.6 : 1,
        animation: `fadeUp 0.5s ease ${index * 0.07}s both`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hot badge */}
      {deal.cpm === "R$ 30" && (
        <div style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: V4.gradientPrimary,
          color: V4.white,
          fontSize: 10,
          fontWeight: 700,
          padding: "3px 8px",
          borderRadius: 4,
          fontFamily: FONT,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}>
          <Icon name="fire" size={10} color={V4.white} /> TOP DEAL
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: V4.lightGray,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}>
          {deal.logo}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: 600,
              color: V4.black,
            }}>
              {deal.brand}
            </span>
            {deal.verified && (
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: V4.gradientPrimary,
              }}>
                <Icon name="check" size={10} color={V4.white} />
              </span>
            )}
          </div>
          <span style={{
            fontFamily: FONT,
            fontSize: 11,
            color: V4.gray,
            fontWeight: 500,
          }}>
            {deal.category}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: FONT,
        fontSize: 16,
        fontWeight: 600,
        color: V4.black,
        margin: "0 0 8px 0",
        lineHeight: 1.3,
      }}>
        {deal.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: FONT,
        fontSize: 13,
        color: V4.gray,
        lineHeight: 1.5,
        margin: "0 0 16px 0",
      }}>
        {deal.description}
      </p>

      {/* Platforms */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {deal.platforms.map((p) => <PlatformBadge key={p} name={p} />)}
      </div>

      {/* Stats row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8,
        padding: "12px 0",
        borderTop: `1px solid ${V4.lightGray}`,
        marginBottom: 12,
      }}>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray, marginBottom: 2 }}>Budget</div>
          <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{deal.budget}</div>
        </div>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray, marginBottom: 2 }}>CPM</div>
          <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.accent }}>{deal.cpm}</div>
        </div>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray, marginBottom: 2 }}>Prazo</div>
          <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{deal.deadline}</div>
        </div>
      </div>

      {/* Slots progress */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: FONT, fontSize: 11, color: V4.gray }}>
            {isFilled ? "Vagas esgotadas" : `${slotsLeft} vagas restantes`}
          </span>
          <span style={{ fontFamily: FONT, fontSize: 11, color: V4.gray }}>
            {deal.slotsUsed}/{deal.slots}
          </span>
        </div>
        <ProgressBar used={deal.slotsUsed} total={deal.slots} />
      </div>
    </div>
  );
};

/* ─── Stat Card ─── */
const StatCard = ({ stat, index }) => (
  <div style={{
    background: V4.white,
    borderRadius: 12,
    padding: "20px 24px",
    border: `1px solid #00000006`,
    animation: `fadeUp 0.5s ease ${index * 0.1}s both`,
  }}>
    <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginBottom: 8, fontWeight: 500 }}>
      {stat.label}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <span style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: V4.black, letterSpacing: "-0.02em" }}>
        {stat.value}
      </span>
      <span style={{
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: 600,
        color: stat.up ? "#16a34a" : V4.accent,
        background: stat.up ? "#16a34a12" : "#FB2E0A12",
        padding: "2px 8px",
        borderRadius: 4,
      }}>
        {stat.change}
      </span>
    </div>
  </div>
);

/* ─── Deal Detail Modal ─── */
const DealModal = ({ deal, onClose }) => {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  if (!deal) return null;
  const isFilled = deal.status === "filled";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5,5,5,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: V4.white,
          borderRadius: 16,
          width: "100%",
          maxWidth: 560,
          maxHeight: "85vh",
          overflow: "auto",
          animation: "slideUp 0.3s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Modal header */}
        <div style={{
          padding: "28px 28px 0 28px",
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: V4.lightGray,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0,
          }}>
            {deal.logo}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600 }}>{deal.brand}</span>
              {deal.verified && (
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 18, height: 18, borderRadius: "50%", background: V4.gradientPrimary,
                }}>
                  <Icon name="check" size={11} color={V4.white} />
                </span>
              )}
            </div>
            <span style={{ fontFamily: FONT, fontSize: 12, color: V4.gray }}>{deal.category}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: V4.lightGray, border: "none", borderRadius: 8,
              width: 36, height: 36, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: V4.gray, fontFamily: FONT,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 28 }}>
          <h2 style={{
            fontFamily: FONT, fontSize: 22, fontWeight: 700,
            color: V4.black, margin: "0 0 12px 0", lineHeight: 1.3,
          }}>
            {deal.title}
          </h2>
          <p style={{
            fontFamily: FONT, fontSize: 15, color: V4.gray,
            lineHeight: 1.6, margin: "0 0 24px 0",
          }}>
            {deal.description}
          </p>

          {/* Platforms */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: V4.black, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Plataformas
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {deal.platforms.map((p) => <PlatformBadge key={p} name={p} />)}
            </div>
          </div>

          {/* Details grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 16, marginBottom: 24,
            padding: 20, background: V4.sectionBg, borderRadius: 12,
          }}>
            {[
              { label: "Budget Total", value: deal.budget },
              { label: "CPM", value: deal.cpm },
              { label: "Prazo Final", value: deal.deadline },
              { label: "Vagas", value: `${deal.slotsUsed}/${deal.slots} preenchidas` },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: V4.black }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: V4.black, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Requisitos
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Mínimo 1.000 seguidores verificados", "Conteúdo original, sem uso de IA generativa", "Postar dentro de 48h após aprovação", "Manter post por no mínimo 30 dias"].map((req) => (
                <div key={req} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: V4.accent, flexShrink: 0 }}><Icon name="check" size={14} color={V4.accent} /></span>
                  <span style={{ fontFamily: FONT, fontSize: 13, color: V4.darkGray }}>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apply button */}
          <button
            disabled={isFilled || applied}
            onClick={() => {
              setApplying(true);
              setTimeout(() => { setApplying(false); setApplied(true); }, 1200);
            }}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 10,
              border: "none",
              background: applied ? "#16a34a" : isFilled ? V4.gray : V4.gradientPrimary,
              color: V4.white,
              fontFamily: FONT,
              fontSize: 15,
              fontWeight: 600,
              cursor: isFilled || applied ? "default" : "pointer",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              letterSpacing: "0.01em",
            }}
          >
            {applying ? "Enviando candidatura..." : applied ? "✓ Candidatura enviada!" : isFilled ? "Vagas esgotadas" : "Candidatar-se ao deal"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main App ─── */
export default function CreatorMarketplace() {
  const [activeNav, setActiveNav] = useState("deals");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ["Todos", "Food & Beverage", "Fintech", "Fashion & Tech", "Fashion", "Food & Tech", "E-commerce"];

  const filteredDeals = DEALS.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "Todos" || d.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const navItems = [
    { id: "home", icon: "home", label: "Início" },
    { id: "deals", icon: "deals", label: "Deals" },
    { id: "stats", icon: "stats", label: "Analytics" },
    { id: "wallet", icon: "wallet", label: "Carteira" },
    { id: "profile", icon: "profile", label: "Perfil" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: V4.sectionBg, fontFamily: FONT }}>
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Global keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
        input:focus, button:focus { outline: none; }
      `}</style>

      {/* ─── Sidebar (desktop) ─── */}
      <nav style={{
        position: "fixed",
        left: 0, top: 0, bottom: 0,
        width: 240,
        background: V4.black,
        display: "flex",
        flexDirection: "column",
        padding: "28px 16px",
        zIndex: 100,
        transition: "transform 0.3s ease",
      }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 12px",
          marginBottom: 36,
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: V4.gradientPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ color: V4.white, fontSize: 16, fontWeight: 800, fontFamily: FONT }}>V4</span>
          </div>
          <span style={{
            fontFamily: FONT,
            fontSize: 18,
            fontWeight: 700,
            color: V4.white,
            letterSpacing: "-0.02em",
          }}>
            Creators
          </span>
        </div>

        {/* Nav items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => {
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: active ? "#ffffff12" : "transparent",
                  color: active ? V4.white : "#ffffff60",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  textAlign: "left",
                }}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Bottom section */}
        <div style={{ marginTop: "auto" }}>
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: "#ffffff08",
            marginBottom: 16,
          }}>
            <div style={{
              fontFamily: FONT, fontSize: 12, color: "#ffffff80", marginBottom: 8,
            }}>
              Status do Criador
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }} />
              <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.white }}>
                Verificado
              </span>
            </div>
          </div>

          <button style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 12px",
            borderRadius: 8,
            border: "none",
            background: "transparent",
            color: "#ffffff50",
            cursor: "pointer",
            fontFamily: FONT,
            fontSize: 13,
            width: "100%",
            textAlign: "left",
          }}>
            <Icon name="settings" size={16} />
            Configurações
          </button>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main style={{
        marginLeft: 240,
        minHeight: "100vh",
        padding: "0 40px 60px 40px",
      }}>
        {/* Top bar */}
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 0",
          gap: 20,
        }}>
          <div>
            <h1 style={{
              fontFamily: FONT,
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 700,
              color: V4.black,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}>
              Deals Disponíveis
            </h1>
            <p style={{
              fontFamily: FONT,
              fontSize: 14,
              color: V4.gray,
              marginTop: 4,
            }}>
              Encontre campanhas de marcas e ganhe com seu conteúdo
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Notifications */}
            <button style={{
              position: "relative",
              width: 40, height: 40,
              borderRadius: 10,
              border: `1px solid #00000008`,
              background: V4.white,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: V4.gray,
            }}>
              <Icon name="bell" size={18} />
              <span style={{
                position: "absolute",
                top: 8, right: 8,
                width: 7, height: 7,
                borderRadius: "50%",
                background: V4.accent,
              }} />
            </button>

            {/* Avatar */}
            <div style={{
              width: 40, height: 40,
              borderRadius: 10,
              background: V4.gradientSubtle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: V4.white,
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 700,
            }}>
              JD
            </div>
          </div>
        </header>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}>
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Search & Filter bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
        }}>
          {/* Search */}
          <div style={{
            flex: "1 1 280px",
            position: "relative",
          }}>
            <span style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: V4.gray,
            }}>
              <Icon name="search" size={16} />
            </span>
            <input
              type="text"
              placeholder="Buscar deals, marcas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 16px 11px 40px",
                borderRadius: 10,
                border: `1px solid #00000010`,
                background: V4.white,
                fontFamily: FONT,
                fontSize: 14,
                color: V4.black,
                transition: "border-color 0.2s",
              }}
            />
          </div>

          {/* Category pills */}
          <div style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: active ? "none" : `1px solid #00000010`,
                    background: active ? V4.black : V4.white,
                    color: active ? V4.white : V4.gray,
                    fontFamily: FONT,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Deals grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
        }}>
          {filteredDeals.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} index={i} onClick={setSelectedDeal} />
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            animation: "fadeIn 0.5s ease",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: V4.black, marginBottom: 6 }}>
              Nenhum deal encontrado
            </p>
            <p style={{ fontFamily: FONT, fontSize: 14, color: V4.gray }}>
              Tente ajustar os filtros ou buscar outro termo
            </p>
          </div>
        )}

        {/* CTA Banner */}
        <div style={{
          marginTop: 40,
          padding: "36px 40px",
          borderRadius: 16,
          background: V4.gradientFooter,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          animation: "fadeUp 0.5s ease 0.4s both",
        }}>
          <div>
            <h3 style={{
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 700,
              color: V4.white,
              marginBottom: 6,
            }}>
              É uma marca? Publique seus deals aqui.
            </h3>
            <p style={{
              fontFamily: FONT,
              fontSize: 14,
              color: "#ffffffa0",
              maxWidth: 500,
            }}>
              Conecte-se com milhares de criadores verificados e escale suas campanhas de conteúdo.
            </p>
          </div>
          <button style={{
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid #ffffff30`,
            background: "transparent",
            color: V4.white,
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
          }}>
            Criar conta de marca →
          </button>
        </div>
      </main>

      {/* Modal */}
      {selectedDeal && <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}
    </div>
  );
}
