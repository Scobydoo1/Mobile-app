// MicroHabit AI — extended screens (library, creator, progress, insights, settings, map, empty)
// Reuses MH tokens + primitives from microhabit.jsx (loaded first).

// ─────────────────────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────────────────────
const M2 = {
  emerald: '#059669',
  emeraldSoft: 'rgba(5,150,105,0.12)',
  violet: '#7C3AED',
  violetSoft: 'rgba(124,58,237,0.10)',
  amber: '#EA580C',
  amberSoft: 'rgba(234,88,12,0.12)',
  sky: '#0284C7',
  skySoft: 'rgba(2,132,199,0.12)',
};

const Glyph = {
  arrowL: (c) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  plus: (c) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  more: (c) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="1.6" fill={c}/>
      <circle cx="12" cy="12" r="1.6" fill={c}/>
      <circle cx="19" cy="12" r="1.6" fill={c}/>
    </svg>
  ),
  pause: (c) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="5" width="4" height="14" rx="1" fill={c}/>
      <rect x="14" y="5" width="4" height="14" rx="1" fill={c}/>
    </svg>
  ),
  search: (c) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6" stroke={c} strokeWidth="2"/>
      <path d="M20 20l-3.5-3.5" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  bolt: (c) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" fill={c} fillOpacity="0.15"/>
    </svg>
  ),
  download: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  trash: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13M10 11v6M14 11v6" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronR: (c) => (
    <svg width="10" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// Page header — back chevron + title + trailing action
function M2Header({ title, trailing, onBack = true }) {
  return (
    <div style={{
      position: 'relative', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 4px', marginBottom: 14,
    }}>
      {onBack ? (
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'rgba(255,255,255,0.7)',
          border: '0.5px solid rgba(255,255,255,0.95)',
          boxShadow: '0 4px 10px -4px rgba(20,20,60,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Glyph.arrowL(MH.ink)}</div>
      ) : <div style={{ width: 36 }} />}
      <div style={{
        position: 'absolute', left: 0, right: 0, textAlign: 'center',
        fontSize: 17, fontWeight: 700, color: MH.ink, letterSpacing: -0.3,
        pointerEvents: 'none',
      }}>{title}</div>
      <div style={{ minWidth: 36, display: 'flex', justifyContent: 'flex-end' }}>{trailing}</div>
    </div>
  );
}

