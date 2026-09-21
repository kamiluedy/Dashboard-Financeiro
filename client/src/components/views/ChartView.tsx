import { AreaChart, BarChart3, Map, PieChart, Target } from 'lucide-react';
import { useAppsEnabled } from '../../hooks/useAppsEnabled';

interface WidgetTile {
  id: string;
  label: string;
  icon: typeof AreaChart;
  description: string;
}

const WIDGETS: WidgetTile[] = [
  { id: 'volume', label: 'Fluxo de Caixa', icon: AreaChart, description: 'Entradas x saídas ao longo do tempo' },
  { id: 'category', label: 'Gastos', icon: BarChart3, description: 'Gastos agrupados por categoria' },
  { id: 'pie', label: 'Proporção', icon: PieChart, description: 'Proporção de gastos entre categorias' },
  { id: 'ranking', label: 'Ranking', icon: BarChart3, description: 'Categorias ordenadas por valor' },
  { id: 'goals', label: 'Metas Financeiras', icon: Target, description: 'Progresso das metas financeiras' },
  { id: 'region-sales', label: 'Receita por Filial', icon: Map, description: 'Receita comparada entre filiais' },
];

/** Central de widgets: ative os gráficos e painéis que deseja ver no Painel principal. */
export function ChartView() {
  const { enabled, toggle } = useAppsEnabled();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-[var(--text-primary)]">Gráficos</h1>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">
        Ative os widgets que deseja exibir no Painel.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {WIDGETS.map(({ id, label, icon: Icon, description }) => {
          const isOn = Boolean(enabled[id]);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              title={description}
              className={`flex flex-col items-center gap-3 rounded-2xl border p-5 text-sm transition-colors ${
                isOn
                  ? 'border-brand-500/60 bg-[var(--bg-surface-hover)] text-[var(--text-primary)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <Icon size={22} className={isOn ? 'text-brand-400' : ''} />
              {label}
              <span className={`text-xs ${isOn ? 'text-positive' : 'text-[var(--text-secondary)]'}`}>
                {isOn ? 'Ativado' : 'Desativado'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
