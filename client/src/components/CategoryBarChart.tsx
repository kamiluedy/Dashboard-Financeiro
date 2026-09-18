import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { CategoryPoint } from '../types';

interface CategoryBarChartProps {
  data: CategoryPoint[];
}

/** Gráfico de barras mostrando gastos agrupados por categoria. */
export function CategoryBarChart({ data }: CategoryBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
        <XAxis dataKey="category" stroke="var(--text-secondary)" fontSize={12} />
        <YAxis stroke="var(--text-secondary)" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            color: 'var(--text-primary)',
          }}
        />
        <Bar dataKey="value" fill="#a855f7" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
