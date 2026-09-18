import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { VolumePoint } from '../types';

interface VolumeAreaChartProps {
  data: VolumePoint[];
}

/** Gráfico de área mostrando entradas x saídas ao longo do tempo. */
export function VolumeAreaChart({ data }: VolumeAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="entradasGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="saidasGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
        <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} />
        <YAxis stroke="var(--text-secondary)" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            color: 'var(--text-primary)',
          }}
        />
        <Area type="monotone" dataKey="entradas" stroke="#22c55e" fill="url(#entradasGradient)" strokeWidth={2} />
        <Area type="monotone" dataKey="saidas" stroke="#ef4444" fill="url(#saidasGradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
