import { useEffect, useState } from 'react';
import type { AnalyticsData, Period } from '../types';
import { buildMockAnalytics } from '../lib/mockAnalytics';

interface UseAnalyticsParams {
  period: Period;
  year: number;
  month: number;
}

/** Gera dados agregados de análise financeira (mockados) para o período selecionado. */
export function useAnalytics({ period, year, month }: UseAnalyticsParams) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const result = buildMockAnalytics({ period, year, month });
    setData(result);
    setLoading(false);
  }, [period, year, month]);

  return { data, error, loading };
}
