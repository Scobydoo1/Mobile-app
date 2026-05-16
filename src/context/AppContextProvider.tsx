import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TimeWindow, resolveTimeWindow } from '../utils/timeWindows';
import { formatClock } from '../utils/dates';
import {
  getLastFix,
  onPlaceChange,
  PlaceFix,
  startGeofence,
} from '../services/location/geofence';
import { onTick, startTemporal } from '../services/time/temporal';

export interface AppContextValue {
  currentContext: {
    location: string;       // 'Home' | 'On the Move' | 'Unknown'
    timeString: string;     // "6:15 PM"
    rawTime: Date;
    timeWindow: TimeWindow | null;
    latitude: number | null;
    longitude: number | null;
    contextChangedAt: string;
  };
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [place, setPlace] = useState<PlaceFix>(getLastFix());
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    void startGeofence();
    startTemporal(60_000);

    const offPlace = onPlaceChange(setPlace);
    const offTick = onTick(({ now }) => setNow(now));

    return () => {
      offPlace();
      offTick();
    };
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    currentContext: {
      location: place.place,
      timeString: formatClock(now),
      rawTime: now,
      timeWindow: resolveTimeWindow(now),
      latitude: place.latitude,
      longitude: place.longitude,
      contextChangedAt: place.fixedAt,
    },
  }), [place, now]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const v = useContext(AppContext);
  if (!v) throw new Error('useAppContext must be used inside <AppContextProvider>');
  return v;
}
