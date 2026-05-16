const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** "SATURDAY · MAY 16" — matches the mockup header. */
export function formatHeaderDate(d: Date): string {
  const dow = WEEKDAYS[d.getDay()];
  const mon = MONTHS[d.getMonth()];
  const day = d.getDate();
  return `${dow} · ${mon} ${day}`;
}

/** "6:15 PM" — matches the live-context time chip. */
export function formatClock(d: Date): string {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  const mm = m < 10 ? `0${m}` : `${m}`;
  return `${h}:${mm} ${ampm}`;
}

/** Hours-as-decimal helper for time-window matching (e.g. 18.5 for 6:30 PM). */
export function hoursDecimal(d: Date): number {
  return d.getHours() + d.getMinutes() / 60;
}

export function hoursAgo(thenISO: string, now = new Date()): number {
  const then = new Date(thenISO).getTime();
  return (now.getTime() - then) / 3_600_000;
}
