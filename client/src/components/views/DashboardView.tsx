import { useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Download, Wallet } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useAppsEnabled } from '../../hooks/useAppsEnabled';
import { PeriodFilter } from '../PeriodFilter';
import { VolumeAreaChart } from '../VolumeAreaChart';
import { CategoryBarChart } from '../CategoryBarChart';
import { CategoryPieChart } from '../CategoryPieChart';
import { CategoryRankingChart } from '../CategoryRankingChart';
import { exportDashboardPdf } from '../../lib/exportPdf';
import type { Goal, Period, RegionSales } from '../../types';

const GOALS: Goal[] = [
  { id: 'reserva', label: 'Reserva de emergência', target: 20000, current: 13500 },
  { id: 'expansao', label: 'Expansão de equipe', target: 50000, current: 18750 },
];

const REGION_SALES: RegionSales[] = [
  { region: 'Matriz - SP', value: 42000 },
  { region: 'Filial - RJ', value: 27500 },
  { region: 'Filial - MG', value: 19800 },
  { region: 'Filial - RS', value: 15200 },
];

/** Painel principal: cards de resumo e os widgets de gráfico ativados na tela de Gráficos. */
export function DashboardView() {
  const [period, setPeriod] = useState<Period>('today');
  const { enabled } = useAppsEnabled();
  const now = new Date();
  const { data, error } = useAnalytics({ period, year: now.getFullYear(), month: now.getMonth() });
  const chartRef = useRef<HTMLDivElement>(null);

  const summary = data
    ? {
        entradas: data.volumeSeries.reduce((sum, p) => sum + p.entradas, 0),
        saidas: data.volumeSeries.reduce((sum, p) => sum + p.saidas, 0),
        saldo: data.volumeSeries.reduce((sum, p) => sum + p.entradas - p.saidas, 0),
      }
    : { entradas: 0, saidas: 0, saldo: 0 };

  async function handleExport() {
    if (!data) return;
    await exportDashboardPdf(chartRef.current, summary, data.categoryBreakdown);
  }

  const hasWidgets =
    enabled.volume || enabled.category || enabled.pie || enabled.ranking || enabled.goals || enabled['region-sales'];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="mb-1 text-2xl font-semibold text-[var(--text-primary)]">Painel</h1>
          <p className="text-sm text-[var(--text-secondary)]">Visão geral das suas finanças.</p>
        </div>
        <div className="flex items-center gap-3">
          <PeriodFilter value={period} onChange={setPeriod} />
          <button
            onClick={handleExport}
            disabled={!data}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            <Download size={16} />
            Exportar PDF
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-negative/40 bg-negative/10 px-4 py-3 text-sm text-negative">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Saldo" value={summary.saldo} icon={Wallet} tone="brand" />
        <SummaryCard label="Entradas" value={summary.entradas} icon={ArrowUpRight} tone="positive" />
        <SummaryCard label="Saídas" value={summary.saidas} icon={ArrowDownRight} tone="negative" />
      </div>

      <div ref={chartRef} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {enabled.volume && (
          <ChartWidget title="Fluxo de Caixa">
            {data ? <VolumeAreaChart data={data.volumeSeries} /> : <WidgetSkeleton />}
          </ChartWidget>
        )}
        {enabled.category && (
          <ChartWidget title="Gastos por Categoria">
            {data ? <CategoryBarChart data={data.categoryBreakdown} /> : <WidgetSkeleton />}
          </ChartWidget>
        )}
        {enabled.pie && (
          <ChartWidget title="Proporção de Gastos">
            {data ? <CategoryPieChart data={data.categoryBreakdown} /> : <WidgetSkeleton />}
          </ChartWidget>
        )}
        {enabled.ranking && (
          <ChartWidget title="Ranking de Categorias">
            {data ? <CategoryRankingChart data={data.categoryBreakdown} /> : <WidgetSkeleton />}
          </ChartWidget>
        )}
        {enabled.goals && <GoalsPanel goals={GOALS} />}
        {enabled['region-sales'] && <RegionSalesPanel data={REGION_SALES} />}
      </div>

      {!hasWidgets && (
        <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 text-center text-sm text-[var(--text-secondary)]">
          Nenhum widget ativado. Acesse{' '}
          <span className="text-brand-400">Gráficos</span> para escolher o que exibir aqui.
        </div>
      )}
    </div>
  );
}

function ChartWidget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-80 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
      <h2 className="mb-2 text-sm font-medium text-[var(--text-primary)]">{title}</h2>
      <div className="h-[calc(100%-1.5rem)]">{children}</div>
    </div>
  );
}

function WidgetSkeleton() {
  return <div className="h-full animate-pulse rounded-xl bg-[var(--bg-surface-hover)]" />;
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: typeof Wallet;
  tone: 'brand' | 'positive' | 'negative';
}) {
  const toneClass = tone === 'positive' ? 'text-positive' : tone === 'negative' ? 'text-negative' : 'text-brand-400';
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        <Icon size={18} className={toneClass} />
      </div>
      <p className="text-2xl font-semibold text-[var(--text-primary)]">
        R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}

/** Painel de metas financeiras, exibido quando o widget "Metas Financeiras" está ativado. */
function GoalsPanel({ goals }: { goals: Goal[] }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
      <h2 className="mb-4 text-sm font-medium text-[var(--text-primary)]">Metas Financeiras</h2>
      <div className="space-y-4">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
          return (
            <div key={goal.id}>
              <div className="mb-1 flex justify-between text-xs text-[var(--text-secondary)]">
                <span>{goal.label}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-surface-hover)]">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Painel de receita por filial/região, exibido quando o widget "Receita por Filial" está ativado. */
function RegionSalesPanel({ data }: { data: RegionSales[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
      <h2 className="mb-4 text-sm font-medium text-[var(--text-primary)]">Receita por Filial</h2>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.region}>
            <div className="mb-1 flex justify-between text-xs text-[var(--text-secondary)]">
              <span>{item.region}</span>
              <span>R$ {item.value.toLocaleString('pt-BR')}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-surface-hover)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
