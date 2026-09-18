import { BarChart3, Grid3x3, HelpCircle, LayoutDashboard, MessageSquare, Settings, Wallet } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

export type Page = 'dashboard' | 'chart' | 'chat' | 'apps' | 'settings' | 'help';

interface SidebarProps {
  active: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
  { id: 'chart', label: 'Gráficos', icon: BarChart3 },
  { id: 'chat', label: 'Conversas', icon: MessageSquare },
  { id: 'apps', label: 'Apps', icon: Grid3x3 },
  { id: 'settings', label: 'Configurações', icon: Settings },
  { id: 'help', label: 'Ajuda', icon: HelpCircle },
];

/** Navegação lateral fixa com atalho para Configurações via avatar. */
export function Sidebar({ active, onNavigate }: SidebarProps) {
  const { name } = useProfile();
  const initial = name.trim().charAt(0).toUpperCase() || 'U';

  return (
    <aside className="flex h-screen w-20 flex-col items-center justify-between border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] py-5 lg:w-56 lg:items-stretch lg:px-4">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2 lg:justify-start">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
            <Wallet size={18} className="text-white" />
          </div>
          <span className="hidden text-sm font-semibold text-[var(--text-primary)] lg:inline">Dashboard Finanças</span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                title={label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors lg:justify-start ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="hidden lg:inline">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <button
        onClick={() => onNavigate('settings')}
        title="Clique para editar seu perfil em Configurações"
        className="flex items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--bg-surface-hover)] lg:w-full"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-semibold text-white">
          {initial}
        </div>
        <span className="hidden truncate text-sm text-[var(--text-primary)] lg:inline">{name}</span>
      </button>
    </aside>
  );
}
