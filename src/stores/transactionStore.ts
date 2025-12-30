import { create } from "zustand";
import { Transaction } from "../types";
import { TransactionRepository } from "../database/repositories";

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadTransactions: () => Promise<void>;
  addTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTransaction: (
    id: string,
    updates: Partial<Transaction>
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getTransactionsByDateRange: (
    startDate: string,
    endDate: string
  ) => Promise<Transaction[]>;
  getTotalIncome: (startDate?: string, endDate?: string) => Promise<number>;
  getTotalExpense: (startDate?: string, endDate?: string) => Promise<number>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,

  loadTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const transactions = await TransactionRepository.findAll();
      set({ transactions, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addTransaction: async (transaction) => {
    set({ isLoading: true, error: null });
    try {
      const newTransaction = await TransactionRepository.create(transaction);
      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateTransaction: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await TransactionRepository.update(id, updates);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteTransaction: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await TransactionRepository.delete(id);
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getTransactionsByDateRange: async (startDate, endDate) => {
    try {
      return await TransactionRepository.findByDateRange(startDate, endDate);
    } catch (error) {
      set({ error: (error as Error).message });
      return [];
    }
  },

  getTotalIncome: async (startDate, endDate) => {
    try {
      return await TransactionRepository.getTotalByType(
        "income",
        startDate,
        endDate
      );
    } catch (error) {
      set({ error: (error as Error).message });
      return 0;
    }
  },

  getTotalExpense: async (startDate, endDate) => {
    try {
      return await TransactionRepository.getTotalByType(
        "expense",
        startDate,
        endDate
      );
    } catch (error) {
      set({ error: (error as Error).message });
      return 0;
    }
  },
}));
