import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initDatabase } from '../database/db';
import { seedDemoData } from '../database/seed';

interface DatabaseContextValue {
  ready: boolean;
  error: string | null;
}

const DatabaseContext = createContext<DatabaseContextValue>({ ready: false, error: null });

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await initDatabase();
        await seedDemoData();
        setReady(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  const value = useMemo(() => ({ ready, error }), [ready, error]);
  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
}

export function useDatabaseReady(): DatabaseContextValue {
  return useContext(DatabaseContext);
}
