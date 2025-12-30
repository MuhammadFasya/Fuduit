import { create } from "zustand";
import { IncomeSource } from "../types";
import { IncomeSourceRepository } from "../database/repositories";

interface IncomeSourceState {
  incomeSources: IncomeSource[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadIncomeSources: () => Promise<void>;
  addIncomeSource: (
    source: Omit<IncomeSource, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateIncomeSource: (
    id: string,
    updates: Partial<IncomeSource>
  ) => Promise<void>;
  deleteIncomeSource: (id: string) => Promise<void>;
  getIncomeSourceById: (id: string) => IncomeSource | undefined;
}

export const useIncomeSourceStore = create<IncomeSourceState>((set, get) => ({
  incomeSources: [],
  isLoading: false,
  error: null,

  loadIncomeSources: async () => {
    set({ isLoading: true, error: null });
    try {
      const incomeSources = await IncomeSourceRepository.findAll();
      set({ incomeSources, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addIncomeSource: async (source) => {
    set({ isLoading: true, error: null });
    try {
      const newSource = await IncomeSourceRepository.create(source);
      set((state) => ({
        incomeSources: [...state.incomeSources, newSource],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateIncomeSource: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await IncomeSourceRepository.update(id, updates);
      set((state) => ({
        incomeSources: state.incomeSources.map((s) =>
          s.id === id ? { ...s, ...updates } : s
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteIncomeSource: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await IncomeSourceRepository.delete(id);
      set((state) => ({
        incomeSources: state.incomeSources.filter((s) => s.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getIncomeSourceById: (id) => {
    return get().incomeSources.find((s) => s.id === id);
  },
}));
