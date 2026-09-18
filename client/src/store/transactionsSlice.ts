import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from './store';
import type { DashboardSummary, Transaction } from '../types';

interface TransactionsState {
  items: Transaction[];
  summary: DashboardSummary;
  loading: boolean;
}

const initialState: TransactionsState = {
  items: [],
  summary: { saldo: 0, entradas: 0, saidas: 0 },
  loading: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.items = action.payload;
      const entradas = action.payload.filter((t) => t.type === 'entrada').reduce((sum, t) => sum + t.amount, 0);
      const saidas = action.payload.filter((t) => t.type === 'saida').reduce((sum, t) => sum + t.amount, 0);
      state.summary = { entradas, saidas, saldo: entradas - saidas };
    },
  },
});

export const { setLoading, setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;

/** Thunk de exemplo: poderia buscar transações reais de uma API futura. */
export function loadTransactions(transactions: Transaction[]): AppThunk {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setTransactions(transactions));
    dispatch(setLoading(false));
  };
}
