import { BarChart2, Bell, Calendar, Mail, Map, Target, Users, Wallet } from 'lucide-react';
import { useAppsEnabled } from '../../hooks/useAppsEnabled';

interface AppTile {
  id: string;
  label: string;
  icon: typeof BarChart2;
  description?: string;
}

const APPS: AppTile[] = [
  { id: 'reports', label: 'Relatórios', icon: BarChart2 },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'calendar', label: 'Calendário', icon: Calendar },
  { id: 'mail', label: 'E-mail', icon: Mail },
  { id: 'team', label: 'Equipe', icon: Users },
  { id: 'billing', label: 'Faturamento', icon: Wallet },
  { id: 'goals', label: 'Metas Financeiras', icon: Target, description: 'Adiciona um painel de progresso ao Dashboard' },
  { id: 'region-sales', label: 'Receita por Filial', icon: Map, description: 'Adiciona um gráfico regional ao Dashboard' },
];

/** Painel de atalhos que o usuário pode ativar/desativar. Os módulos "goals" e "region-sales" refletem no Dashboard. */
export function AppsView() {
  const { enabled, toggle } = useAppsEnabled();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-[var(--text-primary)]">Apps</h1>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">Ative os módulos que deseja usar no seu workspace.</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {APPS.map(({ id, label, icon: Icon, description }) => {
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
