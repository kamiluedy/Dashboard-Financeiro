import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'Como troco o período dos gráficos?',
    answer: 'Use o seletor de período no topo do Painel ou da tela de Gráficos para escolher Hoje, 7 dias ou 30 dias.',
  },
  {
    question: 'Como mudo meu nome de exibição?',
    answer: 'Clique no seu avatar na barra lateral, ou acesse Configurações, para editar o nome exibido.',
  },
  {
    question: 'Como alterno entre tema claro e escuro?',
    answer: 'Use o botão de sol/lua na barra superior, ou o toggle em Configurações.',
  },
  {
    question: 'Os dados exibidos são reais?',
    answer: 'Não, este dashboard usa dados mockados gerados pelo servidor de exemplo em /api/analytics.',
  },
];

/** Central de ajuda com FAQ em formato acordeão. */
export function HelpView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-[var(--text-primary)]">Ajuda</h1>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">Perguntas frequentes sobre o dashboard.</p>

      <div className="max-w-2xl space-y-2">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-[var(--text-primary)]"
              >
                {faq.question}
                <ChevronDown
                  size={16}
                  className={`text-[var(--text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <p className="border-t border-[var(--border-subtle)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
