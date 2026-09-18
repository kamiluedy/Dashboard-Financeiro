import { useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import type { Period } from '../../types';
import { PeriodFilter } from '../PeriodFilter';
import { VolumeAreaChart } from '../VolumeAreaChart';
import { CategoryBarChart } from '../CategoryBarChart';

type ChartKind = 'volume' | 'category';

/** Página de exploração de gráficos: permite trocar período e alternar entre visualização de volume e categoria. */
export function ChartView() {
  const [period, setPeriod] = useState<Period>('today');
  const [kind, setKind] = useState<ChartKind>('volume');
  const now = new Date();
  const { data, error } = useAnalytics({ period, year: now.getFullYear(), month: now.getMonth() });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-[var(--text-primary)]">Gráficos</h1>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">Explore os dados em diferentes visualizações.</p>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1">
          {(['volume', 'category'] as ChartKind[]).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                kind === k
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {k === 'volume' ? 'Fluxo de Caixa' : 'Gastos'}
            </button>
          ))}
        </div>
        <PeriodFilter value={period} onChange={setPeriod} />
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-negative/40 bg-negative/10 px-4 py-3 text-sm text-negative">
          {error}
        </div>
      )}

      <div className="h-96">
        {data ? (
          kind === 'volume' ? (
            <VolumeAreaChart data={data.volumeSeries} />
          ) : (
            <CategoryBarChart data={data.categoryBreakdown} />
          )
        ) : (
          <div className="h-full animate-pulse rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]" />
        )}
      </div>
    </div>
  );
}
