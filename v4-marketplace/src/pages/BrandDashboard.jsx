import { useState, useRef, useEffect } from "react";

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
  success: "#16a34a",
  successBg: "#16a34a12",
  warning: "#f59e0b",
  warningBg: "#f59e0b12",
};

const FONT = `'IBM Plex Sans', -apple-system, sans-serif`;

/* ─── SVG Icons ─── */
const I = ({ d, size = 20, color = "currentColor", fill = "none", strokeW = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">{typeof d === "string" ? <path d={d} /> : d}</svg>
);

const Icons = {
  home: (p) => <I {...p} d={<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>} />,
  campaigns: (p) => <I {...p} d={<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></>} />,
  creators: (p) => <I {...p} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} />,
  analytics: (p) => <I {...p} d={<><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>} />,
  wallet: (p) => <I {...p} d={<><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></>} />,
  settings: (p) => <I {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>} />,
  plus: (p) => <I {...p} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />,
  check: (p) => <I {...p} d="M20 6 9 17l-5-5" />,
  close: (p) => <I {...p} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />,
  bell: (p) => <I {...p} d={<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>} />,
  search: (p) => <I {...p} d={<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></>} />,
  upload: (p) => <I {...p} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>} />,
  eye: (p) => <I {...p} d={<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>} />,
  clock: (p) => <I {...p} d={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} />,
  trash: (p) => <I {...p} d={<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>} />,
  edit: (p) => <I {...p} d={<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>} />,
  arrowLeft: (p) => <I {...p} d={<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>} />,
  arrowRight: (p) => <I {...p} d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />,
  copy: (p) => <I {...p} d={<><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>} />,
  globe: (p) => <I {...p} d={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />,
  zap: (p) => <I {...p} d={<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>} />,
  image: (p) => <I {...p} d={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>} />,
};

/* ─── Mock Campaign Data ─── */
const CAMPAIGNS_DATA = [
  { id: 1, title: "Lançamento Feastables Dark Chocolate", status: "active", budget: 5000, spent: 2340, creators: 7, maxCreators: 12, views: 482000, cpm: 18, deadline: "28 Abr 2026", category: "Food & Beverage", platforms: ["TikTok", "Reels", "Shorts"], createdAt: "01 Abr 2026" },
  { id: 2, title: "Campanha NuCripto — Educação Financeira", status: "active", budget: 8500, spent: 1200, creators: 3, maxCreators: 20, views: 156000, cpm: 24, deadline: "15 Mai 2026", category: "Fintech", platforms: ["TikTok", "Reels"], createdAt: "05 Abr 2026" },
  { id: 3, title: "Review Tech T-Shirt Anti-odor", status: "completed", budget: 3200, spent: 3200, creators: 8, maxCreators: 8, views: 920000, cpm: 15, deadline: "10 Abr 2026", category: "Fashion & Tech", platforms: ["Reels", "Shorts"], createdAt: "15 Mar 2026" },
  { id: 4, title: "iFood Benefícios — Campanha Corporativa", status: "active", budget: 12000, spent: 3600, creators: 4, maxCreators: 15, views: 310000, cpm: 30, deadline: "20 Mai 2026", category: "Food & Tech", platforms: ["TikTok", "Reels", "Shorts", "LinkedIn"], createdAt: "08 Abr 2026" },
  { id: 5, title: "Coleção Outono — Street Style", status: "draft", budget: 4500, spent: 0, creators: 0, maxCreators: 10, views: 0, cpm: 20, deadline: "05 Mai 2026", category: "Fashion", platforms: ["TikTok", "Reels"], createdAt: "12 Abr 2026" },
];

const BRAND_STATS = [
  { label: "Campanhas Ativas", value: "3", icon: "zap" },
  { label: "Budget Total", value: "R$ 33.4K", icon: "wallet" },
  { label: "Total de Views", value: "1.87M", icon: "eye" },
  { label: "Criadores Ativos", value: "22", icon: "creators" },
];

