import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { setupNotifications } from '../services/notifications/setup';
import { cancelScheduled, scheduleSnooze } from '../services/notifications/scheduler';
import { registerDeepLinkHandler } from '../services/notifications/deepLink';
import { habitsRepo } from '../database/repositories/habitsRepo';

interface NotificationContextValue {
  /** Schedule a snooze for the given habit, returns the OS notification id. */
  scheduleSnoozeFor: (habitId: string, title: string, whyNow: string) => Promise<string | null>;
  cancel: (id: string) => Promise<void>;
  /** Habit id received via deep-link tap (consumed by screens to scroll/open). */
  pendingDeepLinkHabitId: string | null;
  clearPendingDeepLink: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<string | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    void setupNotifications();
    cleanupRef.current = registerDeepLinkHandler(async (habitId) => {
      // Guard: only surface if the habit still exists & is active
      const h = await habitsRepo.getById(habitId);
      if (h && h.is_active === 1) setPending(habitId);
    });
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  const value = useMemo<NotificationContextValue>(() => ({
    scheduleSnoozeFor: scheduleSnooze,
    cancel: cancelScheduled,
    pendingDeepLinkHabitId: pending,
    clearPendingDeepLink: () => setPending(null),
  }), [pending]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications(): NotificationContextValue {
  const v = useContext(NotificationContext);
  if (!v) throw new Error('useNotifications must be used inside <NotificationProvider>');
  return v;
}
