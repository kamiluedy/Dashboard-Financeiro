export type Period = 'today' | '7d' | '30d';

export interface VolumePoint {
  date: string;
  entradas: number;
  saidas: number;
}

export interface CategoryPoint {
  category: string;
  value: number;
}

export interface AnalyticsData {
  volumeSeries: VolumePoint[];
  categoryBreakdown: CategoryPoint[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'entrada' | 'saida';
}

export interface DashboardSummary {
  saldo: number;
  entradas: number;
  saidas: number;
}

export interface Goal {
  id: string;
  label: string;
  target: number;
  current: number;
}

export interface RegionSales {
  region: string;
  value: number;
}
