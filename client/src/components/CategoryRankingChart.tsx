import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { CategoryPoint } from '../types';

interface CategoryRankingChartProps {
  data: CategoryPoint[];
}

/** Gráfico de barras horizontais rankeando categorias da maior para a menor. */
export function CategoryRankingChart({ data }: CategoryRankingChartProps) {
  const sorted = [...data].sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sorted} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
        <XAxis type="number" stroke="var(--text-secondary)" fontSize={12} />
        <YAxis type="category" dataKey="category" stroke="var(--text-secondary)" fontSize={12} width={130} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            color: 'var(--text-primary)',
          }}
        />
        <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
