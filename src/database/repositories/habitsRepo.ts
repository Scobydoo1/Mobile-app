import { getDb } from '../db';
import { Habit, HabitContextType } from '../types';
import { uuid } from '../../utils/uuid';

export interface CreateHabitInput {
  title: string;
  category: string;
  icon?: string;
  duration_minutes?: number;
  target_context_type: HabitContextType;
  target_context_value: string;
}

export const habitsRepo = {
  async list(): Promise<Habit[]> {
    return getDb().getAllAsync<Habit>(
      'SELECT * FROM habits WHERE is_active = 1 ORDER BY created_at DESC',
    );
  },

  async getById(id: string): Promise<Habit | null> {
    const row = await getDb().getFirstAsync<Habit>('SELECT * FROM habits WHERE id = ?', [id]);
    return row ?? null;
  },

  async create(input: CreateHabitInput): Promise<Habit> {
    const now = new Date().toISOString();
    const habit: Habit = {
      id: uuid(),
      title: input.title,
      category: input.category,
      icon: input.icon ?? 'sparkle',
      duration_minutes: input.duration_minutes ?? 2,
      target_context_type: input.target_context_type,
      target_context_value: input.target_context_value,
      current_streak: 0,
      max_streak: 0,
      is_active: 1,
      created_at: now,
      updated_at: now,
    };
    await getDb().runAsync(
      `INSERT INTO habits
        (id, title, category, icon, duration_minutes, target_context_type, target_context_value,
         current_streak, max_streak, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        habit.id, habit.title, habit.category, habit.icon, habit.duration_minutes,
        habit.target_context_type, habit.target_context_value,
        habit.current_streak, habit.max_streak, habit.is_active, habit.created_at, habit.updated_at,
      ],
    );
    return habit;
  },

  async update(id: string, patch: Partial<Habit>): Promise<void> {
    const keys = Object.keys(patch).filter((k) => k !== 'id');
    if (!keys.length) return;
    const sets = keys.map((k) => `${k} = ?`).join(', ');
    const values = keys.map((k) => (patch as Record<string, unknown>)[k]);
    await getDb().runAsync(
      `UPDATE habits SET ${sets}, updated_at = ? WHERE id = ?;`,
      [...(values as (string | number | null)[]), new Date().toISOString(), id],
    );
  },

  /**
   * Find candidate habits matching a context dimension.
   * - 'location' → habits whose target_context_value equals the place (or compound habits containing it).
   * - 'time'     → habits whose target_context_value equals the time-window key/label.
   */
  async getByContext(type: 'location' | 'time', value: string): Promise<Habit[]> {
    if (type === 'location') {
      return getDb().getAllAsync<Habit>(
        `SELECT * FROM habits
         WHERE is_active = 1
           AND (
             (target_context_type = 'location' AND target_context_value = ?)
             OR (target_context_type = 'compound' AND target_context_value LIKE ?)
           )`,
        [value, `${value}@%`],
      );
    }
    return getDb().getAllAsync<Habit>(
      `SELECT * FROM habits
       WHERE is_active = 1
         AND (
           (target_context_type = 'time' AND target_context_value = ?)
           OR (target_context_type = 'compound' AND target_context_value LIKE ?)
         )`,
      [value, `%@${value}`],
    );
  },

  async bumpStreak(id: string, delta: number): Promise<void> {
    const habit = await this.getById(id);
    if (!habit) return;
    const next = Math.max(0, habit.current_streak + delta);
    const max = Math.max(habit.max_streak, next);
    await this.update(id, { current_streak: next, max_streak: max });
  },
};
