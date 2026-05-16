import { Habit } from '../../database/types';
import { logsRepo } from '../../database/repositories/logsRepo';
import { TimeWindow } from '../../utils/timeWindows';
import { hoursAgo } from '../../utils/dates';

/**
 * Heuristic scoring — picks the most relevant habit for the *now*.
 *
 *   Location match           +50
 *   Time-window match        +30
 *   Recency buffer (>12 h)   +20
 *   Streak momentum (>=3)    +5
 */
export const WEIGHTS = {
  location: 50,
  time: 30,
  recency: 20,
  streak: 5,
} as const;

const RECENCY_BUFFER_HOURS = 12;

export interface ScoreInput {
  habits: Habit[];
  location: string;
  window: TimeWindow | null;
}

export interface ScoredHabit {
  habit: Habit;
  score: number;
  breakdown: Record<string, number>;
}

export async function scoreHabits(input: ScoreInput): Promise<ScoredHabit[]> {
  const { habits, location, window } = input;
  const scored: ScoredHabit[] = [];

  for (const h of habits) {
    const breakdown: Record<string, number> = {};
    let score = 0;

    // --- location match
    if (h.target_context_type === 'location' && h.target_context_value === location) {
      breakdown.location = WEIGHTS.location;
      score += WEIGHTS.location;
    } else if (h.target_context_type === 'compound') {
      const [loc] = h.target_context_value.split('@');
      if (loc === location) {
        breakdown.location = WEIGHTS.location;
        score += WEIGHTS.location;
      }
    }

    // --- time-window match
    const windowKey = window?.key;
    const windowLabel = window?.label;
    const windowRange = window?.rangeLabel;
    const matchesTime = (val: string) =>
      val === windowKey || val === windowLabel || val === windowRange;

    if (h.target_context_type === 'time' && matchesTime(h.target_context_value)) {
      breakdown.time = WEIGHTS.time;
      score += WEIGHTS.time;
    } else if (h.target_context_type === 'compound') {
      const [, time] = h.target_context_value.split('@');
      if (time && matchesTime(time)) {
        breakdown.time = WEIGHTS.time;
        score += WEIGHTS.time;
      }
    }

    // --- recency buffer
    const last = await logsRepo.lastCompletedAt(h.id);
    if (!last || hoursAgo(last) >= RECENCY_BUFFER_HOURS) {
      breakdown.recency = WEIGHTS.recency;
      score += WEIGHTS.recency;
    }

    // --- streak momentum
    if (h.current_streak >= 3) {
      breakdown.streak = WEIGHTS.streak;
      score += WEIGHTS.streak;
    }

    scored.push({ habit: h, score, breakdown });
  }

  return scored.sort((a, b) => b.score - a.score);
}

export async function pickTopHabit(input: ScoreInput): Promise<ScoredHabit | null> {
  const ranked = await scoreHabits(input);
  return ranked.find((r) => r.score > 0) ?? null;
}
