// MicroHabit AI — screens for the iOS device frame
// All visual primitives live here so the index file stays small.

// ─────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────
const MH = {
  bg: '#FBFAFE',
  ink: '#15151B',
  ink2: 'rgba(21,21,27,0.62)',
  ink3: 'rgba(21,21,27,0.38)',
  hair: 'rgba(21,21,27,0.08)',
  glass: 'rgba(255,255,255,0.62)',
  glassEdge: 'rgba(255,255,255,0.95)',
  glassShadow: '0 1px 1px rgba(255,255,255,0.9) inset, 0 -1px 1px rgba(20,20,40,0.04) inset, 0 18px 40px -16px rgba(60,40,140,0.18), 0 4px 12px -4px rgba(20,20,40,0.06)',
  emerald: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
  emeraldEdge: 'inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.08), 0 8px 20px -6px rgba(5,150,105,0.45)',
  slate: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(241,243,250,0.85) 100%)',
  slateEdge: 'inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(20,20,60,0.04), 0 4px 14px -4px rgba(20,20,60,0.08)',
  glowA: '#A78BFA',
  glowB: '#60A5FA',
  glowC: '#F0ABFC',
};

// ─────────────────────────────────────────────────────────────
// Background — soft glow + faint geometric grid pattern
// ─────────────────────────────────────────────────────────────
function MHBackdrop({ glow = [MH.glowA, MH.glowB], pattern = true }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: MH.bg }} />
      {/* abstract geometric pattern — concentric arcs + dot grid */}
      {pattern && (
        <svg width="100%" height="100%" viewBox="0 0 402 874" preserveAspectRatio="xMidYMid slice"
             style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
          <defs>
            <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="rgba(80,60,160,0.10)" />
            </pattern>
            <radialGradient id="fade" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="100%" stopColor="#fff" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="402" height="874" fill="url(#dotgrid)" />
          {/* connectivity arcs */}
          <g fill="none" stroke="rgba(120,100,200,0.10)" strokeWidth="1">
            <circle cx="201" cy="320" r="120" />
            <circle cx="201" cy="320" r="180" />
            <circle cx="201" cy="320" r="240" />
            <circle cx="201" cy="320" r="320" />
          </g>
          <rect width="402" height="874" fill="url(#fade)" />
        </svg>
      )}
      {/* pulsating radial glow */}
      <div style={{
        position: 'absolute', top: 180, left: '50%', transform: 'translateX(-50%)',
        width: 520, height: 520, borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${glow[0]}55 0%, ${glow[1]}33 40%, transparent 70%)`,
        filter: 'blur(20px)',
        animation: 'mh-pulse 6s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes mh-pulse {
          0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
          50%      { opacity: 1;    transform: translateX(-50%) scale(1.06); }
        }
        @keyframes mh-particle {
          0%, 100% { transform: scale(1);   opacity: 0.85; }
          50%      { transform: scale(1.1); opacity: 1; }
        }
        @keyframes mh-orbit {
          from { transform: rotate(0deg)   translateX(14px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(14px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AI Assistant particle avatar (abstract, glowing)
// ─────────────────────────────────────────────────────────────
function MHAvatar({ size = 32 }) {
  return (
    <div style={{
      width: size, height: size, position: 'relative', flexShrink: 0,
      borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, #fff 0%, #C4B5FD 35%, #7C3AED 75%, #4C1D95 100%)`,
      boxShadow: '0 0 0 2px rgba(255,255,255,0.8), 0 6px 16px -4px rgba(124,58,237,0.55), inset 0 -2px 3px rgba(76,29,149,0.4)',
      animation: 'mh-particle 2.8s ease-in-out infinite',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: 4, height: 4, marginLeft: -2, marginTop: -2,
        borderRadius: '50%', background: '#fff', boxShadow: '0 0 6px #fff',
        animation: 'mh-orbit 3.5s linear infinite',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Glass card wrapper
// ─────────────────────────────────────────────────────────────
function MHGlass({ children, style = {}, radius = 28, tint = 'rgba(255,255,255,0.62)' }) {
  return (
    <div style={{
      position: 'relative', borderRadius: radius,
      background: tint,
      backdropFilter: 'blur(28px) saturate(180%)',
      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
      border: '0.5px solid rgba(255,255,255,0.9)',
      boxShadow: MH.glassShadow,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pill — small status chip with icon
// ─────────────────────────────────────────────────────────────
function MHChip({ icon, label, glow = MH.glowB }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 12px 8px 10px', borderRadius: 999,
      background: 'rgba(255,255,255,0.7)',
      border: '0.5px solid rgba(255,255,255,0.95)',
      boxShadow: '0 1px 0 rgba(255,255,255,0.8) inset, 0 4px 10px -4px rgba(20,20,60,0.10)',
      fontSize: 13, fontWeight: 600, color: MH.ink, letterSpacing: -0.1,
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: `radial-gradient(circle at 35% 35%, ${glow}, ${glow}88)`,
        boxShadow: `0 0 0 2px rgba(255,255,255,0.9), 0 0 10px ${glow}88`,
        color: '#fff',
      }}>{icon}</span>
      {label}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Icons (inline svg, hairline)
// ─────────────────────────────────────────────────────────────
const Icon = {
  pin: (c = '#fff') => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13Z" stroke={c} strokeWidth="2"/>
      <circle cx="12" cy="9" r="2.5" fill={c}/>
    </svg>
  ),
  clock: (c = '#fff') => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2"/>
      <path d="M12 7v5l3 2" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  target: (c, active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth={active ? 2 : 1.6}/>
      <circle cx="12" cy="12" r="5" stroke={c} strokeWidth={active ? 2 : 1.6}/>
      <circle cx="12" cy="12" r="1.6" fill={c}/>
    </svg>
  ),
  chart: (c) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 19V9M10 19V4M16 19v-7M22 19H2" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  cal: (c) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="3" stroke={c} strokeWidth="1.7"/>
      <path d="M3 10h18M8 3v4M16 3v4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  cog: (c) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.7"/>
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.18.42.27.86.27 1.32" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  check: (c = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  zzz: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 7h6l-6 10h6M13 4h5l-5 6h5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  book: (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2V5Z" stroke={c} strokeWidth="1.7"/>
      <path d="M4 20a2 2 0 0 1 2-2h13" stroke={c} strokeWidth="1.7"/>
    </svg>
  ),
  walk: (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="13" cy="4" r="2" stroke={c} strokeWidth="1.7"/>
      <path d="M9 21l2-6-3-2 2-5 4 1 2 4 3 1M6 13l3-1" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  flame: (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s0 2 2 2c0-3-2-4 1-7Z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────
// Bottom nav
// ─────────────────────────────────────────────────────────────
function MHNav({ active = 'habits' }) {
  const items = [
    { key: 'habits',   icon: Icon.target, label: 'Habits' },
    { key: 'progress', icon: Icon.chart,  label: 'Progress' },
    { key: 'insights', icon: Icon.cal,    label: 'Insights' },
    { key: 'settings', icon: Icon.cog,    label: 'Settings' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: 24, zIndex: 30,
    }}>
      <MHGlass radius={28} style={{ padding: '10px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {items.map((it) => {
            const isActive = it.key === active;
            const c = isActive ? '#7C3AED' : MH.ink2;
            return (
              <div key={it.key} style={{
                position: 'relative', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4, padding: '6px 14px',
                borderRadius: 16,
                background: isActive ? 'rgba(124,58,237,0.10)' : 'transparent',
                boxShadow: isActive ? '0 0 0 1px rgba(124,58,237,0.18), 0 0 20px rgba(124,58,237,0.25)' : 'none',
              }}>
                {it.icon(c, isActive)}
                <span style={{
                  fontSize: 11, fontWeight: isActive ? 600 : 500,
                  color: c, letterSpacing: -0.1,
                }}>{it.label}</span>
              </div>
            );
          })}
        </div>
      </MHGlass>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Context Card — large translucent card with glow
// ─────────────────────────────────────────────────────────────
function MHContextCard({ context = 'YOU ARE HOME', location = 'Home', time = '6:15 PM', glow = [MH.glowA, MH.glowB] }) {
  return (
    <MHGlass radius={32} style={{ padding: '24px 22px', overflow: 'hidden' }}>
      {/* inner radial glow */}
      <div style={{
        position: 'absolute', inset: -20,
        background: `radial-gradient(circle at 50% 50%, ${glow[0]}44 0%, ${glow[1]}22 35%, transparent 70%)`,
        animation: 'mh-pulse 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: MH.ink3,
            letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8,
          }}>Live Context</div>
          <div style={{
            fontSize: 26, fontWeight: 700, color: MH.ink, lineHeight: 1.1,
            letterSpacing: -0.6,
          }}>{context}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <MHChip icon={Icon.pin()} label={location} glow={MH.glowA} />
          <MHChip icon={Icon.clock()} label={time} glow={MH.glowB} />
        </div>
      </div>
    </MHGlass>
  );
}

// ─────────────────────────────────────────────────────────────
// Nudge Card — the primary action card
// ─────────────────────────────────────────────────────────────
function MHNudgeCard({ title = 'Read 5 pages of your book.', meta = ['Wind-down · Evening', '2 min commitment'], rationale = 'You usually read between 6–7 PM. Picking up where you left off in "Sapiens".', icon = Icon.book(MH.ink) }) {
  return (
    <MHGlass radius={32} style={{ padding: 22, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MHAvatar size={26} />
          <div style={{ fontSize: 12, fontWeight: 600, color: MH.ink2, letterSpacing: 0.2 }}>
            YOUR PERSONAL NUDGE
          </div>
        </div>
        <div style={{
          fontSize: 11, color: MH.ink3, fontWeight: 500,
          padding: '4px 10px', borderRadius: 999,
          background: 'rgba(124,58,237,0.08)', color: '#7C3AED',
        }}>· just now</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12, flexShrink: 0,
          background: 'rgba(124,58,237,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#5B21B6',
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 22, fontWeight: 600, color: MH.ink, lineHeight: 1.22,
            letterSpacing: -0.4, textWrap: 'pretty',
          }}>{title}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {meta.map((m, i) => (
              <span key={i} style={{
                fontSize: 11, fontWeight: 500, color: MH.ink2,
                padding: '3px 8px', borderRadius: 6,
                background: 'rgba(21,21,27,0.05)',
              }}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        fontSize: 13, color: MH.ink2, lineHeight: 1.45,
        padding: '12px 14px', marginTop: 14,
        borderRadius: 14, background: 'rgba(124,58,237,0.05)',
        borderLeft: '2px solid rgba(124,58,237,0.45)',
      }}>
        <span style={{ fontWeight: 600, color: '#5B21B6' }}>Why now · </span>
        {rationale}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
        <button style={{
          height: 54, borderRadius: 18, border: 'none', cursor: 'pointer',
          background: MH.emerald, boxShadow: MH.emeraldEdge,
          color: '#fff', fontWeight: 600, fontSize: 16, letterSpacing: -0.2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          fontFamily: 'inherit',
        }}>
          {Icon.check()} Done · Mark as complete
        </button>
        <button style={{
          height: 50, borderRadius: 18, border: 'none', cursor: 'pointer',
          background: MH.slate, boxShadow: MH.slateEdge,
          color: MH.ink, fontWeight: 600, fontSize: 15, letterSpacing: -0.2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontFamily: 'inherit',
        }}>
          {Icon.zzz(MH.ink2)} Snooze · Ask again in 30 min
        </button>
      </div>
    </MHGlass>
  );
}

// ─────────────────────────────────────────────────────────────
// Header / greeting
// ─────────────────────────────────────────────────────────────
function MHGreeting({ name = 'Alex', tagline = 'Your moment is now.' }) {
  return (
    <div style={{ padding: '8px 4px 18px' }}>
      <div style={{
        fontSize: 12, fontWeight: 600, color: MH.ink3,
        letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6,
      }}>{new Date().toLocaleDateString('en-US', { weekday: 'long' }) || 'Tuesday'} · May 16</div>
      <div style={{
        fontSize: 28, fontWeight: 700, color: MH.ink, letterSpacing: -0.8,
        lineHeight: 1.15,
      }}>Welcome back, {name}.</div>
      <div style={{
        fontSize: 17, color: MH.ink2, marginTop: 4, letterSpacing: -0.2,
        fontWeight: 400,
      }}>{tagline}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Streak badge (for variant)
// ─────────────────────────────────────────────────────────────
function MHStreakStrip({ days = 7, today = 4 }) {
  return (
    <MHGlass radius={22} style={{ padding: '14px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'linear-gradient(180deg,#FB923C,#EA580C)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px -2px rgba(234,88,12,0.5)',
          }}>{Icon.flame('#fff')}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: MH.ink }}>{days}-day streak</span>
        </div>
        <span style={{ fontSize: 12, color: MH.ink3, fontWeight: 500 }}>This week</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['M','T','W','T','F','S','S'].map((d, i) => {
          const done = i < today;
          const isToday = i === today;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: '100%', height: 28, borderRadius: 10,
                background: done
                  ? 'linear-gradient(180deg,#34D399,#059669)'
                  : isToday
                    ? 'linear-gradient(180deg,#A78BFA,#7C3AED)'
                    : 'rgba(21,21,27,0.06)',
                boxShadow: done
                  ? 'inset 0 1px 0 rgba(255,255,255,0.45), 0 4px 10px -4px rgba(5,150,105,0.4)'
                  : isToday
                    ? 'inset 0 1px 0 rgba(255,255,255,0.45), 0 4px 14px -2px rgba(124,58,237,0.45)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {done && Icon.check('#fff')}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: isToday ? '#7C3AED' : MH.ink3,
              }}>{d}</span>
            </div>
          );
        })}
      </div>
    </MHGlass>
  );
}

// ─────────────────────────────────────────────────────────────
// Screens
// ─────────────────────────────────────────────────────────────

const PALETTES = {
  violet: ['#A78BFA', '#60A5FA'],
  mint:   ['#86EFAC', '#60A5FA'],
  peach:  ['#FDBA74', '#F0ABFC'],
};

const TONE = {
  warm:  { a: 'Your moment is now.',           b: 'A small step closes the loop.', c: 'Nice — 1 of 3 done for today.' },
  crisp: { a: 'Next nudge ready.',             b: 'New context detected.',          c: 'Logged. 2 remaining today.' },
};

// A: the spec screen — Home / evening / read
function MHScreenA({ palette = 'violet', pattern = true, tone = 'warm' }) {
  const glow = PALETTES[palette] || PALETTES.violet;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '68px 18px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <MHGreeting name="Alex" tagline={TONE[tone].a} />
        <MHContextCard context="YOU ARE HOME" location="Home" time="6:15 PM" glow={glow} />
        <MHNudgeCard
          title="Read 5 pages of your book."
          meta={['Wind-down · Evening', '~2 min']}
          rationale='You usually read between 6–7 PM. Picking up where you left off in "Sapiens".'
          icon={Icon.book(MH.ink)}
        />
      </div>
      <MHNav active="habits" />
    </div>
  );
}

// B: different context — leaving work
function MHScreenB({ palette = 'peach', pattern = true, tone = 'warm' }) {
  const glow = PALETTES[palette] || PALETTES.peach;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '68px 18px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <MHGreeting name="Alex" tagline={TONE[tone].b} />
        <MHContextCard
          context="LEAVING THE OFFICE"
          location="Work · Geofence"
          time="5:42 PM"
          glow={glow}
        />
        <MHNudgeCard
          title="Take the long route — walk 10 minutes before driving."
          meta={['Reset · Transition', '10 min']}
          rationale="You logged 3,200 steps today — well below your 7K target. A short walk now means you'll hit it tonight."
          icon={Icon.walk(MH.ink)}
        />
      </div>
      <MHNav active="habits" />
    </div>
  );
}

// C: post-complete moment — streak + next-up
function MHScreenC({ palette = 'mint', pattern = true, tone = 'warm' }) {
  const glow = PALETTES[palette] || PALETTES.mint;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '68px 18px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <MHGreeting name="Alex" tagline={TONE[tone].c} />

        {/* Big completion confirmation */}
        <MHGlass radius={32} style={{ padding: 22, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: -20,
            background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.35) 0%, rgba(96,165,250,0.18) 40%, transparent 70%)',
            animation: 'mh-pulse 4s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 54, height: 54, borderRadius: 18,
              background: MH.emerald, boxShadow: MH.emeraldEdge,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#059669', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>Nudge complete</div>
              <div style={{ fontSize: 19, fontWeight: 600, color: MH.ink, letterSpacing: -0.3, lineHeight: 1.2 }}>5 pages of Sapiens · logged</div>
              <div style={{ fontSize: 13, color: MH.ink2, marginTop: 2 }}>Page 142 → 147 · 4 min</div>
            </div>
          </div>
        </MHGlass>

        <MHStreakStrip days={7} today={3} />

        {/* Next up — quieter card */}
        <MHGlass radius={28} style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <MHAvatar size={22} />
              <span style={{ fontSize: 12, fontWeight: 600, color: MH.ink2, letterSpacing: 0.2 }}>UP NEXT</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 500, color: MH.ink3 }}>~ 9:30 PM · before bed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 11,
              background: 'rgba(124,58,237,0.10)', color: '#5B21B6',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: MH.ink, letterSpacing: -0.2 }}>Phone on charger across the room</div>
              <div style={{ fontSize: 12, color: MH.ink3 }}>Triggered when you start your wind-down playlist.</div>
            </div>
          </div>
        </MHGlass>
      </div>
      <MHNav active="progress" />
    </div>
  );
}

Object.assign(window, {
  MHScreenA, MHScreenB, MHScreenC, MH,
});