const APPLICANTS = [
  { name: "Ana Beatriz", handle: "@anab.creates", followers: "45.2K", engagement: "6.8%", avatar: "AB", platforms: ["TikTok", "Reels"], rating: 4.9, status: "pending" },
  { name: "Lucas Mendes", handle: "@lucasm.content", followers: "128K", engagement: "4.2%", avatar: "LM", platforms: ["TikTok", "Shorts"], rating: 4.7, status: "pending" },
  { name: "Juliana Costa", handle: "@jucosta", followers: "89K", engagement: "5.5%", avatar: "JC", platforms: ["Reels", "TikTok"], rating: 4.8, status: "approved" },
  { name: "Pedro Alves", handle: "@pedroalves.br", followers: "210K", engagement: "3.9%", avatar: "PA", platforms: ["TikTok", "Reels", "Shorts"], rating: 4.6, status: "approved" },
  { name: "Mariana Silva", handle: "@mari.silva", followers: "67K", engagement: "7.1%", avatar: "MS", platforms: ["Reels"], rating: 4.9, status: "rejected" },
];

/* ─── Shared Components ─── */

const StatusBadge = ({ status }) => {
  const map = {
    active: { bg: V4.successBg, color: V4.success, label: "Ativa" },
    completed: { bg: `${V4.gray}15`, color: V4.gray, label: "Concluída" },
    draft: { bg: V4.warningBg, color: V4.warning, label: "Rascunho" },
    pending: { bg: V4.warningBg, color: V4.warning, label: "Pendente" },
    approved: { bg: V4.successBg, color: V4.success, label: "Aprovado" },
    rejected: { bg: "#ef444420", color: "#ef4444", label: "Recusado" },
  };
  const s = map[status] || map.draft;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 6,
      fontSize: 11, fontWeight: 600, fontFamily: FONT,
      background: s.bg, color: s.color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
      {s.label}
    </span>
  );
};

const PlatformPill = ({ name }) => {
  const colors = { TikTok: "#000", Reels: "#E1306C", Shorts: "#FF0000", LinkedIn: "#0077B5" };
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600,
      fontFamily: FONT, background: `${colors[name] || V4.gray}12`,
      color: colors[name] || V4.gray,
    }}>
      {name}
    </span>
  );
};

const ProgressBar = ({ value, max, height = 4, color }) => (
  <div style={{ width: "100%", height, borderRadius: height / 2, background: V4.lightGray, overflow: "hidden" }}>
    <div style={{
      width: `${Math.min((value / max) * 100, 100)}%`, height: "100%",
      borderRadius: height / 2, background: color || V4.gradientPrimary,
      transition: "width 0.6s cubic-bezier(.22,1,.36,1)",
    }} />
  </div>
);

const Input = ({ label, hint, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black }}>{label}</label>}
    <input {...props} style={{
      padding: "11px 14px", borderRadius: 10, border: `1px solid #00000012`,
      background: V4.white, fontFamily: FONT, fontSize: 14, color: V4.black,
      transition: "border-color 0.2s", outline: "none",
      ...(props.style || {}),
    }} />
    {hint && <span style={{ fontFamily: FONT, fontSize: 11, color: V4.gray }}>{hint}</span>}
  </div>
);

const TextArea = ({ label, hint, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black }}>{label}</label>}
    <textarea {...props} style={{
      padding: "11px 14px", borderRadius: 10, border: `1px solid #00000012`,
      background: V4.white, fontFamily: FONT, fontSize: 14, color: V4.black,
      resize: "vertical", minHeight: 100, outline: "none",
      ...(props.style || {}),
    }} />
    {hint && <span style={{ fontFamily: FONT, fontSize: 11, color: V4.gray }}>{hint}</span>}
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black }}>{label}</label>}
    <select {...props} style={{
      padding: "11px 14px", borderRadius: 10, border: `1px solid #00000012`,
      background: V4.white, fontFamily: FONT, fontSize: 14, color: V4.black,
      outline: "none", appearance: "auto", ...(props.style || {}),
    }}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

/* ─── Campaign Creation Wizard ─── */
const STEPS = ["Informações", "Briefing", "Plataformas & Budget", "Revisão"];