// Section heading (small caps)
function M2Heading({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px', marginTop: 6, marginBottom: 8 }}>
      <span style={{
        fontSize: 11, fontWeight: 600, color: MH.ink3,
        letterSpacing: 1.2, textTransform: 'uppercase',
      }}>{children}</span>
      {action}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen D — "All caught up" serene state
// ─────────────────────────────────────────────────────────────
function MHScreenEmpty({ palette = 'mint', pattern = true }) {
  const glow = PALETTES[palette] || PALETTES.mint;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '68px 18px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <MHGreeting name="Alex" tagline="That's everything for now." />
        <MHContextCard context="EVENING WIND-DOWN" location="Home" time="9:42 PM" glow={glow} />

        <MHGlass radius={32} style={{ padding: '36px 22px', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{
            position: 'absolute', inset: -40,
            background: `radial-gradient(circle at 50% 40%, ${glow[0]}55 0%, ${glow[1]}22 40%, transparent 70%)`,
            animation: 'mh-pulse 6s ease-in-out infinite', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <div style={{ position: 'relative', width: 72, height: 72 }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #fff 0%, #D1FAE5 40%, #34D399 75%, #047857 100%)',
                  boxShadow: '0 0 0 2px rgba(255,255,255,0.85), 0 12px 32px -8px rgba(5,150,105,0.45)',
                  animation: 'mh-particle 3.4s ease-in-out infinite',
                }} />
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: 6, height: 6, marginLeft: -3, marginTop: -3,
                    borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px #fff',
                    animation: `mh-orbit ${3 + i * 0.6}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                    transformOrigin: `${20 + i * 6}px 0`,
                  }}/>
                ))}
              </div>
            </div>
            <div style={{
              fontSize: 24, fontWeight: 700, color: MH.ink,
              letterSpacing: -0.5, marginBottom: 6,
            }}>You're all caught up.</div>
            <div style={{
              fontSize: 14, color: MH.ink2, lineHeight: 1.5, maxWidth: 260, margin: '0 auto',
            }}>3 of 3 nudges complete today. Next one arrives when your morning context begins.</div>

            <div style={{
              display: 'flex', justifyContent: 'center', gap: 10, marginTop: 22,
            }}>
              <div style={{
                padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                background: 'rgba(5,150,105,0.10)', color: '#047857',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {Icon.flame('#047857')} 7-day streak safe
              </div>
            </div>
          </div>
        </MHGlass>

        <div style={{
          fontSize: 13, color: MH.ink3, textAlign: 'center',
          padding: '0 20px', lineHeight: 1.6, fontStyle: 'italic',
        }}>"Small things, done daily, beat big things done rarely."</div>
      </div>
      <MHNav active="habits" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen E — Habit Library
// ─────────────────────────────────────────────────────────────
function MHHabitRow({ title, tag, time, streak, paused, icon, color = M2.violet, soft = M2.violetSoft }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px', opacity: paused ? 0.55 : 1,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12, flexShrink: 0,
        background: soft, color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 600, color: MH.ink, letterSpacing: -0.2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, fontSize: 11.5, color: MH.ink3 }}>
          <span>{tag}</span>
          <span>·</span>
          <span>{time}</span>
          {paused && (<><span>·</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>{Glyph.pause(MH.ink3)} Paused</span></>)}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 4 }}>
        {Icon.flame(streak > 0 ? '#EA580C' : MH.ink3)}
        <span style={{ fontSize: 13, fontWeight: 600, color: streak > 0 ? '#EA580C' : MH.ink3 }}>{streak}</span>
      </div>
    </div>
  );
}

function MHScreenLibrary({ palette = 'violet', pattern = true }) {
  const glow = PALETTES[palette] || PALETTES.violet;
  const habits = [
    { title: 'Read 5 pages of your book', tag: 'Wind-down', time: '~ Evening · Home', streak: 7, icon: Icon.book(M2.violet) },
    { title: 'Walk 10 min before driving', tag: 'Reset',     time: 'Leaving · Work',    streak: 4, icon: Icon.walk(M2.amber), color: M2.amber, soft: M2.amberSoft },
    { title: '60 seconds of box breathing', tag: 'Health',  time: 'Morning · Home',     streak: 12, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 4v4m0 8v4m-8-8h4m8 0h4M6.5 6.5l2.8 2.8m5.4 5.4 2.8 2.8M6.5 17.5l2.8-2.8m5.4-5.4 2.8-2.8" stroke="#0284C7" strokeWidth="1.7" strokeLinecap="round"/></svg>
    ), color: M2.sky, soft: M2.skySoft },
    { title: 'Phone across the room', tag: 'Wind-down', time: '9:30 PM · Home', streak: 3, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="6" y="3" width="12" height="18" rx="2.5" stroke="#5B21B6" strokeWidth="1.7"/><circle cx="12" cy="18" r="1" fill="#5B21B6"/></svg>
    )},
    { title: 'Refill water bottle', tag: 'Health', time: 'Every 2h · Office', streak: 0, paused: true, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 8h8l-1 12H9L8 8Zm1-4h6l-1 4H10L9 4Z" stroke="#0284C7" strokeWidth="1.6" strokeLinejoin="round"/></svg>
    ), color: M2.sky, soft: M2.skySoft },
    { title: 'Tidy desk for 2 minutes', tag: 'Reset', time: 'End of day · Work', streak: 5, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 19h18M5 19V10h4v9M10 19V6h4v13M15 19v-6h4v6" stroke="#7C3AED" strokeWidth="1.6" strokeLinejoin="round"/></svg>
    )},
  ];
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '60px 18px 110px' }}>
        <M2Header title="Habit Library" trailing={
          <div style={{
            width: 36, height: 36, borderRadius: 12,
            background: MH.emerald, boxShadow: MH.emeraldEdge,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Glyph.plus('#fff')}</div>
        }/>

        {/* search */}
        <MHGlass radius={16} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          {Glyph.search(MH.ink3)}
          <span style={{ fontSize: 14, color: MH.ink3 }}>Search habits, contexts…</span>
        </MHGlass>

        {/* filter chips */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflow: 'hidden' }}>
          {[
            ['All', 6, true],
            ['Active', 5, false],
            ['Wind-down', 2, false],
            ['Health', 2, false],
            ['Paused', 1, false],
          ].map(([l, n, active], i) => (
            <div key={i} style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
              color: active ? '#fff' : MH.ink2,
              background: active ? MH.ink : 'rgba(255,255,255,0.7)',
              border: active ? 'none' : '0.5px solid rgba(20,20,60,0.08)',
              display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
            }}>{l} <span style={{ opacity: 0.6, fontWeight: 500 }}>{n}</span></div>
          ))}
        </div>

        <M2Heading action={<span style={{ fontSize: 11, color: MH.ink3 }}>by streak ↓</span>}>5 active · 1 paused</M2Heading>

        <MHGlass radius={22} style={{ overflow: 'hidden' }}>
          {habits.map((h, i) => (
            <div key={i}>
              <MHHabitRow {...h} />
              {i < habits.length - 1 && <div style={{ height: 0.5, background: 'rgba(20,20,60,0.06)', marginLeft: 66 }} />}
            </div>
          ))}
        </MHGlass>
      </div>
      <MHNav active="habits" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen F — Create Habit
// ─────────────────────────────────────────────────────────────
function M2Field({ label, value, placeholder, hint, large }) {
  return (
    <div>
      <div style={{
        fontSize: 11, fontWeight: 600, color: MH.ink3,
        letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6,
      }}>{label}</div>
      <MHGlass radius={16} style={{ padding: large ? '14px 16px' : '12px 14px' }}>
        <div style={{
          fontSize: large ? 17 : 15, fontWeight: large ? 600 : 500,
          color: value ? MH.ink : MH.ink3, letterSpacing: -0.2,
        }}>{value || placeholder}</div>
        {hint && <div style={{ fontSize: 11.5, color: MH.ink3, marginTop: 4 }}>{hint}</div>}
      </MHGlass>
    </div>
  );
}

function M2SegmentRow({ label, options, selected }) {
  return (
    <div>
      <div style={{
        fontSize: 11, fontWeight: 600, color: MH.ink3,
        letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6,
      }}>{label}</div>
      <div style={{
        display: 'flex', gap: 4, padding: 4, borderRadius: 14,
        background: 'rgba(20,20,60,0.05)',
      }}>
        {options.map((o, i) => (
          <div key={i} style={{
            flex: 1, textAlign: 'center', padding: '8px 0',
            borderRadius: 10, fontSize: 12.5, fontWeight: 600,
            color: o === selected ? MH.ink : MH.ink3,
            background: o === selected ? '#fff' : 'transparent',
            boxShadow: o === selected ? '0 1px 3px rgba(20,20,60,0.08)' : 'none',
            letterSpacing: -0.1,
          }}>{o}</div>
        ))}
      </div>
    </div>
  );
}

function MHScreenCreate({ palette = 'violet', pattern = true }) {
  const glow = PALETTES[palette] || PALETTES.violet;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '60px 18px 110px' }}>
        <M2Header title="New Habit" trailing={
          <div style={{
            padding: '8px 14px', borderRadius: 12, fontSize: 13, fontWeight: 600,
            color: '#fff', background: MH.emerald, boxShadow: MH.emeraldEdge,
          }}>Save</div>
        }/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <M2Field label="Action" value="Read 5 pages of your book." placeholder="What will you do?" large />
          <M2SegmentRow label="Duration" options={['~30s','~2 min','~5 min','~10 min']} selected="~2 min" />

          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, color: MH.ink3,
              letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6,
            }}>Context triggers · ALL must match</div>
            <MHGlass radius={20} style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Trigger row 1 — Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(124,58,237,0.10)', color: '#5B21B6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{Icon.pin('#5B21B6')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: MH.ink3, fontWeight: 600, letterSpacing: 0.4 }}>LOCATION =</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: MH.ink }}>Home <span style={{ color: MH.ink3, fontWeight: 500 }}>· 120m geofence</span></div>
                </div>
                {Glyph.chevronR(MH.ink3)}
              </div>
              <div style={{ height: 0.5, background: 'rgba(20,20,60,0.06)' }}/>
              {/* Trigger row 2 — Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: M2.skySoft, color: M2.sky,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{Icon.clock(M2.sky)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: MH.ink3, fontWeight: 600, letterSpacing: 0.4 }}>TIME BLOCK =</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: MH.ink }}>Evening Wind-down <span style={{ color: MH.ink3, fontWeight: 500 }}>· 6 – 10 PM</span></div>
                </div>
                {Glyph.chevronR(MH.ink3)}
              </div>
              <div style={{ height: 0.5, background: 'rgba(20,20,60,0.06)' }}/>
              {/* Add another */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '4px 2px',
                color: MH.ink3, fontSize: 13, fontWeight: 500,
              }}>
                {Glyph.plus(MH.ink3)} Add another trigger
              </div>
            </MHGlass>
          </div>

          <M2SegmentRow label="Category" options={['Wind-down','Health','Reset','Focus']} selected="Wind-down" />

          {/* Preview Why-now */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, color: MH.ink3,
              letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6,
            }}>"Why now" preview</div>
            <div style={{
              fontSize: 13, color: MH.ink2, lineHeight: 1.45,
              padding: '12px 14px',
              borderRadius: 14, background: 'rgba(124,58,237,0.05)',
              borderLeft: '2px solid rgba(124,58,237,0.45)',
            }}>
              <span style={{ fontWeight: 600, color: '#5B21B6' }}>Why now · </span>
              You usually read between 6–7 PM. Picking up where you left off in "Sapiens".
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen G — Progress
// ─────────────────────────────────────────────────────────────
function MHContribGrid({ weeks = 13 }) {
  // deterministic pseudo-random pattern
  const cell = (w, d) => {
    const x = (w * 9 + d * 5 + 7) % 100;
    if (x < 30) return 0;
    if (x < 55) return 1;
    if (x < 80) return 2;
    return 3;
  };
  const colors = ['rgba(20,20,60,0.05)', 'rgba(52,211,153,0.30)', 'rgba(52,211,153,0.60)', '#059669'];
  const months = ['Feb','Mar','Apr','May'];
  return (
    <div>
      <div style={{ display: 'flex', gap: 3, paddingLeft: 14 }}>
        {months.map((m, i) => (
          <div key={i} style={{
            flex: 1, fontSize: 10, color: MH.ink3, fontWeight: 600,
            letterSpacing: 0.4,
          }}>{m}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        {/* y labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 1, fontSize: 9, color: MH.ink3 }}>
          <span>M</span><span> </span><span>W</span><span> </span><span>F</span><span> </span><span>S</span>
        </div>
        <div style={{ display: 'flex', gap: 3, flex: 1 }}>
          {Array.from({length: weeks}, (_, w) => (
            <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
              {Array.from({length: 7}, (_, d) => (
                <div key={d} style={{
                  width: '100%', aspectRatio: '1 / 1', borderRadius: 3,
                  background: colors[cell(w, d)],
                }}/>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 10, fontSize: 10, color: MH.ink3 }}>
        <span>Less</span>
        {colors.map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }}/>
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function MHScreenProgress({ palette = 'mint', pattern = true }) {
  const glow = PALETTES[palette] || PALETTES.mint;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '60px 18px 110px' }}>
        <M2Header title="Progress" trailing={
          <div style={{ width: 36, height: 36, borderRadius: 12,
            background: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Glyph.more(MH.ink)}</div>
        }/>

        {/* Headline streak */}
        <MHGlass radius={28} style={{ padding: 22, marginBottom: 12, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: -30,
            background: 'radial-gradient(circle at 50% 40%, rgba(234,88,12,0.25), transparent 60%)',
            pointerEvents: 'none',
          }}/>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A3412', letterSpacing: 1.2, textTransform: 'uppercase' }}>Longest active streak</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 44, fontWeight: 700, color: MH.ink, letterSpacing: -1.5, lineHeight: 1 }}>12</span>
                <span style={{ fontSize: 15, color: MH.ink2, fontWeight: 500 }}>days</span>
              </div>
              <div style={{ fontSize: 13, color: MH.ink2, marginTop: 4 }}>Box breathing · Morning</div>
            </div>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(180deg,#FB923C,#EA580C)',
              boxShadow: '0 12px 24px -6px rgba(234,88,12,0.55), inset 0 1px 0 rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s0 2 2 2c0-3-2-4 1-7Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </MHGlass>

        {/* This-week strip */}
        <MHStreakStrip days={7} today={3} />

        <M2Heading action={<span style={{ fontSize: 11, color: MH.ink3 }}>last 13 wks</span>}>Completion grid</M2Heading>
        <MHGlass radius={22} style={{ padding: 16 }}>
          <MHContribGrid weeks={13} />
        </MHGlass>

        {/* Per-habit stats */}
        <M2Heading>Per habit</M2Heading>
        <MHGlass radius={22} style={{ overflow: 'hidden' }}>
          {[
            ['Box breathing', 12, 26, '#0284C7'],
            ['Read 5 pages', 7, 14, '#7C3AED'],
            ['Tidy desk', 5, 9, '#7C3AED'],
            ['Phone away', 3, 8, '#7C3AED'],
          ].map(([name, cur, max, c], i, arr) => (
            <div key={i}>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: MH.ink }}>{name}</span>
                  <span style={{ fontSize: 12, color: MH.ink3 }}>{cur} cur · {max} max</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(20,20,60,0.06)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(cur / max) * 100}%`, height: '100%',
                    borderRadius: 3, background: `linear-gradient(90deg, ${c}, ${c}cc)`,
                  }}/>
                </div>
              </div>
              {i < arr.length - 1 && <div style={{ height: 0.5, background: 'rgba(20,20,60,0.06)', marginLeft: 16 }}/>}
            </div>
          ))}
        </MHGlass>
      </div>
      <MHNav active="progress" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen H — Insights (context heatmap + insight cards)
