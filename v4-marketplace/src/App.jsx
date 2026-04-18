import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import CreatorMarketplace from './pages/CreatorMarketplace.jsx'
import BrandDashboard from './pages/BrandDashboard.jsx'
import CreatorProfile from './pages/CreatorProfile.jsx'
import Analytics from './pages/Analytics.jsx'

/* ─── V4 Tokens (for switcher UI) ─── */
const V4 = {
  black: '#050505',
  darkGray: '#1E2124',
  gray: '#606060',
  lightGray: '#F2F2F2',
  white: '#FFFFFF',
  accent: '#FB2E0A',
  accentDark: '#560303',
  gradPrimary: 'linear-gradient(135deg, #560303, #FB2E0A)',
}
const FONT = `'IBM Plex Sans', -apple-system, sans-serif`

const ROUTES = [
  { path: '/creator', label: 'Dashboard Criador', short: 'Criador', icon: '🎨', desc: 'Deals disponíveis para criadores' },
  { path: '/brand', label: 'Painel da Marca', short: 'Marca', icon: '🏢', desc: 'Gerenciar campanhas e candidaturas' },
  { path: '/profile', label: 'Perfil Criador', short: 'Perfil', icon: '👤', desc: 'Portfólio, conquistas e histórico' },
  { path: '/analytics', label: 'Analytics', short: 'Analytics', icon: '📊', desc: 'Métricas e gráficos de performance' },
]

/* ─── Floating Screen Switcher ─── */
function ScreenSwitcher() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const current = ROUTES.find(r => r.path === location.pathname) || ROUTES[0]

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Trocar de tela"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 18px',
          background: V4.darkGray,
          color: V4.white,
          border: 'none',
          borderRadius: 100,
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
          fontFamily: FONT,
          boxShadow: '0 8px 24px rgba(5,5,5,0.25), 0 0 0 1px rgba(255,255,255,0.06) inset',
          transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
          transform: open ? 'scale(0.95)' : 'scale(1)',
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.transform = 'scale(1)' }}
      >
        <span style={{ fontSize: 16 }}>{current.icon}</span>
        <span>{current.short}</span>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20, height: 20,
          borderRadius: '50%',
          background: V4.gradPrimary,
          color: V4.white,
          fontSize: 11,
          fontWeight: 700,
        }}>
          {open ? '×' : '↕'}
        </span>
      </button>

      {/* Overlay menu */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9998,
              background: 'rgba(5,5,5,0.4)',
              backdropFilter: 'blur(4px)',
              animation: 'sw-fade 0.2s ease',
            }}
          />
          <div style={{
            position: 'fixed',
            bottom: 88,
            right: 24,
            zIndex: 9999,
            width: 340,
            background: V4.white,
            borderRadius: 16,
            padding: 10,
            boxShadow: '0 20px 60px rgba(5,5,5,0.25)',
            fontFamily: FONT,
            animation: 'sw-slide 0.25s cubic-bezier(.22,1,.36,1)',
          }}>
            <div style={{
              padding: '12px 14px 10px',
              borderBottom: `1px solid ${V4.lightGray}`,
              marginBottom: 6,
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: V4.gray, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
                Navegação entre telas
              </div>
              <div style={{ fontSize: 12, color: V4.gray }}>
                Esta é uma demo — troque entre as 4 views abaixo
              </div>
            </div>
            {ROUTES.map(r => {
              const active = r.path === location.pathname
              return (
                <button
                  key={r.path}
                  onClick={() => { navigate(r.path); setOpen(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    padding: '12px 14px',
                    border: 'none',
                    borderRadius: 10,
                    background: active ? `${V4.accent}12` : 'transparent',
                    color: active ? V4.accent : V4.black,
                    cursor: 'pointer',
                    fontFamily: FONT,
                    textAlign: 'left',
                    transition: 'background 0.2s ease',
                    marginBottom: 2,
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = V4.lightGray }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{
                    width: 38, height: 38,
                    borderRadius: 10,
                    background: active ? V4.gradPrimary : V4.lightGray,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                    flexShrink: 0,
                  }}>
                    {r.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: V4.gray, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.desc}
                    </div>
                  </div>
                  {active && (
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: V4.accent, flexShrink: 0,
                    }} />
                  )}
                </button>
              )
            })}
          </div>
          <style>{`
            @keyframes sw-fade { from { opacity: 0 } to { opacity: 1 } }
            @keyframes sw-slide {
              from { opacity: 0; transform: translateY(10px) scale(0.96); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </>
      )}
    </>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/creator" replace />} />
        <Route path="/creator" element={<CreatorMarketplace />} />
        <Route path="/brand" element={<BrandDashboard />} />
        <Route path="/profile" element={<CreatorProfile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/creator" replace />} />
      </Routes>
      <ScreenSwitcher />
    </>
  )
}
