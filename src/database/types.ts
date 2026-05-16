export type HabitContextType = 'location' | 'time' | 'compound';
export type HabitLogStatus = 'completed' | 'snoozed' | 'skipped';

export interface Habit {
  id: string;
  title: string;
  category: string;
  icon: string;
  duration_minutes: number;
  target_context_type: HabitContextType;
  target_context_value: string;
  current_streak: number;
  max_streak: number;
  is_active: number; // 0 | 1 — SQLite has no bool
  created_at: string;
  updated_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  timestamp: string;
  status: HabitLogStatus;
  context_snapshot: string; // JSON-encoded ContextSnapshot
}

export interface ContextSnapshot {
  location: string;
  latitude: number | null;
  longitude: number | null;
  hour: number;       // 0-23
  dayOfWeek: number;  // 0-6, 0=Sun
  timeWindowKey: string | null;
}
