import { hoursDecimal } from './dates';

export type TimeWindowKey = 'early_morning' | 'morning' | 'midday' | 'afternoon' | 'wind_down' | 'evening' | 'night';

export interface TimeWindow {
  key: TimeWindowKey;
  label: string;          // "Wind-down · Evening"
  rangeLabel: string;     // "6–7 PM" — used by rationale generator
  startH: number;
  endH: number;
}

/**
 * The canonical day-blocks the temporal engine knows about.
 * NOTE: keep ranges non-overlapping and sorted; `resolveTimeWindow` returns the first that matches.
 */
export const TIME_WINDOWS: TimeWindow[] = [
  { key: 'early_morning', label: 'Pre-dawn',            rangeLabel: '4–6 AM',  startH: 4,  endH: 6 },
  { key: 'morning',       label: 'Morning',             rangeLabel: '6–9 AM',  startH: 6,  endH: 9 },
  { key: 'midday',        label: 'Midday',              rangeLabel: '11 AM–1 PM', startH: 11, endH: 13 },
  { key: 'afternoon',     label: 'Afternoon',           rangeLabel: '1–5 PM',  startH: 13, endH: 17 },
  { key: 'wind_down',     label: 'Wind-down · Evening', rangeLabel: '6–7 PM',  startH: 18, endH: 19 },
  { key: 'evening',       label: 'Evening',             rangeLabel: '7–10 PM', startH: 19, endH: 22 },
  { key: 'night',         label: 'Night',               rangeLabel: '10 PM–2 AM', startH: 22, endH: 26 }, // wraps past midnight
];

export function resolveTimeWindow(d: Date = new Date()): TimeWindow | null {
  const h = hoursDecimal(d);
  for (const w of TIME_WINDOWS) {
    const start = w.startH;
    const end = w.endH > 24 ? w.endH - 24 : w.endH;
    if (w.endH > 24) {
      if (h >= start || h < end) return w;
    } else if (h >= start && h < end) {
      return w;
    }
  }
  return null;
}

/** Used by the nudge engine to compare a habit's `target_context_value` to the current time. */
export function timeWindowMatches(targetValue: string, d: Date = new Date()): boolean {
  const w = resolveTimeWindow(d);
  if (!w) return false;
  // Accept either window key or human range
  return targetValue === w.key || targetValue === w.rangeLabel || targetValue === w.label;
}
