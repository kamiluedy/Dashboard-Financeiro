import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

interface Message {
  id: number;
  author: 'me' | 'bot';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, author: 'bot', text: 'Olá! Este é um chat de demonstração do dashboard. Envie uma mensagem.' },
];

/** Chat local simples: mensagens ficam em memória, sem backend. Bot responde com eco simples. */
export function ChatView() {
  const { name } = useProfile();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');

  function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const userMessage: Message = { id: Date.now(), author: 'me', text };
    const botMessage: Message = { id: Date.now() + 1, author: 'bot', text: `Recebido: "${text}"` };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setDraft('');
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      <h1 className="mb-1 text-2xl font-semibold text-[var(--text-primary)]">Conversas</h1>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">Conversando como {name}.</p>

      <div className="flex flex-1 flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.author === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                  msg.author === 'me'
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
                    : 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-2 border-t border-[var(--border-subtle)] p-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Digite uma mensagem..."
            className="flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            aria-label="Enviar"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