// ─────────────────────────────────────────────────────────────
function MHContextHeatmap() {
  const ctxs = ['Home', 'Office', 'Gym', 'Out'];
  const slots = ['Morning', 'Midday', 'Afternoon', 'Evening', 'Night'];
  // cell values 0..100
  const v = [
    [82, 64, 41, 88, 70], // Home
    [22, 78, 81, 18, 4],  // Office
    [55, 12, 30, 18, 0],  // Gym
    [10, 28, 22, 35, 8],  // Out
  ];
  const color = (n) => {
    if (n < 10)  return 'rgba(20,20,60,0.05)';
    if (n < 30)  return 'rgba(124,58,237,0.18)';
    if (n < 55)  return 'rgba(124,58,237,0.40)';
    if (n < 75)  return 'rgba(124,58,237,0.65)';
    return '#5B21B6';
  };
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(5, 1fr)', gap: 4 }}>
        <div></div>
        {slots.map((s, i) => (
          <div key={i} style={{ fontSize: 9.5, color: MH.ink3, fontWeight: 600, textAlign: 'center', letterSpacing: 0.2 }}>{s}</div>
        ))}
        {ctxs.map((c, r) => (
          <React.Fragment key={r}>
            <div style={{ fontSize: 12, color: MH.ink, fontWeight: 600, alignSelf: 'center', textAlign: 'right', paddingRight: 6 }}>{c}</div>
            {v[r].map((n, i) => (
              <div key={i} style={{
                aspectRatio: '1 / 1', borderRadius: 8,
                background: color(n),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
                color: n > 55 ? '#fff' : 'rgba(20,20,60,0.45)',
              }}>{n > 0 ? n : ''}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function MHScreenInsights({ palette = 'violet', pattern = true }) {
  const glow = PALETTES[palette] || PALETTES.violet;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '60px 18px 110px' }}>
        <M2Header title="Insights" trailing={
          <div style={{ width: 36, height: 36, borderRadius: 12,
            background: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Glyph.more(MH.ink)}</div>
        }/>

        {/* hero stat */}
        <MHGlass radius={28} style={{ padding: 22, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: M2.violet, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Best context this week</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: MH.ink, letterSpacing: -0.5, lineHeight: 1.2 }}>
            You complete <span style={{ color: M2.emerald }}>85%</span> of fitness habits at the <span style={{ color: M2.violet }}>Gym</span>.
          </div>
          <div style={{ fontSize: 13, color: MH.ink2, marginTop: 6, lineHeight: 1.45 }}>
            …but only 12% when triggered at Home. Consider tightening the geofence rule.
          </div>
        </MHGlass>

        <M2Heading>Context × time-block completion</M2Heading>
        <MHGlass radius={22} style={{ padding: 16, marginBottom: 14 }}>
          <MHContextHeatmap />
        </MHGlass>

        {/* insight cards */}
        <M2Heading>Patterns we noticed</M2Heading>
        {[
          { tone: 'good', title: 'Mornings at Home are gold.', body: '88% completion 6–9 AM. We\'ll lean on this window for new habits.' },
          { tone: 'note', title: 'Afternoon slump is real.', body: 'Office, 2–4 PM dips to 18%. Try shorter actions (~30s) in that block.' },
          { tone: 'warn', title: 'Gym geofence is wide.', body: 'You\'re flagged "at Gym" walking past — tighten radius from 150m to 60m.' },
        ].map((c, i) => {
          const accent = c.tone === 'good' ? M2.emerald : c.tone === 'warn' ? M2.amber : M2.violet;
          const soft   = c.tone === 'good' ? M2.emeraldSoft : c.tone === 'warn' ? M2.amberSoft : M2.violetSoft;
          return (
            <MHGlass key={i} radius={20} style={{ padding: 16, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                  background: soft, color: accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{Glyph.bolt(accent)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: MH.ink, letterSpacing: -0.2 }}>{c.title}</div>
                  <div style={{ fontSize: 12.5, color: MH.ink2, marginTop: 3, lineHeight: 1.45 }}>{c.body}</div>
                </div>
              </div>
            </MHGlass>
          );
        })}
      </div>
      <MHNav active="insights" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen I — Settings
// ─────────────────────────────────────────────────────────────
function M2Row({ icon, label, detail, chevron = true, soft, color, danger, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '13px 16px',
      borderBottom: last ? 'none' : '0.5px solid rgba(20,20,60,0.06)',
    }}>
      {icon && (
        <div style={{
          width: 30, height: 30, borderRadius: 9, flexShrink: 0,
          background: soft || 'rgba(20,20,60,0.05)', color: color || MH.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
      )}
      <div style={{ flex: 1, fontSize: 14.5, fontWeight: 500, color: danger ? '#DC2626' : MH.ink, letterSpacing: -0.2 }}>{label}</div>
      {detail && <span style={{ fontSize: 13, color: MH.ink3 }}>{detail}</span>}
      {chevron && Glyph.chevronR(MH.ink3)}
    </div>
  );
}

function MHScreenSettings({ palette = 'violet', pattern = true }) {
  const glow = PALETTES[palette] || PALETTES.violet;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={pattern} />
      <div style={{ position: 'relative', padding: '60px 18px 110px' }}>
        <M2Header title="Settings" />

        {/* Profile-like header */}
        <MHGlass radius={22} style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <MHAvatar size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: MH.ink, letterSpacing: -0.3 }}>Alex Mercer</div>
            <div style={{ fontSize: 12, color: MH.ink3 }}>Local-first · 6 habits · since Feb 2026</div>
          </div>
        </MHGlass>

        <M2Heading>Context Engine</M2Heading>
        <MHGlass radius={20} style={{ overflow: 'hidden', marginBottom: 14 }}>
          <M2Row icon={Icon.pin(M2.violet)} soft={M2.violetSoft} color={M2.violet} label="Geofences" detail="3 places" />
          <M2Row icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={M2.violet} strokeWidth="1.7"/><path d="M12 7v5l3 2" stroke={M2.violet} strokeWidth="1.7" strokeLinecap="round"/></svg>
          )} soft={M2.violetSoft} color={M2.violet} label="Time blocks" detail="4 blocks" />
          <M2Row icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={M2.violet} strokeWidth="1.7"/><circle cx="12" cy="12" r="3" fill={M2.violet}/></svg>
          )} soft={M2.violetSoft} color={M2.violet} label="GPS drift tolerance" detail="±20 m" last />
        </MHGlass>

        <M2Heading>Nudges</M2Heading>
        <MHGlass radius={20} style={{ overflow: 'hidden', marginBottom: 14 }}>
          <M2Row icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 3H4l2-3Z" stroke={M2.amber} strokeWidth="1.7" strokeLinejoin="round"/></svg>
          )} soft={M2.amberSoft} color={M2.amber} label="Notification style" detail="Soft · Once" />
          <M2Row icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="12" rx="3" stroke={M2.amber} strokeWidth="1.7"/><circle cx="9" cy="12" r="1.5" fill={M2.amber}/></svg>
          )} soft={M2.amberSoft} color={M2.amber} label="Haptics" detail="On" />
          <M2Row icon={Glyph.pause(M2.amber)} soft={M2.amberSoft} color={M2.amber} label="Do not disturb windows" detail="2 set" last />
        </MHGlass>

        <M2Heading>Data · Local-first</M2Heading>
        <MHGlass radius={20} style={{ overflow: 'hidden', marginBottom: 14 }}>
          <M2Row icon={Glyph.download(M2.emerald)} soft={M2.emeraldSoft} color={M2.emerald} label="Export data as JSON" />
          <M2Row icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M5 7v13h14V7M9 11v6M15 11v6M9 4h6v3H9z" stroke={M2.sky} strokeWidth="1.6" strokeLinejoin="round"/></svg>
          )} soft={M2.skySoft} color={M2.sky} label="Backup to iCloud (off)" detail="Off" />
          <M2Row icon={Glyph.trash('#DC2626')} soft="rgba(220,38,38,0.10)" color="#DC2626" label="Wipe all local data" danger chevron={false} last />
        </MHGlass>

        <div style={{ textAlign: 'center', fontSize: 11, color: MH.ink3, padding: '8px 0' }}>
          MicroHabit AI · v0.4 · runs on-device
        </div>
      </div>
      <MHNav active="settings" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen J — Geofence map (pin drop)
