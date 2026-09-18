import { useCallback, useState } from 'react';

const STORAGE_KEY = 'dashboard-apps-enabled';

const DEFAULT_ENABLED: Record<string, boolean> = {
  reports: true,
  notifications: true,
  calendar: false,
  mail: false,
  team: false,
  billing: false,
  goals: false,
  'region-sales': false,
};

function readStored(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ENABLED;
    return { ...DEFAULT_ENABLED, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_ENABLED;
  }
}

/** Módulos ativáveis pelo usuário. "goals" e "region-sales" refletem painéis extras no Dashboard. */
export function useAppsEnabled() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(readStored);

  const toggle = useCallback((id: string) => {
    setEnabled((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  return { enabled, toggle };
}
