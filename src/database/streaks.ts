import { getDb } from './db';

interface DayRow { day: string; }

/**
 * Streak = number of *consecutive* prior days (counting today if completed) with at least one
 * `completed` log. Computed in SQL by grouping logs into local-day buckets.
 *
 * NOTE: SQLite's `date()` operates in UTC by default; we apply the device's offset so
 * the bucket reflects the user's local day.
 */
export async function calculateStreak(habitId: string): Promise<{ current: number; max: number }> {
  const offsetMin = -new Date().getTimezoneOffset();
  const offsetHours = offsetMin / 60;
  const tzModifier = `${offsetHours >= 0 ? '+' : ''}${offsetHours} hours`;

  const rows = await getDb().getAllAsync<DayRow>(
    `SELECT DISTINCT date(timestamp, ?) AS day
     FROM habit_logs
     WHERE habit_id = ? AND status = 'completed'
     ORDER BY day DESC`,
    [tzModifier, habitId],
  );

  if (!rows.length) return { current: 0, max: 0 };

  const days = rows.map((r) => r.day);
  const todayISO = new Date().toISOString().slice(0, 10);

  // current streak
  let current = 0;
  let cursor = todayISO;
  for (const d of days) {
    if (d === cursor) {
      current += 1;
      cursor = prevDay(cursor);
    } else if (d === prevDay(cursor)) {
      // yesterday counts if today wasn't yet done
      if (current === 0) {
        current += 1;
        cursor = prevDay(d);
      } else {
        break;
      }
    } else {
      break;
    }
  }

  // max streak: longest run in `days`
  let max = 0;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    if (days[i] === prevDay(days[i - 1])) {
      run += 1;
    } else {
      max = Math.max(max, run);
      run = 1;
    }
  }
  max = Math.max(max, run, current);

  return { current, max };
}

function prevDay(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
