import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ── V4 Design Tokens ──
const T = {
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
  gradRadial: "radial-gradient(circle, #FB2E0A, #560303)",
  font: "'IBM Plex Sans', sans-serif",
  maxW: 1720,
  sidebar: 240,
  radius: 12,
  radiusLg: 16,
  ease: "cubic-bezier(.22,1,.36,1)",
};

// ── Mock Data ──
const revenueData = [
  { month: "Jan", receita: 2400, deals: 3 },
  { month: "Fev", receita: 4200, deals: 5 },
  { month: "Mar", receita: 3800, deals: 4 },
  { month: "Abr", receita: 6100, deals: 7 },
  { month: "Mai", receita: 5300, deals: 6 },
  { month: "Jun", receita: 7800, deals: 9 },
  { month: "Jul", receita: 6900, deals: 8 },
  { month: "Ago", receita: 9200, deals: 11 },
  { month: "Set", receita: 8400, deals: 10 },
  { month: "Out", receita: 11500, deals: 13 },
  { month: "Nov", receita: 10200, deals: 12 },
  { month: "Dez", receita: 13800, deals: 15 },
];

const platformData = [
  { platform: "TikTok", views: 284000, engajamento: 5.2 },
  { platform: "Reels", views: 196000, engajamento: 4.8 },
  { platform: "Shorts", views: 142000, engajamento: 3.9 },
  { platform: "LinkedIn", views: 38000, engajamento: 7.1 },
];

const categoryData = [
  { name: "Tech", value: 35, color: "#FB2E0A" },
  { name: "Moda", value: 22, color: "#560303" },
  { name: "Fitness", value: 18, color: "#C41E08" },
  { name: "Food", value: 15, color: "#8B1A1A" },
  { name: "Outros", value: 10, color: "#3D0202" },
];

const weeklyEngagement = [
  { dia: "Seg", taxa: 4.2, views: 12400 },
  { dia: "Ter", taxa: 5.1, views: 15200 },
  { dia: "Qua", taxa: 4.8, views: 14100 },
  { dia: "Qui", taxa: 6.3, views: 18900 },
  { dia: "Sex", taxa: 7.1, views: 22300 },
  { dia: "Sáb", taxa: 8.4, views: 28100 },
  { dia: "Dom", taxa: 7.8, views: 25600 },
];

const topDeals = [
  { marca: "Nike", campanha: "Summer Drop 2026", receita: 4200, views: 89000, cpm: 47.19, status: "concluido" },
  { marca: "Spotify", campanha: "Wrapped Creators", receita: 3800, views: 124000, cpm: 30.65, status: "concluido" },
  { marca: "Samsung", campanha: "Galaxy AI Launch", receita: 5100, views: 156000, cpm: 32.69, status: "ativo" },
  { marca: "Nubank", campanha: "Roxinho Challenge", receita: 2900, views: 67000, cpm: 43.28, status: "concluido" },
  { marca: "iFood", campanha: "Chef em Casa", receita: 1800, views: 43000, cpm: 41.86, status: "ativo" },
];

const monthlyComparison = [
  { month: "Jul", atual: 6900, anterior: 5100 },
  { month: "Ago", atual: 9200, anterior: 6400 },
  { month: "Set", atual: 8400, anterior: 7200 },
  { month: "Out", atual: 11500, anterior: 8800 },
  { month: "Nov", atual: 10200, anterior: 9100 },
  { month: "Dez", atual: 13800, anterior: 10500 },
];

// ── Helpers ──
const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K" : n.toString();
const fmtBRL = (n) => "R$ " + n.toLocaleString("pt-BR");

