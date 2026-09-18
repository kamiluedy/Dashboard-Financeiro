import type { Period } from '../types';

interface PeriodFilterProps {
  value: Period;
  onChange: (period: Period) => void;
}

const OPTIONS: { value: Period; label: string }[] = [
  { value: 'today', label: 'Hoje' },
  { value: '7d', label: '7 dias' },
  { value: '30d', label: '30 dias' },
];

/** Seletor de período usado nas telas de Gráficos e Dashboard. */
export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div className="flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            value === opt.value
              ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
