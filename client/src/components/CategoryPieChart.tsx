import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryPoint } from '../types';

interface CategoryPieChartProps {
  data: CategoryPoint[];
}

const COLORS = ['#a855f7', '#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#ec4899'];

/** Gráfico de pizza mostrando a proporção de gastos entre categorias. */
export function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="category" innerRadius="55%" outerRadius="80%" paddingAngle={2}>
          {data.map((entry, index) => (
            <Cell key={entry.category} fill={COLORS[index % COLORS.length]} stroke="var(--bg-surface)" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            color: 'var(--text-primary)',
          }}
        />
        <Legend wrapperStyle={{ color: 'var(--text-secondary)', fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
