/**
 * Design tokens for MicroHabit AI.
 * Locked to the supplied mockup — every magic number here is observable in the design.
 */

export const Colors = {
  // Surfaces
  canvas: '#F5F7FB',
  canvasTint: '#EEF2F8',
  white: '#FFFFFF',

  // Ink (text)
  ink900: '#0B0D12',
  ink700: '#1A1D23',
  ink500: '#5A6172',
  ink400: '#8A92A3',
  ink300: '#B6BCC9',
  ink200: '#D9DEE7',

  // Brand
  brandPurple: '#7C3AED',
  brandPurpleSoft: '#EDE6FF',
  brandPurpleGlow: '#C4B5FD',

  // Accents
  mint: '#10B981',
  mintGlow: '#34D399',
  mintDeep: '#059669',
  sky: '#3B82F6',
  skySoft: '#DBEAFE',

  // Glass card gradient stops (Live Context)
  glassFrom: '#E4F4F1',
  glassMid: '#E8ECF8',
  glassTo: '#F0EAFB',

  // Shadow
  shadowSoft: 'rgba(11, 13, 18, 0.06)',
  shadowGlow: 'rgba(124, 58, 237, 0.18)',
} as const;

export const Radii = {
  pill: 999,
  card: 28,
  cardInner: 20,
  chip: 14,
  iconTile: 14,
} as const;

export const Spacing = {
  px: 1,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

export const Type = {
  // Top date label
  date: { size: 13, weight: '600' as const, tracking: 1.6, color: Colors.ink400 },
  // "Welcome back, Alex."
  hero: { size: 34, weight: '800' as const, tracking: -0.5, color: Colors.ink900 },
  // "Your moment is now."
  subHero: { size: 19, weight: '400' as const, color: Colors.ink500 },
  // Card eyebrow ("LIVE CONTEXT", "YOUR PERSONAL NUDGE")
  eyebrow: { size: 12, weight: '600' as const, tracking: 1.6, color: Colors.ink400 },
  // "YOU ARE HOME"
  displayBold: { size: 28, weight: '900' as const, tracking: -0.3, color: Colors.ink900 },
  // Nudge title "Read 5 pages of your book."
  title: { size: 22, weight: '700' as const, color: Colors.ink900 },
  // Chips
  chip: { size: 13, weight: '500' as const, color: Colors.ink700 },
  // Why now body
  bodyMd: { size: 15, weight: '400' as const, color: Colors.ink700 },
  // Buttons
  buttonLg: { size: 16, weight: '600' as const, color: Colors.white },
  // Tab labels
  tab: { size: 12, weight: '500' as const },
} as const;

export const Shadows = {
  card: {
    shadowColor: '#0B0D12',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  glow: {
    shadowColor: Colors.brandPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 8,
  },
  buttonGreen: {
    shadowColor: Colors.mint,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
} as const;

export type ColorToken = keyof typeof Colors;