const CampaignWizard = ({ onClose, onCreated }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "", category: "food", description: "", guidelines: "",
    platforms: [], budget: "", cpm: "", slots: "", deadline: "",
    minFollowers: "1000", requirements: [],
  });
  const [publishing, setPublishing] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const togglePlatform = (p) => {
    set("platforms", form.platforms.includes(p) ? form.platforms.filter((x) => x !== p) : [...form.platforms, p]);
  };

  const toggleReq = (r) => {
    set("requirements", form.requirements.includes(r) ? form.requirements.filter((x) => x !== r) : [...form.requirements, r]);
  };

  const canNext = () => {
    if (step === 0) return form.title.trim().length > 3;
    if (step === 1) return form.description.trim().length > 10;
    if (step === 2) return form.platforms.length > 0 && form.budget && form.cpm && form.slots && form.deadline;
    return true;
  };

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => { setPublishing(false); onCreated(form); }, 1500);
  };

  const categoryOptions = [
    { value: "food", label: "Food & Beverage" },
    { value: "fintech", label: "Fintech" },
    { value: "fashion", label: "Fashion" },
    { value: "tech", label: "Tecnologia" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "saude", label: "Saúde & Bem-estar" },
    { value: "educacao", label: "Educação" },
    { value: "outro", label: "Outro" },
  ];

  const allPlatforms = ["TikTok", "Reels", "Shorts", "LinkedIn"];
  const allRequirements = [
    "Conteúdo 100% original",
    "Sem uso de IA generativa",
    "Postar em até 48h após aprovação",
    "Manter post por mínimo 30 dias",
    "Incluir hashtags obrigatórias",
    "Seguir roteiro/script fornecido",
    "Incluir link na bio",
    "Mencionar @marca no post",
  ];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(5,5,5,0.55)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, animation: "fadeIn 0.2s ease", padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: V4.white, borderRadius: 20, width: "100%", maxWidth: 680,
        maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column",
        animation: "slideUp 0.35s cubic-bezier(.22,1,.36,1)",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px 28px 20px", borderBottom: `1px solid ${V4.lightGray}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h2 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: V4.black, margin: 0 }}>
              Nova Campanha
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: V4.gray, marginTop: 4 }}>
              Passo {step + 1} de {STEPS.length} — {STEPS[step]}
            </p>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10, border: "none",
            background: V4.lightGray, cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", color: V4.gray,
          }}>
            {Icons.close({ size: 16 })}
          </button>
        </div>

        {/* Progress */}
        <div style={{ padding: "0 28px", marginTop: 20 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{
                flex: 1, height: 3, borderRadius: 2,
                background: i <= step ? V4.accent : V4.lightGray,
                transition: "background 0.3s ease",
              }} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: "auto", padding: "24px 28px" }}>
          {/* Step 0 — Informações */}
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.3s ease" }}>
              <Input label="Nome da Campanha" placeholder="Ex: Lançamento Produto X — Review Autêntico" value={form.title} onChange={(e) => set("title", e.target.value)} hint="Seja claro e descritivo para atrair os criadores certos." />
              <Select label="Categoria" options={categoryOptions} value={form.category} onChange={(e) => set("category", e.target.value)} />

              {/* Upload area */}
              <div>
                <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black, display: "block", marginBottom: 6 }}>
                  Logo / Imagem da Campanha
                </label>
                <div style={{
                  border: `2px dashed #00000015`, borderRadius: 12, padding: "36px 20px",
                  textAlign: "center", cursor: "pointer", transition: "border-color 0.2s",
                  background: V4.sectionBg,
                }}>
                  <div style={{ color: V4.gray, marginBottom: 8 }}>{Icons.upload({ size: 28, color: V4.gray })}</div>
                  <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black, margin: 0 }}>
                    Arraste uma imagem ou clique para upload
                  </p>
                  <p style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginTop: 4 }}>
                    PNG, JPG ou SVG — máx 2MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Briefing */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.3s ease" }}>
              <TextArea label="Descrição da Campanha" placeholder="Descreva o objetivo da campanha, o tom desejado, e o que o criador precisa comunicar..." value={form.description} onChange={(e) => set("description", e.target.value)} hint="Quanto mais detalhado, melhores candidaturas você receberá." style={{ minHeight: 130 }} />
              <TextArea label="Guidelines Criativas" placeholder="Orientações específicas sobre estilo visual, duração do vídeo, referências, do's and dont's..." value={form.guidelines} onChange={(e) => set("guidelines", e.target.value)} hint="Opcional, mas altamente recomendado." style={{ minHeight: 100 }} />

              {/* Requirements checkboxes */}
              <div>
                <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black, display: "block", marginBottom: 10 }}>
                  Requisitos para Criadores
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {allRequirements.map((req) => {
                    const checked = form.requirements.includes(req);
                    return (
                      <button key={req} onClick={() => toggleReq(req)} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "10px 12px", borderRadius: 8,
                        border: `1px solid ${checked ? V4.accent + "40" : "#00000008"}`,
                        background: checked ? V4.accent + "08" : V4.white,
                        cursor: "pointer", textAlign: "left", fontFamily: FONT,
                        fontSize: 12, color: checked ? V4.accentDark : V4.darkGray,
                        transition: "all 0.2s ease", fontWeight: checked ? 600 : 400,
                      }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                          border: `1.5px solid ${checked ? V4.accent : "#00000020"}`,
                          background: checked ? V4.accent : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}>
                          {checked && Icons.check({ size: 12, color: V4.white })}
                        </span>
                        {req}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Platforms & Budget */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "fadeIn 0.3s ease" }}>
              {/* Platforms */}
              <div>
                <label style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black, display: "block", marginBottom: 10 }}>
                  Plataformas de Distribuição
                </label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {allPlatforms.map((p) => {
                    const active = form.platforms.includes(p);
                    const pColors = { TikTok: "#000", Reels: "#E1306C", Shorts: "#FF0000", LinkedIn: "#0077B5" };
                    const pIcons = { TikTok: "♪", Reels: "◎", Shorts: "▶", LinkedIn: "in" };
                    return (
                      <button key={p} onClick={() => togglePlatform(p)} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "12px 20px", borderRadius: 10,
                        border: `2px solid ${active ? pColors[p] : "#00000010"}`,
                        background: active ? pColors[p] + "08" : V4.white,
                        cursor: "pointer", fontFamily: FONT, fontSize: 14, fontWeight: 600,
                        color: active ? pColors[p] : V4.gray, transition: "all 0.2s ease",
                      }}>
                        <span style={{ fontSize: 16 }}>{pIcons[p]}</span> {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Budget Total (R$)" type="number" placeholder="5000" value={form.budget} onChange={(e) => set("budget", e.target.value)} hint="Quanto será investido na campanha." />
                <Input label="CPM (R$)" type="number" placeholder="18" value={form.cpm} onChange={(e) => set("cpm", e.target.value)} hint="Pagamento por mil visualizações." />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Vagas para Criadores" type="number" placeholder="12" value={form.slots} onChange={(e) => set("slots", e.target.value)} />
                <Input label="Prazo Final" type="date" value={form.deadline} onChange={(e) => set("deadline", e.target.value)} />
              </div>
              <Input label="Seguidores Mínimos" type="number" placeholder="1000" value={form.minFollowers} onChange={(e) => set("minFollowers", e.target.value)} hint="Número mínimo de seguidores para se candidatar." />
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.3s ease" }}>
              <div style={{ padding: 20, background: V4.sectionBg, borderRadius: 14 }}>
                <h3 style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: V4.black, margin: "0 0 16px 0" }}>
                  {form.title || "Sem título"}
                </h3>

                {[
                  { label: "Categoria", value: categoryOptions.find((c) => c.value === form.category)?.label },
                  { label: "Plataformas", value: form.platforms.join(", ") || "—" },
                  { label: "Budget", value: form.budget ? `R$ ${Number(form.budget).toLocaleString("pt-BR")}` : "—" },
                  { label: "CPM", value: form.cpm ? `R$ ${form.cpm}` : "—" },
                  { label: "Vagas", value: form.slots || "—" },
                  { label: "Prazo", value: form.deadline || "—" },
                  { label: "Seguidores mín.", value: form.minFollowers ? Number(form.minFollowers).toLocaleString("pt-BR") : "—" },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 0", borderBottom: `1px solid #00000008`,
                  }}>
                    <span style={{ fontFamily: FONT, fontSize: 13, color: V4.gray }}>{item.label}</span>
                    <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.black }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {form.description && (
                <div>
                  <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: V4.gray, textTransform: "uppercase", letterSpacing: "0.06em" }}>Descrição</span>
                  <p style={{ fontFamily: FONT, fontSize: 14, color: V4.darkGray, lineHeight: 1.6, marginTop: 6 }}>
                    {form.description}
                  </p>
                </div>
              )}

              {form.requirements.length > 0 && (
                <div>
                  <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: V4.gray, textTransform: "uppercase", letterSpacing: "0.06em" }}>Requisitos</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                    {form.requirements.map((r) => (
                      <div key={r} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {Icons.check({ size: 14, color: V4.accent })}
                        <span style={{ fontFamily: FONT, fontSize: 13, color: V4.darkGray }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 28px 24px", borderTop: `1px solid ${V4.lightGray}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          {step > 0 ? (
            <button onClick={() => setStep((s) => s - 1)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 20px", borderRadius: 10, border: `1px solid #00000012`,
              background: V4.white, fontFamily: FONT, fontSize: 14, fontWeight: 600,
              color: V4.gray, cursor: "pointer",
            }}>
              {Icons.arrowLeft({ size: 16 })} Voltar
            </button>
          ) : <div />}

          {step < STEPS.length - 1 ? (
            <button onClick={() => canNext() && setStep((s) => s + 1)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 24px", borderRadius: 10, border: "none",
              background: canNext() ? V4.gradientPrimary : V4.lightGray,
              fontFamily: FONT, fontSize: 14, fontWeight: 600,
              color: canNext() ? V4.white : V4.gray, cursor: canNext() ? "pointer" : "default",
              transition: "all 0.2s ease",
            }}>
              Próximo {Icons.arrowRight({ size: 16, color: canNext() ? V4.white : V4.gray })}
            </button>
          ) : (
            <button onClick={handlePublish} disabled={publishing} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 28px", borderRadius: 10, border: "none",
              background: publishing ? V4.success : V4.gradientPrimary,
              fontFamily: FONT, fontSize: 14, fontWeight: 600,
              color: V4.white, cursor: "pointer", transition: "all 0.3s ease",
            }}>
              {publishing ? "Publicando..." : "Publicar Campanha"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Campaign Detail Panel ─── */
const CampaignDetail = ({ campaign, onBack }) => {
  const [tab, setTab] = useState("overview");
  const c = campaign;

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Back + Title */}
      <button onClick={onBack} style={{
        display: "flex", alignItems: "center", gap: 6, padding: "6px 0",
        border: "none", background: "none", fontFamily: FONT, fontSize: 13,
        color: V4.gray, cursor: "pointer", marginBottom: 16, fontWeight: 500,
      }}>
        {Icons.arrowLeft({ size: 16 })} Voltar para campanhas
      </button>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: V4.black, margin: 0 }}>{c.title}</h1>
            <StatusBadge status={c.status} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 13, color: V4.gray }}>Criada em {c.createdAt} · Prazo: {c.deadline}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 18px",
            borderRadius: 10, border: `1px solid #00000010`, background: V4.white,
            fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.darkGray, cursor: "pointer",
          }}>
            {Icons.edit({ size: 14 })} Editar
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 18px",
            borderRadius: 10, border: `1px solid #00000010`, background: V4.white,
            fontFamily: FONT, fontSize: 13, fontWeight: 600, color: V4.darkGray, cursor: "pointer",
          }}>
            {Icons.copy({ size: 14 })} Duplicar
          </button>
        </div>
      </div>

      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Budget Gasto", value: `R$ ${c.spent.toLocaleString("pt-BR")}`, sub: `de R$ ${c.budget.toLocaleString("pt-BR")}`, pct: c.spent / c.budget },
          { label: "Criadores", value: `${c.creators}/${c.maxCreators}`, sub: `${c.maxCreators - c.creators} vagas restantes`, pct: c.creators / c.maxCreators },
          { label: "Views Totais", value: c.views > 999999 ? `${(c.views / 1e6).toFixed(1)}M` : `${(c.views / 1e3).toFixed(0)}K`, sub: `CPM: R$ ${c.cpm}`, pct: null },
          { label: "Eficiência", value: c.views > 0 ? `R$ ${(c.spent / (c.views / 1000)).toFixed(1)}` : "—", sub: "Custo efetivo / 1K views", pct: null },
        ].map((m, i) => (
          <div key={i} style={{
            background: V4.white, borderRadius: 12, padding: "18px 20px",
            border: `1px solid #00000006`,
          }}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginBottom: 8 }}>{m.label}</div>
            <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: V4.black, letterSpacing: "-0.02em" }}>{m.value}</div>
            <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray, marginTop: 4 }}>{m.sub}</div>
            {m.pct !== null && <div style={{ marginTop: 10 }}><ProgressBar value={m.pct * 100} max={100} /></div>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
        {[{ id: "overview", label: "Candidaturas" }, { id: "content", label: "Conteúdos" }, { id: "analytics", label: "Analytics" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "9px 20px", borderRadius: 8, border: "none",
            background: tab === t.id ? V4.black : "transparent",
            color: tab === t.id ? V4.white : V4.gray,
            fontFamily: FONT, fontSize: 13, fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s ease",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Applicants Table */}
      {tab === "overview" && (
        <div style={{
          background: V4.white, borderRadius: 14, border: `1px solid #00000006`, overflow: "hidden",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 120px",
            padding: "14px 20px", borderBottom: `1px solid ${V4.lightGray}`,
            fontFamily: FONT, fontSize: 11, fontWeight: 600, color: V4.gray,
            textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            <span>Criador</span><span>Seguidores</span><span>Engajamento</span><span>Plataformas</span><span>Rating</span><span>Status</span>
          </div>
          {APPLICANTS.map((a, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 120px",
              padding: "14px 20px", borderBottom: `1px solid #00000004`,
              alignItems: "center", transition: "background 0.2s",
              animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: V4.gradientSubtle,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: V4.white, fontFamily: FONT, fontSize: 12, fontWeight: 700,
                }}>
                  {a.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{a.name}</div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray }}>{a.handle}</div>
                </div>
              </div>
              <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{a.followers}</span>
              <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.success }}>{a.engagement}</span>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {a.platforms.map((p) => <PlatformPill key={p} name={p} />)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "#f59e0b", fontSize: 12 }}>★</span>
                <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>{a.rating}</span>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>
      )}

      {tab === "content" && (
        <div style={{
          background: V4.white, borderRadius: 14, padding: 40, textAlign: "center",
          border: `1px solid #00000006`,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📹</div>
          <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: V4.black }}>
            Conteúdos em análise
          </p>
          <p style={{ fontFamily: FONT, fontSize: 13, color: V4.gray, marginTop: 4 }}>
            Os conteúdos submetidos pelos criadores aparecerão aqui para revisão e aprovação.
          </p>
        </div>
      )}

      {tab === "analytics" && (
        <div style={{
          background: V4.white, borderRadius: 14, padding: 40, textAlign: "center",
          border: `1px solid #00000006`,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
          <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: V4.black }}>
            Analytics em breve
          </p>
          <p style={{ fontFamily: FONT, fontSize: 13, color: V4.gray, marginTop: 4 }}>
            Gráficos de performance, alcance e ROI serão exibidos aqui.
          </p>
        </div>
      )}
    </div>
  );
};

/* ─── Main Brand Dashboard ─── */
export default function BrandDashboard() {
  const [activeNav, setActiveNav] = useState("campaigns");
  const [showWizard, setShowWizard] = useState(false);
  const [campaigns, setCampaigns] = useState(CAMPAIGNS_DATA);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const filtered = campaigns.filter((c) => {
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    const matchSearch = c.title.toLowerCase().includes(searchQ.toLowerCase());
    return matchStatus && matchSearch;
  });

  const navItems = [
    { id: "home", icon: "home", label: "Dashboard" },
    { id: "campaigns", icon: "campaigns", label: "Campanhas" },
    { id: "creators", icon: "creators", label: "Criadores" },
    { id: "analytics", icon: "analytics", label: "Analytics" },
    { id: "wallet", icon: "wallet", label: "Faturamento" },
    { id: "settings", icon: "settings", label: "Configurações" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: V4.sectionBg, fontFamily: FONT }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px }
        ::-webkit-scrollbar-track { background: transparent }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px }
        input:focus, select:focus, textarea:focus, button:focus { outline: none }
      `}</style>

      {/* Sidebar */}
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
          <div>
            <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: V4.white, letterSpacing: "-0.02em" }}>Creators</span>
            <span style={{
              display: "block", fontFamily: FONT, fontSize: 10, fontWeight: 600,
              color: V4.accent, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              BRAND PANEL
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => {
            const active = activeNav === item.id;
            const IconComp = Icons[item.icon];
            return (
              <button key={item.id} onClick={() => { setActiveNav(item.id); setSelectedCampaign(null); }} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                borderRadius: 8, border: "none",
                background: active ? "#ffffff12" : "transparent",
                color: active ? V4.white : "#ffffff60",
                cursor: "pointer", fontFamily: FONT, fontSize: 14,
                fontWeight: active ? 600 : 400, textAlign: "left",
                transition: "all 0.2s ease",
              }}>
                {IconComp && IconComp({ size: 18 })}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* New Campaign CTA */}
        <button onClick={() => setShowWizard(true)} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          marginTop: 24, padding: "12px 16px", borderRadius: 10, border: "none",
          background: V4.gradientPrimary, color: V4.white,
          fontFamily: FONT, fontSize: 14, fontWeight: 600,
          cursor: "pointer", transition: "transform 0.2s",
        }}>
          {Icons.plus({ size: 16, color: V4.white })} Nova Campanha
        </button>

        <div style={{ marginTop: "auto" }}>
          <div style={{ padding: 16, borderRadius: 12, background: "#ffffff08", marginBottom: 16 }}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: "#ffffff80", marginBottom: 8 }}>Plano</div>
            <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: V4.white }}>Business Pro</div>
            <div style={{ fontFamily: FONT, fontSize: 11, color: "#ffffff50", marginTop: 4 }}>5 campanhas ativas incluídas</div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main style={{ marginLeft: 240, minHeight: "100vh", padding: "0 40px 60px" }}>
        {/* Top bar */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "24px 0", gap: 20,
        }}>
          <div>
            <h1 style={{
              fontFamily: FONT, fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700,
              color: V4.black, letterSpacing: "-0.02em",
            }}>
              {selectedCampaign ? "" : activeNav === "campaigns" ? "Suas Campanhas" : "Brand Dashboard"}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{
              position: "relative", width: 40, height: 40, borderRadius: 10,
              border: `1px solid #00000008`, background: V4.white,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: V4.gray,
            }}>
              {Icons.bell({ size: 18 })}
              <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: V4.accent }} />
            </button>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: V4.gradientSubtle,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: V4.white, fontFamily: FONT, fontSize: 14, fontWeight: 700,
            }}>
              IF
            </div>
          </div>
        </header>

        {/* Campaign Detail View */}
        {selectedCampaign ? (
          <CampaignDetail campaign={selectedCampaign} onBack={() => setSelectedCampaign(null)} />
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              {BRAND_STATS.map((stat, i) => {
                const IconComp = Icons[stat.icon];
                return (
                  <div key={stat.label} style={{
                    background: V4.white, borderRadius: 12, padding: "20px 24px",
                    border: `1px solid #00000006`, animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
                    display: "flex", alignItems: "center", gap: 16,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: i === 0 ? `${V4.accent}10` : V4.lightGray,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: i === 0 ? V4.accent : V4.gray, flexShrink: 0,
                    }}>
                      {IconComp && IconComp({ size: 20 })}
                    </div>
                    <div>
                      <div style={{ fontFamily: FONT, fontSize: 12, color: V4.gray, marginBottom: 2 }}>{stat.label}</div>
                      <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: V4.black, letterSpacing: "-0.02em" }}>{stat.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 260px", position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: V4.gray }}>
                  {Icons.search({ size: 16 })}
                </span>
                <input
                  placeholder="Buscar campanhas..."
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  style={{
                    width: "100%", padding: "11px 16px 11px 40px", borderRadius: 10,
                    border: `1px solid #00000010`, background: V4.white,
                    fontFamily: FONT, fontSize: 14, color: V4.black, outline: "none",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[{ v: "all", l: "Todas" }, { v: "active", l: "Ativas" }, { v: "draft", l: "Rascunho" }, { v: "completed", l: "Concluídas" }].map((f) => (
                  <button key={f.v} onClick={() => setFilterStatus(f.v)} style={{
                    padding: "8px 16px", borderRadius: 8,
                    border: filterStatus === f.v ? "none" : `1px solid #00000010`,
                    background: filterStatus === f.v ? V4.black : V4.white,
                    color: filterStatus === f.v ? V4.white : V4.gray,
                    fontFamily: FONT, fontSize: 12, fontWeight: 600, cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}>
                    {f.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Table */}
            <div style={{
              background: V4.white, borderRadius: 14, border: `1px solid #00000006`, overflow: "hidden",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 100px",
                padding: "14px 24px", borderBottom: `1px solid ${V4.lightGray}`,
                fontFamily: FONT, fontSize: 11, fontWeight: 600, color: V4.gray,
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                <span>Campanha</span><span>Budget</span><span>Criadores</span><span>Views</span><span>Prazo</span><span>Status</span>
              </div>

              {filtered.map((c, i) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCampaign(c)}
                  style={{
                    display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 100px",
                    padding: "16px 24px", borderBottom: `1px solid #00000004`,
                    alignItems: "center", cursor: "pointer",
                    transition: "background 0.2s ease",
                    animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = V4.sectionBg}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {c.platforms.map((p) => <PlatformPill key={p} name={p} />)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>
                      R$ {c.budget.toLocaleString("pt-BR")}
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: V4.gray, marginTop: 2 }}>
                      {Math.round((c.spent / c.budget) * 100)}% gasto
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>
                      {c.creators}/{c.maxCreators}
                    </div>
                    <div style={{ marginTop: 4, maxWidth: 80 }}>
                      <ProgressBar value={c.creators} max={c.maxCreators} height={3} />
                    </div>
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: V4.black }}>
                    {c.views > 999999 ? `${(c.views / 1e6).toFixed(1)}M` : `${(c.views / 1e3).toFixed(0)}K`}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 13, color: V4.gray }}>{c.deadline}</div>
                  <StatusBadge status={c.status} />
                </div>
              ))}

              {filtered.length === 0 && (
                <div style={{ padding: 40, textAlign: "center" }}>
                  <p style={{ fontFamily: FONT, fontSize: 14, color: V4.gray }}>Nenhuma campanha encontrada.</p>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div style={{
              marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
            }}>
              <div
                onClick={() => setShowWizard(true)}
                style={{
                  padding: "28px 24px", borderRadius: 14, background: V4.white,
                  border: `2px dashed #00000012`, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 16,
                  transition: "border-color 0.2s, background 0.2s",
                  animation: "fadeUp 0.5s ease 0.3s both",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = V4.accent + "40"; e.currentTarget.style.background = V4.accent + "04"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#00000012"; e.currentTarget.style.background = V4.white; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: `${V4.accent}10`,
                  display: "flex", alignItems: "center", justifyContent: "center", color: V4.accent,
                }}>
                  {Icons.plus({ size: 22, color: V4.accent })}
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: V4.black }}>Criar Nova Campanha</div>
                  <div style={{ fontFamily: FONT, fontSize: 13, color: V4.gray, marginTop: 2 }}>Configure em minutos e comece a receber candidaturas</div>
                </div>
              </div>

              <div style={{
                padding: "28px 24px", borderRadius: 14, background: V4.gradientFooter,
                display: "flex", alignItems: "center", gap: 16,
                animation: "fadeUp 0.5s ease 0.35s both",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: "#ffffff15",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {Icons.globe({ size: 22, color: V4.white })}
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: V4.white }}>Explorar Criadores</div>
                  <div style={{ fontFamily: FONT, fontSize: 13, color: "#ffffffa0", marginTop: 2 }}>Encontre criadores ideais para sua marca por nicho</div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Campaign Wizard */}
      {showWizard && (
        <CampaignWizard
          onClose={() => setShowWizard(false)}
          onCreated={(form) => {
            const newCampaign = {
              id: Date.now(), title: form.title, status: "draft",
              budget: Number(form.budget) || 0, spent: 0, creators: 0,
              maxCreators: Number(form.slots) || 0, views: 0,
              cpm: Number(form.cpm) || 0, deadline: form.deadline,
              category: form.category, platforms: form.platforms,
              createdAt: "15 Abr 2026",
            };
            setCampaigns((prev) => [newCampaign, ...prev]);
            setShowWizard(false);
            showToast("Campanha criada com sucesso!");
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
          animation: "toastIn 0.3s cubic-bezier(.22,1,.36,1)",
          zIndex: 2000,
        }}>
          <span style={{
            width: 22, height: 22, borderRadius: "50%", background: V4.success,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {Icons.check({ size: 13, color: V4.white })}
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}
