import { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import type { Theme } from '../../hooks/useTheme';

interface SettingsViewProps {
  theme: Theme;
  onToggleTheme: () => void;
}

/** Preferências do usuário: nome, tema e notificações (toggle local persistido). */
export function SettingsView({ theme, onToggleTheme }: SettingsViewProps) {
  const { name, setName } = useProfile();
  const [nameDraft, setNameDraft] = useState(name);
  const [notificationsOn, setNotificationsOn] = useState(
    () => localStorage.getItem('dashboard-notifications') !== 'off',
  );

  function saveName() {
    const trimmed = nameDraft.trim();
    if (trimmed) setName(trimmed);
  }

  function toggleNotifications() {
    setNotificationsOn((prev) => {
      const next = !prev;
      localStorage.setItem('dashboard-notifications', next ? 'on' : 'off');
      return next;
    });
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-[var(--text-primary)]">Configurações</h1>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">Gerencie suas preferências do dashboard.</p>

      <div className="max-w-lg space-y-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
          <label htmlFor="settings-name" className="mb-2 block text-sm text-[var(--text-secondary)]">
            Nome de exibição
          </label>
          <div className="flex gap-2">
            <input
              id="settings-name"
              type="text"
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              maxLength={40}
              className="flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-brand-500"
            />
            <button
              onClick={saveName}
              className="rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-medium text-white"
            >
              Salvar
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">Tema escuro</p>
            <p className="text-xs text-[var(--text-secondary)]">Alterna entre tema escuro (roxo neon) e claro.</p>
          </div>
          <ToggleSwitch checked={theme === 'dark'} onChange={onToggleTheme} />
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">Notificações</p>
            <p className="text-xs text-[var(--text-secondary)]">Receber alertas sobre novos relatórios.</p>
          </div>
          <ToggleSwitch checked={notificationsOn} onChange={toggleNotifications} />
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        checked ? 'bg-gradient-to-r from-brand-500 to-brand-600' : 'bg-[var(--bg-surface-hover)]'
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}
