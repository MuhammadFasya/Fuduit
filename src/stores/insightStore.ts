import { create } from "zustand";
import { Insight } from "../types";
import { InsightEngine } from "../services/insightEngine";

interface InsightState {
  insights: Insight[];
  isLoading: boolean;
  error: string | null;

  // Actions
  generateInsights: () => Promise<void>;
  dismissInsight: (id: string) => void;
  clearInsights: () => void;
}

export const useInsightStore = create<InsightState>((set, get) => ({
  insights: [],
  isLoading: false,
  error: null,

  generateInsights: async () => {
    set({ isLoading: true, error: null });
    try {
      const insights = await InsightEngine.generate();
      set({ insights, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  dismissInsight: (id) => {
    set((state) => ({
      insights: state.insights.filter((i) => i.id !== id),
    }));
  },

  clearInsights: () => {
    set({ insights: [] });
  },
}));
