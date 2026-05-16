/**
 * Design tokens for MicroHabit AI.
 * Locked to the supplied Claude Design mockup (microhabit.jsx). Every magic
 * number here maps to something observable in the source design file.
 */

export const Colors = {
  // Surfaces
  canvas: '#FBFAFE',
  canvasTint: '#F5F3FA',
  white: '#FFFFFF',
  glass: 'rgba(255,255,255,0.62)',
  glassEdge: 'rgba(255,255,255,0.95)',

  // Ink (text) — alpha-ramped over near-black like the source
  ink900: '#15151B',
  ink700: 'rgba(21,21,27,0.78)',
  ink500: 'rgba(21,21,27,0.62)',
  ink400: 'rgba(21,21,27,0.50)',
  ink300: 'rgba(21,21,27,0.38)',
  ink200: 'rgba(21,21,27,0.16)',
  ink100: 'rgba(21,21,27,0.08)',
  ink050: 'rgba(21,21,27,0.05)',

  // Brand violet (AI accent, "Why now", active tab)
  brandPurple: '#7C3AED',
  brandPurpleDeep: '#5B21B6',
  brandPurpleSoft: 'rgba(124,58,237,0.10)',
  brandPurpleSofter: 'rgba(124,58,237,0.05)',
  brandPurpleGlow: '#C4B5FD',
  brandPurpleEdge: 'rgba(124,58,237,0.18)',

  // Glow stops (cascaded per "palette" tweak)
  glowVioletA: '#A78BFA',
  glowVioletB: '#60A5FA',
  glowMintA: '#86EFAC',
  glowMintB: '#60A5FA',
  glowPeachA: '#FDBA74',
  glowPeachB: '#F0ABFC',

  // Emerald "Done" gradient
  emeraldFrom: '#34D399',
  emeraldTo: '#059669',

  // Slate "Snooze" gradient
  slateFrom: 'rgba(255,255,255,0.85)',
  slateTo: 'rgba(241,243,250,0.85)',

  // Sky for the time chip glow
  sky: '#3B82F6',
  skySoft: '#DBEAFE',

  // Streak flame
  flameFrom: '#FB923C',
  flameTo: '#EA580C',
} as const;

export const Radii = {
  pill: 999,
  card: 32,
  cardSm: 28,
  cardXs: 22,
  chip: 14,
  iconTile: 12,
  button: 18,
} as const;

export const Spacing = {
  px: 1,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 14,
  xl: 18,
  '2xl': 22,
  '3xl': 28,
  '4xl': 40,
} as const;

export const Type = {
  date: { size: 12, weight: '600' as const, tracking: 1.2, color: Colors.ink300 },
  hero: { size: 28, weight: '700' as const, tracking: -0.8, color: Colors.ink900 },
  subHero: { size: 17, weight: '400' as const, tracking: -0.2, color: Colors.ink500 },
  eyebrow: { size: 11, weight: '600' as const, tracking: 1.4, color: Colors.ink300 },
  displayBold: { size: 26, weight: '700' as const, tracking: -0.6, color: Colors.ink900 },
  cardLabel: { size: 12, weight: '600' as const, tracking: 0.2, color: Colors.ink500 },
  title: { size: 22, weight: '600' as const, tracking: -0.4, color: Colors.ink900 },
  chip: { size: 13, weight: '600' as const, color: Colors.ink900 },
  metaChip: { size: 11, weight: '500' as const, color: Colors.ink500 },
  bodyMd: { size: 13, weight: '400' as const, color: Colors.ink500 },
  buttonLg: { size: 16, weight: '600' as const, color: Colors.white },
  buttonMd: { size: 15, weight: '600' as const, color: Colors.ink900 },
  tab: { size: 11, weight: '500' as const },
} as const;

export const Shadows = {
  card: {
    shadowColor: '#3C2890',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 40,
    elevation: 6,
  },
  cardSoft: {
    shadowColor: '#14142C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  glow: {
    shadowColor: Colors.brandPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  buttonEmerald: {
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 6,
  },
  buttonSlate: {
    shadowColor: '#14143C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
} as const;

/**
 * Glow palette presets (selectable via the "Tweaks" panel in the design).
 * Each entry is the two-stop radial gradient used by the backdrop + context card.
 */
export const GlowPalettes = {
  violet: [Colors.glowVioletA, Colors.glowVioletB] as const,
  mint: [Colors.glowMintA, Colors.glowMintB] as const,
  peach: [Colors.glowPeachA, Colors.glowPeachB] as const,
} as const;

export type GlowPalette = keyof typeof GlowPalettes;
export type ColorToken = keyof typeof Colors;
