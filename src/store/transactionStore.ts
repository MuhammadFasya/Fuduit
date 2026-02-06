import { create } from "zustand";
import type { Transaction } from "@/db/schema";

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: number) => void;
  updateTransaction: (id: number, updates: Partial<Transaction>) => void;
  setLoading: (isLoading: boolean) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  isLoading: false,

  setTransactions: (transactions: Transaction[]) => set({ transactions }),

  addTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  removeTransaction: (id: number) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  updateTransaction: (id: number, updates: Partial<Transaction>) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  setLoading: (isLoading: boolean) => set({ isLoading }),

  clearTransactions: () => set({ transactions: [] }),
}));
