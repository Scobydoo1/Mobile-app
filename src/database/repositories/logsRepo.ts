import { getDb } from '../db';
import { ContextSnapshot, HabitLog, HabitLogStatus } from '../types';
import { uuid } from '../../utils/uuid';

export const logsRepo = {
  async logHabitAction(
    habitId: string,
    status: HabitLogStatus,
    context: ContextSnapshot,
  ): Promise<HabitLog> {
    const row: HabitLog = {
      id: uuid(),
      habit_id: habitId,
      timestamp: new Date().toISOString(),
      status,
      context_snapshot: JSON.stringify(context),
    };
    await getDb().runAsync(
      `INSERT INTO habit_logs (id, habit_id, timestamp, status, context_snapshot)
       VALUES (?, ?, ?, ?, ?);`,
      [row.id, row.habit_id, row.timestamp, row.status, row.context_snapshot],
    );
    return row;
  },

  async getRecentForHabit(habitId: string, sinceISO: string): Promise<HabitLog[]> {
    return getDb().getAllAsync<HabitLog>(
      `SELECT * FROM habit_logs
       WHERE habit_id = ? AND timestamp >= ?
       ORDER BY timestamp DESC`,
      [habitId, sinceISO],
    );
  },

  async lastCompletedAt(habitId: string): Promise<string | null> {
    const row = await getDb().getFirstAsync<{ timestamp: string }>(
      `SELECT timestamp FROM habit_logs
       WHERE habit_id = ? AND status = 'completed'
       ORDER BY timestamp DESC LIMIT 1`,
      [habitId],
    );
    return row?.timestamp ?? null;
  },

  async lastActionAt(habitId: string): Promise<string | null> {
    const row = await getDb().getFirstAsync<{ timestamp: string }>(
      `SELECT timestamp FROM habit_logs
       WHERE habit_id = ?
       ORDER BY timestamp DESC LIMIT 1`,
      [habitId],
    );
    return row?.timestamp ?? null;
  },
};
