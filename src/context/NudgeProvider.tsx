import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { habitsRepo } from '../database/repositories/habitsRepo';
import { logsRepo } from '../database/repositories/logsRepo';
import { ContextSnapshot } from '../database/types';
import { generateRationale } from '../services/nudge/rationale';
import { pickTopHabit, ScoredHabit } from '../services/nudge/scoring';
import { useAppContext } from './AppContextProvider';

export interface ActiveNudge {
  scored: ScoredHabit;
  rationale: string;
}

interface NudgeContextValue {
  activeNudge: ActiveNudge | null;
  loading: boolean;
  refresh: () => Promise<void>;
  markDone: () => Promise<void>;
  snooze: () => Promise<void>;
}

const NudgeContext = createContext<NudgeContextValue | null>(null);

export function NudgeProvider({ children }: { children: React.ReactNode }) {
  const { currentContext } = useAppContext();
  const [activeNudge, setActiveNudge] = useState<ActiveNudge | null>(null);
  const [loading, setLoading] = useState(true);

  const snapshot = useCallback((): ContextSnapshot => ({
    location: currentContext.location,
    latitude: currentContext.latitude,
    longitude: currentContext.longitude,
    hour: currentContext.rawTime.getHours(),
    dayOfWeek: currentContext.rawTime.getDay(),
    timeWindowKey: currentContext.timeWindow?.key ?? null,
  }), [currentContext]);

  const refresh = useCallback(async () => {
    setLoading(true);
    const habits = await habitsRepo.list();
    const top = await pickTopHabit({
      habits,
      location: currentContext.location,
      window: currentContext.timeWindow,
    });
    if (top) {
      const rationale = generateRationale(top, {
        location: currentContext.location,
        window: currentContext.timeWindow,
      });
      setActiveNudge({ scored: top, rationale });
    } else {
      setActiveNudge(null);
    }
    setLoading(false);
  }, [currentContext]);

  useEffect(() => { void refresh(); }, [refresh]);

  const markDone = useCallback(async () => {
    if (!activeNudge) return;
    const id = activeNudge.scored.habit.id;
    await logsRepo.logHabitAction(id, 'completed', snapshot());
    await habitsRepo.bumpStreak(id, 1);
    await refresh();
  }, [activeNudge, snapshot, refresh]);

  const snooze = useCallback(async () => {
    if (!activeNudge) return;
    const id = activeNudge.scored.habit.id;
    await logsRepo.logHabitAction(id, 'snoozed', snapshot());
    // Notification scheduling is performed by the NotificationProvider via subscription.
    // We just record the snooze here; the UI listens and dispatches the schedule.
    await refresh();
  }, [activeNudge, snapshot, refresh]);

  const value = useMemo<NudgeContextValue>(
    () => ({ activeNudge, loading, refresh, markDone, snooze }),
    [activeNudge, loading, refresh, markDone, snooze],
  );

  return <NudgeContext.Provider value={value}>{children}</NudgeContext.Provider>;
}

export function useNudge(): NudgeContextValue {
  const v = useContext(NudgeContext);
  if (!v) throw new Error('useNudge must be used inside <NudgeProvider>');
  return v;
}
