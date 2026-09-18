import { useCallback, useState } from 'react';

const STORAGE_KEY = 'dashboard-profile-name';
const DEFAULT_NAME = 'Usuário';

/** Nome de exibição do usuário, persistido em localStorage. */
export function useProfile() {
  const [name, setNameState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_NAME;
    } catch {
      return DEFAULT_NAME;
    }
  });

  const setName = useCallback((next: string) => {
    setNameState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }, []);

  return { name, setName };
}