// ─────────────────────────────────────────────────────────────
function MHScreenMap({ palette = 'violet', pattern = true }) {
  const glow = PALETTES[palette] || PALETTES.violet;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MHBackdrop glow={glow} pattern={false} />
      <div style={{ position: 'relative', padding: '60px 18px 0' }}>
        <M2Header title="New geofence" trailing={
          <div style={{
            padding: '8px 14px', borderRadius: 12, fontSize: 13, fontWeight: 600,
            color: '#fff', background: MH.emerald, boxShadow: MH.emeraldEdge,
          }}>Save</div>
        }/>
      </div>

      {/* Map */}
      <div style={{ position: 'absolute', top: 100, left: 18, right: 18, bottom: 220, borderRadius: 28, overflow: 'hidden',
        boxShadow: MH.glassShadow, border: '0.5px solid rgba(255,255,255,0.9)',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 360 460" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mapbg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFF6FF"/>
              <stop offset="100%" stopColor="#E0E7FF"/>
            </linearGradient>
            <radialGradient id="ring" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4"/>
              <stop offset="70%" stopColor="#A78BFA" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="360" height="460" fill="url(#mapbg)"/>
          {/* Streets */}
          <g stroke="#fff" strokeWidth="14" strokeLinecap="square" opacity="0.9">
            <line x1="-20" y1="120" x2="380" y2="160"/>
            <line x1="-20" y1="300" x2="380" y2="330"/>
            <line x1="80" y1="-20" x2="100" y2="500"/>
            <line x1="260" y1="-20" x2="280" y2="500"/>
          </g>
          <g stroke="#fff" strokeWidth="6" opacity="0.7">
            <line x1="-20" y1="220" x2="380" y2="235"/>
            <line x1="-20" y1="400" x2="380" y2="410"/>
            <line x1="170" y1="-20" x2="180" y2="500"/>
          </g>
          {/* Park */}
          <rect x="200" y="170" width="70" height="100" rx="8" fill="#BBF7D0" opacity="0.7"/>
          {/* Buildings */}
          <g fill="#C7D2FE" opacity="0.55">
            <rect x="20" y="40" width="50" height="60" rx="3"/>
            <rect x="20" y="170" width="50" height="40" rx="3"/>
            <rect x="20" y="350" width="50" height="50" rx="3"/>
            <rect x="120" y="40" width="40" height="100" rx="3"/>
            <rect x="200" y="40" width="50" height="100" rx="3"/>
            <rect x="290" y="40" width="50" height="60" rx="3"/>
            <rect x="290" y="170" width="50" height="100" rx="3"/>
            <rect x="200" y="350" width="60" height="50" rx="3"/>
            <rect x="290" y="340" width="50" height="60" rx="3"/>
            <rect x="120" y="350" width="50" height="60" rx="3"/>
          </g>
          {/* Geofence circle */}
          <circle cx="180" cy="240" r="120" fill="url(#ring)"/>
          <circle cx="180" cy="240" r="118" stroke="#7C3AED" strokeWidth="2" fill="none" strokeDasharray="6 6"/>
          {/* Pin */}
          <g transform="translate(180,240)">
            <circle r="36" fill="#7C3AED" opacity="0.2"/>
            <circle r="14" fill="#7C3AED" stroke="#fff" strokeWidth="3"/>
            <circle r="4" fill="#fff"/>
          </g>
        </svg>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, zIndex: 30 }}>
        <MHGlass radius={28} style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: M2.violetSoft, color: M2.violet,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{Icon.pin(M2.violet)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: MH.ink, letterSpacing: -0.3 }}>Home</div>
              <div style={{ fontSize: 12, color: MH.ink3 }}>47.6062° N · 122.3321° W</div>
            </div>
          </div>

          {/* Radius slider */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: MH.ink3, letterSpacing: 1.2, textTransform: 'uppercase' }}>Radius</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: M2.violet }}>120 m</span>
            </div>
            <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 3, background: 'rgba(20,20,60,0.08)' }}/>
              <div style={{ position: 'absolute', left: 0, width: '48%', height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${M2.violet}, #A78BFA)` }}/>
              <div style={{ position: 'absolute', left: '48%', width: 22, height: 22, marginLeft: -11, borderRadius: '50%', background: '#fff', boxShadow: '0 0 0 1px rgba(20,20,60,0.1), 0 4px 12px -2px rgba(124,58,237,0.4)' }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: MH.ink3, marginTop: 4 }}>
              <span>30 m</span><span>250 m</span>
            </div>
          </div>
        </MHGlass>
      </div>
    </div>
  );
}

Object.assign(window, {
  MHScreenEmpty, MHScreenLibrary, MHScreenCreate,
  MHScreenProgress, MHScreenInsights, MHScreenSettings, MHScreenMap,
});