// ── Custom Tooltip ──
const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: T.darkGray,
      border: "none",
      borderRadius: 8,
      padding: "10px 14px",
      boxShadow: "0 8px 24px rgba(0,0,0,.25)",
    }}>
      <p style={{ color: T.lightGray, fontSize: 11, margin: 0, marginBottom: 6, fontFamily: T.font, fontWeight: 500 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || T.accent, fontSize: 13, margin: 0, fontFamily: T.font, fontWeight: 600 }}>
          {p.name}: {formatter ? formatter(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

// ── Sidebar Icons (inline SVG) ──
const Icons = {
  analytics: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
    </svg>
  ),
  deals: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3h-8l-2 4h12z"/>
    </svg>
  ),
  wallet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/><circle cx="18" cy="15" r="1"/>
    </svg>
  ),
  profile: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  trend: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  trendDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  download: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
};

// ── Main Component ──
export default function AnalyticsV4() {
  const [period, setPeriod] = useState("12m");
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [sidebarNav, setSidebarNav] = useState("analytics");
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const periods = [
    { key: "7d", label: "7 dias" },
    { key: "30d", label: "30 dias" },
    { key: "90d", label: "90 dias" },
    { key: "12m", label: "12 meses" },
  ];

  const tabs = [
    { key: "visao-geral", label: "Visão Geral" },
    { key: "receita", label: "Receita" },
    { key: "engajamento", label: "Engajamento" },
    { key: "plataformas", label: "Plataformas" },
  ];

  const kpis = [
    { label: "Receita Total", value: "R$ 91.600", change: "+32%", up: true, sub: "vs. período anterior" },
    { label: "Views Totais", value: "660K", change: "+18%", up: true, sub: "todas as plataformas" },
    { label: "Engajamento Médio", value: "5.4%", change: "+0.8%", up: true, sub: "média ponderada" },
    { label: "Deals Concluídos", value: "103", change: "-2", up: false, sub: "no período" },
  ];

  const navItems = [
    { key: "deals", label: "Deals", icon: Icons.deals },
    { key: "analytics", label: "Analytics", icon: Icons.analytics },
    { key: "wallet", label: "Carteira", icon: Icons.wallet },
    { key: "profile", label: "Perfil", icon: Icons.profile },
    { key: "settings", label: "Configurações", icon: Icons.settings },
  ];

  const anim = (delay) => ({
    opacity: animReady ? 1 : 0,
    transform: animReady ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.6s ${T.ease} ${delay}s`,
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.sectionBg, fontFamily: T.font }}>
      {/* ── Google Font ── */}
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.gray}40; border-radius: 3px; }
        .recharts-cartesian-grid-horizontal line,
        .recharts-cartesian-grid-vertical line { stroke: ${T.lightGray} !important; }
      `}</style>

      {/* ══════ SIDEBAR ══════ */}
      <aside style={{
        width: T.sidebar,
        background: T.darkGray,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${T.gray}30` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: T.gradPrimary,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 16, color: T.white,
            }}>V4</div>
            <div>
              <div style={{ color: T.white, fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>Creators</div>
              <div style={{ color: T.gray, fontSize: 11, fontWeight: 500 }}>MARKETPLACE</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {navItems.map((item) => (
            <button key={item.key} onClick={() => setSidebarNav(item.key)} style={{
              display: "flex", alignItems: "center", gap: 12,
              width: "100%", padding: "11px 14px", marginBottom: 4,
              background: sidebarNav === item.key ? `${T.accent}18` : "transparent",
              border: "none", borderRadius: 10, cursor: "pointer",
              color: sidebarNav === item.key ? T.accent : T.gray,
              fontSize: 14, fontWeight: sidebarNav === item.key ? 600 : 400,
              fontFamily: T.font,
              transition: "all 0.3s ease",
            }}>
              {item.icon}
              {item.label}
              {item.key === "analytics" && (
                <span style={{
                  marginLeft: "auto", fontSize: 10, fontWeight: 700,
                  background: T.gradPrimary, color: T.white,
                  padding: "2px 8px", borderRadius: 20,
                }}>NOVO</span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: "16px 16px 24px", borderTop: `1px solid ${T.gray}30` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: T.gradSubtle,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: T.white, fontWeight: 700, fontSize: 14,
            }}>RS</div>
            <div>
              <div style={{ color: T.white, fontSize: 13, fontWeight: 600 }}>Rafael Silva</div>
              <div style={{ color: T.gray, fontSize: 11 }}>Criador Verificado ✓</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════ MAIN CONTENT ══════ */}
      <main style={{ marginLeft: T.sidebar, flex: 1, padding: "32px 40px", maxWidth: T.maxW }}>
        {/* ── Header ── */}
        <div style={{ ...anim(0), display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: T.black, letterSpacing: "-0.03em", marginBottom: 4 }}>
              Analytics
            </h1>
            <p style={{ fontSize: 14, color: T.gray, fontWeight: 400 }}>
              Acompanhe o desempenho dos seus deals e conteúdos
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 16px", borderRadius: 10, border: `1px solid ${T.lightGray}`,
              background: T.white, color: T.darkGray, fontSize: 13, fontWeight: 500,
              cursor: "pointer", fontFamily: T.font,
            }}>
              {Icons.calendar}
              Jan 2026 — Dez 2026
            </button>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 16px", borderRadius: 10, border: "none",
              background: T.darkGray, color: T.white, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: T.font,
            }}>
              {Icons.download}
              Exportar
            </button>
          </div>
        </div>

        {/* ── Period Selector ── */}
        <div style={{ ...anim(0.05), display: "flex", gap: 4, marginBottom: 28, background: T.white, borderRadius: 10, padding: 4, width: "fit-content", border: `1px solid ${T.lightGray}` }}>
          {periods.map((p) => (
            <button key={p.key} onClick={() => setPeriod(p.key)} style={{
              padding: "8px 18px", borderRadius: 8, border: "none",
              background: period === p.key ? T.darkGray : "transparent",
              color: period === p.key ? T.white : T.gray,
              fontSize: 13, fontWeight: period === p.key ? 600 : 500,
              cursor: "pointer", fontFamily: T.font,
              transition: "all 0.3s ease",
            }}>{p.label}</button>
          ))}
        </div>

        {/* ── KPI Cards ── */}
        <div style={{ ...anim(0.1), display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {kpis.map((kpi, i) => (
            <div key={i} style={{
              background: T.white,
              borderRadius: T.radius,
              padding: "22px 24px",
              border: `1px solid ${T.lightGray}`,
              transition: "all 0.3s ease",
            }}>
              <div style={{ fontSize: 12, color: T.gray, fontWeight: 500, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {kpi.label}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: T.black, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {kpi.value}
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 3,
                  fontSize: 12, fontWeight: 600,
                  color: kpi.up ? "#16a34a" : T.accent,
                  background: kpi.up ? "#16a34a14" : `${T.accent}14`,
                  padding: "3px 8px", borderRadius: 20,
                  marginBottom: 2,
                }}>
                  {kpi.up ? Icons.trend : Icons.trendDown}
                  {kpi.change}
                </span>
              </div>
              <div style={{ fontSize: 11, color: T.gray, fontWeight: 400 }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{ ...anim(0.15), display: "flex", gap: 0, marginBottom: 28, borderBottom: `2px solid ${T.lightGray}` }}>
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: "12px 24px",
              border: "none",
              borderBottom: activeTab === tab.key ? `2px solid ${T.accent}` : "2px solid transparent",
              background: "transparent",
              color: activeTab === tab.key ? T.accent : T.gray,
              fontSize: 14,
              fontWeight: activeTab === tab.key ? 600 : 500,
              cursor: "pointer",
              fontFamily: T.font,
              marginBottom: -2,
              transition: "all 0.3s ease",
            }}>{tab.label}</button>
          ))}
        </div>

        {/* ══════ TAB: VISÃO GERAL ══════ */}
        {activeTab === "visao-geral" && (
          <div style={anim(0.2)}>
            {/* Row 1: Revenue + Category */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
              {/* Revenue Chart */}
              <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: "24px 28px",
                border: `1px solid ${T.lightGray}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: T.black, marginBottom: 2 }}>Receita Mensal</h3>
                    <p style={{ fontSize: 12, color: T.gray }}>Evolução de ganhos ao longo do ano</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: T.black }}>R$ 91.600</div>
                    <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>+32% vs. ano anterior</div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={T.accent} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={T.accent} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${T.lightGray}`} vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip content={<CustomTooltip formatter={fmtBRL} />} />
                    <Area type="monotone" dataKey="receita" stroke={T.accent} strokeWidth={2.5} fill="url(#gRev)" name="Receita" dot={false} activeDot={{ r: 5, fill: T.accent, stroke: T.white, strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Category Pie */}
              <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: "24px 28px",
                border: `1px solid ${T.lightGray}`,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: T.black, marginBottom: 2 }}>Por Categoria</h3>
                <p style={{ fontSize: 12, color: T.gray, marginBottom: 16 }}>Distribuição de deals</p>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value" stroke="none">
                      {categoryData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip formatter={(v) => v + "%"} />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                  {categoryData.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                        <span style={{ fontSize: 12, color: T.darkGray, fontWeight: 500 }}>{c.name}</span>
                      </div>
                      <span style={{ fontSize: 12, color: T.gray, fontWeight: 600 }}>{c.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Platform Bars + Engagement Line */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              {/* Platform Views */}
              <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: "24px 28px",
                border: `1px solid ${T.lightGray}`,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: T.black, marginBottom: 2 }}>Views por Plataforma</h3>
                <p style={{ fontSize: 12, color: T.gray, marginBottom: 20 }}>Performance em cada canal</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={platformData} barSize={40}>
                    <defs>
                      <linearGradient id="gBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={T.accent} />
                        <stop offset="100%" stopColor={T.accentDark} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.lightGray} vertical={false} />
                    <XAxis dataKey="platform" tick={{ fontSize: 12, fill: T.darkGray, fontFamily: T.font, fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                    <Tooltip content={<CustomTooltip formatter={fmt} />} />
                    <Bar dataKey="views" fill="url(#gBar)" radius={[6, 6, 0, 0]} name="Views" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Weekly Engagement */}
              <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: "24px 28px",
                border: `1px solid ${T.lightGray}`,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: T.black, marginBottom: 2 }}>Engajamento Semanal</h3>
                <p style={{ fontSize: 12, color: T.gray, marginBottom: 20 }}>Taxa média por dia da semana</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={weeklyEngagement}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.lightGray} vertical={false} />
                    <XAxis dataKey="dia" tick={{ fontSize: 12, fill: T.darkGray, fontFamily: T.font, fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={(v) => v + "%"} domain={[0, 10]} />
                    <Tooltip content={<CustomTooltip formatter={(v) => v + "%"} />} />
                    <Line type="monotone" dataKey="taxa" stroke={T.accent} strokeWidth={2.5} name="Engajamento" dot={{ r: 4, fill: T.white, stroke: T.accent, strokeWidth: 2 }} activeDot={{ r: 6, fill: T.accent, stroke: T.white, strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 3: Comparison + Top Deals */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
              {/* YoY Comparison */}
              <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: "24px 28px",
                border: `1px solid ${T.lightGray}`,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: T.black, marginBottom: 2 }}>Comparativo Anual</h3>
                <p style={{ fontSize: 12, color: T.gray, marginBottom: 20 }}>Receita atual vs. ano anterior</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyComparison} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.lightGray} vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip content={<CustomTooltip formatter={fmtBRL} />} />
                    <Bar dataKey="anterior" fill={`${T.gray}30`} radius={[4, 4, 0, 0]} barSize={20} name="Ano Anterior" />
                    <Bar dataKey="atual" fill={T.accent} radius={[4, 4, 0, 0]} barSize={20} name="Ano Atual" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top Deals */}
              <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: "24px 28px",
                border: `1px solid ${T.lightGray}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: T.black, marginBottom: 2 }}>Top Deals</h3>
                    <p style={{ fontSize: 12, color: T.gray }}>Melhores campanhas por receita</p>
                  </div>
                  <button style={{
                    fontSize: 12, fontWeight: 600, color: T.accent,
                    background: "transparent", border: "none", cursor: "pointer", fontFamily: T.font,
                  }}>Ver todos →</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Marca", "Campanha", "Receita", "Views", "CPM", "Status"].map((h) => (
                          <th key={h} style={{
                            textAlign: "left", padding: "10px 12px", fontSize: 11, fontWeight: 600,
                            color: T.gray, textTransform: "uppercase", letterSpacing: "0.04em",
                            borderBottom: `1px solid ${T.lightGray}`,
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {topDeals.map((deal, i) => (
                        <tr key={i} style={{ transition: "all 0.2s ease" }}>
                          <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: T.black, borderBottom: `1px solid ${T.lightGray}` }}>
                            {deal.marca}
                          </td>
                          <td style={{ padding: "12px 12px", fontSize: 13, color: T.darkGray, borderBottom: `1px solid ${T.lightGray}`, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {deal.campanha}
                          </td>
                          <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: T.black, borderBottom: `1px solid ${T.lightGray}` }}>
                            {fmtBRL(deal.receita)}
                          </td>
                          <td style={{ padding: "12px 12px", fontSize: 13, color: T.darkGray, borderBottom: `1px solid ${T.lightGray}` }}>
                            {fmt(deal.views)}
                          </td>
                          <td style={{ padding: "12px 12px", fontSize: 13, color: T.darkGray, borderBottom: `1px solid ${T.lightGray}` }}>
                            R$ {deal.cpm.toFixed(2)}
                          </td>
                          <td style={{ padding: "12px 12px", borderBottom: `1px solid ${T.lightGray}` }}>
                            <span style={{
                              display: "inline-block", padding: "4px 10px", borderRadius: 20,
                              fontSize: 11, fontWeight: 600,
                              background: deal.status === "ativo" ? `${T.accent}14` : "#16a34a14",
                              color: deal.status === "ativo" ? T.accent : "#16a34a",
                            }}>
                              {deal.status === "ativo" ? "Ativo" : "Concluído"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════ TAB: RECEITA ══════ */}
        {activeTab === "receita" && (
          <div style={anim(0.15)}>
            <div style={{
              background: T.white, borderRadius: T.radiusLg, padding: "28px 32px",
              border: `1px solid ${T.lightGray}`, marginBottom: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: T.black }}>Evolução de Receita</h3>
                  <p style={{ fontSize: 13, color: T.gray }}>Receita mensal e número de deals fechados</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="gRev2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={T.accent} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={T.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.lightGray} vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v / 1000}K`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip formatter={fmtBRL} />} />
                  <Area yAxisId="left" type="monotone" dataKey="receita" stroke={T.accent} strokeWidth={2.5} fill="url(#gRev2)" name="Receita" dot={false} activeDot={{ r: 5, fill: T.accent, stroke: T.white, strokeWidth: 2 }} />
                  <Line yAxisId="right" type="monotone" dataKey="deals" stroke={T.accentDark} strokeWidth={2} strokeDasharray="5 5" name="Deals" dot={{ r: 3, fill: T.accentDark }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Breakdown Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { label: "Receita Média/Deal", value: "R$ 889", icon: "💰" },
                { label: "Melhor Mês", value: "Dezembro — R$ 13.800", icon: "🏆" },
                { label: "Projeção Próx. Mês", value: "R$ 15.200", icon: "📈" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: T.white, borderRadius: T.radius, padding: "22px 24px",
                  border: `1px solid ${T.lightGray}`,
                }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontSize: 12, color: T.gray, fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.black }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ TAB: ENGAJAMENTO ══════ */}
        {activeTab === "engajamento" && (
          <div style={anim(0.15)}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: "28px 32px",
                border: `1px solid ${T.lightGray}`,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: T.black, marginBottom: 4 }}>Taxa de Engajamento</h3>
                <p style={{ fontSize: 13, color: T.gray, marginBottom: 24 }}>Por dia da semana</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weeklyEngagement} barSize={36}>
                    <defs>
                      <linearGradient id="gEng" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={T.accent} />
                        <stop offset="100%" stopColor={T.accentDark} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.lightGray} vertical={false} />
                    <XAxis dataKey="dia" tick={{ fontSize: 12, fill: T.darkGray, fontFamily: T.font, fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={(v) => v + "%"} domain={[0, 10]} />
                    <Tooltip content={<CustomTooltip formatter={(v) => v + "%"} />} />
                    <Bar dataKey="taxa" fill="url(#gEng)" radius={[6, 6, 0, 0]} name="Engajamento" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: "28px 32px",
                border: `1px solid ${T.lightGray}`,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: T.black, marginBottom: 4 }}>Views por Dia</h3>
                <p style={{ fontSize: 13, color: T.gray, marginBottom: 24 }}>Volume semanal de visualizações</p>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={weeklyEngagement}>
                    <defs>
                      <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={T.accentDark} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={T.accentDark} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.lightGray} vertical={false} />
                    <XAxis dataKey="dia" tick={{ fontSize: 12, fill: T.darkGray, fontFamily: T.font, fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                    <Tooltip content={<CustomTooltip formatter={fmt} />} />
                    <Area type="monotone" dataKey="views" stroke={T.accentDark} strokeWidth={2.5} fill="url(#gViews)" name="Views" dot={false} activeDot={{ r: 5, fill: T.accentDark, stroke: T.white, strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insight Cards */}
            <div style={{
              background: T.gradSubtle, borderRadius: T.radiusLg, padding: "24px 28px",
              display: "flex", gap: 40, alignItems: "center",
            }}>
              <div style={{ fontSize: 36 }}>💡</div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: T.white, marginBottom: 4 }}>Insight da Semana</h4>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
                  Seus conteúdos publicados no <strong style={{ color: T.white }}>sábado</strong> geram <strong style={{ color: T.white }}>62% mais engajamento</strong> que a média semanal. 
                  Considere concentrar publicações nesse dia para maximizar alcance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══════ TAB: PLATAFORMAS ══════ */}
        {activeTab === "plataformas" && (
          <div style={anim(0.15)}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
              {platformData.map((p, i) => {
                const platformIcons = { TikTok: "🎵", Reels: "📸", Shorts: "▶️", LinkedIn: "💼" };
                return (
                  <div key={i} style={{
                    background: T.white, borderRadius: T.radiusLg, padding: "24px",
                    border: `1px solid ${T.lightGray}`,
                    transition: "all 0.3s ease",
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 14 }}>{platformIcons[p.platform]}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.black, marginBottom: 4 }}>{p.platform}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: T.accent, marginBottom: 4 }}>{fmt(p.views)}</div>
                    <div style={{ fontSize: 12, color: T.gray, marginBottom: 12 }}>views totais</div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      background: "#16a34a14", color: "#16a34a",
                      padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    }}>
                      {Icons.trend} {p.engajamento}% eng.
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              background: T.white, borderRadius: T.radiusLg, padding: "28px 32px",
              border: `1px solid ${T.lightGray}`,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: T.black, marginBottom: 4 }}>Comparativo de Plataformas</h3>
              <p style={{ fontSize: 13, color: T.gray, marginBottom: 24 }}>Views e engajamento por canal</p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={platformData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.lightGray} vertical={false} />
                  <XAxis dataKey="platform" tick={{ fontSize: 13, fill: T.darkGray, fontFamily: T.font, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: T.gray, fontFamily: T.font }} axisLine={false} tickLine={false} tickFormatter={(v) => v + "%"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, fontFamily: T.font }} />
                  <Bar yAxisId="left" dataKey="views" fill={T.accent} radius={[6, 6, 0, 0]} barSize={40} name="Views" />
                  <Bar yAxisId="right" dataKey="engajamento" fill={T.accentDark} radius={[6, 6, 0, 0]} barSize={40} name="Engajamento %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
