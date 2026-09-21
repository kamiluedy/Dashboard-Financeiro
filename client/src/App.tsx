import { useState } from 'react';
import { Sidebar, type Page } from './components/Sidebar';
import { Header } from './components/Header';
import { useTheme } from './hooks/useTheme';
import { DashboardView } from './components/views/DashboardView';
import { ChartView } from './components/views/ChartView';
import { ChatView } from './components/views/ChatView';
import { SettingsView } from './components/views/SettingsView';
import { HelpView } from './components/views/HelpView';

const PAGE_TITLES: Record<Page, string> = {
  dashboard: 'Painel',
  chart: 'Gráficos',
  chat: 'Conversas',
  settings: 'Configurações',
  help: 'Ajuda',
};

/** Componente raiz: monta o layout (Sidebar + Header) e navega entre as views sem biblioteca de rotas. */
export function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-[var(--bg-app)]">
      <Sidebar active={page} onNavigate={setPage} />
      <div className="flex flex-1 flex-col">
        <Header title={PAGE_TITLES[page]} theme={theme} onToggleTheme={toggleTheme} />
        <main className="flex-1 overflow-y-auto p-6">
          {page === 'dashboard' && <DashboardView />}
          {page === 'chart' && <ChartView />}
          {page === 'chat' && <ChatView />}
          {page === 'settings' && <SettingsView theme={theme} onToggleTheme={toggleTheme} />}
          {page === 'help' && <HelpView />}
        </main>
      </div>
    </div>
  );
}
