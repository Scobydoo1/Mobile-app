import { Habit } from '../../database/types';
import { TimeWindow } from '../../utils/timeWindows';
import { ScoredHabit } from './scoring';

const CATEGORY_VERBS: Record<string, string> = {
  wind_down: 'read',
  morning: 'do this',
  health: 'hydrate',
  mindfulness: 'pause',
  fitness: 'move',
};

/**
 * Generates the "Why now" rationale sentence shown in the nudge sub-card.
 *
 * Examples:
 *   "You usually read between 6–7 PM. Picking up where you left off in your book."
 *   "You're home and this is your usual wind-down window."
 *   "It's been a while — a tiny nudge to keep the streak alive."
 */
export function generateRationale(scored: ScoredHabit, ctx: { location: string; window: TimeWindow | null }): string {
  const { habit, breakdown } = scored;
  const verb = CATEGORY_VERBS[habit.category] ?? 'do this';
  const range = ctx.window?.rangeLabel;
  const hasLoc = breakdown.location > 0;
  const hasTime = breakdown.time > 0;

  if (hasLoc && hasTime && range) {
    return `You usually ${verb} between ${range}. ${tailFor(habit)}`;
  }
  if (hasTime && range) {
    return `You usually ${verb} between ${range}. A small win in 2 minutes.`;
  }
  if (hasLoc) {
    return `You're ${ctx.location.toLowerCase()} and this is your usual moment for it.`;
  }
  if (breakdown.recency > 0) {
    return `It's been a while — a tiny nudge to keep the streak alive.`;
  }
  return `A quick 2-minute habit to keep momentum.`;
}

function tailFor(habit: Habit): string {
  switch (habit.category) {
    case 'wind_down':
      return `Picking up where you left off in "Sapiens".`;
    case 'health':
      return `A small win in under a minute.`;
    case 'mindfulness':
      return `Two minutes of stillness — that's all.`;
    default:
      return `A small win in under 2 minutes.`;
  }
}
