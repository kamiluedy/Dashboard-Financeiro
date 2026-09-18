import type { AnalyticsData, Period } from '../types';

const CATEGORIES = ['Fornecedores', 'Folha de Pagamento', 'Impostos', 'Marketing', 'Infraestrutura', 'Outros'];

function seededRandom(seed: number) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function pointsForPeriod(period: Period) {
  if (period === 'today') return 8;
  if (period === '7d') return 7;
  return 30;
}

/** Gera dados mockados, mas determinísticos, de fluxo de caixa e gastos por categoria. */
export function buildMockAnalytics({ period, year, month }: { period: Period; year: number; month: number }): AnalyticsData {
  const seed = year * 100 + month + period.length;
  const random = seededRandom(seed || 1);
  const count = pointsForPeriod(period);

  const volumeSeries = Array.from({ length: count }, (_, i) => {
    const base = 1000 + random() * 4000;
    const entradas = Math.round(base + random() * 1500);
    const saidas = Math.round(base * 0.6 + random() * 1200);
    const label = period === 'today' ? `${i * 3}h` : `${i + 1}`;
    return { date: label, entradas, saidas };
  });

  const categoryBreakdown = CATEGORIES.map((category) => ({
    category,
    value: Math.round(500 + random() * 4500),
  }));

  return { volumeSeries, categoryBreakdown };
}
