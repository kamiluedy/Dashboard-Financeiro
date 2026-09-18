import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface HeaderProps {
  title: string;
  theme: Theme;
  onToggleTheme: () => void;
}

/** Barra superior com título da página atual e alternância de tema. */
export function Header({ title, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-4">
      <span className="text-sm font-medium text-[var(--text-secondary)]">{title}</span>
      <button
        onClick={onToggleTheme}
        aria-label="Alternar tema"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}
