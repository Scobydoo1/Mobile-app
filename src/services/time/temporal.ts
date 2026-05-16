/**
 * Lightweight temporal tick.
 *
 * Fires a callback every `intervalMs` (default 60 s) and resolves the current time-window.
 * Used by the AppContextProvider to refresh the live-context card + re-score the active nudge.
 */
import { resolveTimeWindow, TimeWindow } from '../../utils/timeWindows';

export interface TemporalTick {
  now: Date;
  window: TimeWindow | null;
}

type TickListener = (tick: TemporalTick) => void;

let handle: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<TickListener>();

export function startTemporal(intervalMs = 60_000): void {
  if (handle) return;
  emit();
  handle = setInterval(emit, intervalMs);
}

export function stopTemporal(): void {
  if (handle) {
    clearInterval(handle);
    handle = null;
  }
}

export function onTick(fn: TickListener): () => void {
  listeners.add(fn);
  // immediate emit so subscribers don't wait up to a full interval
  fn(currentTick());
  return () => listeners.delete(fn);
}

export function currentTick(): TemporalTick {
  const now = new Date();
  return { now, window: resolveTimeWindow(now) };
}

function emit(): void {
  const tick = currentTick();
  for (const l of listeners) l(tick);
}
