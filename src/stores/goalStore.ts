import { create } from "zustand";
import { Goal } from "../types";
import { GoalRepository } from "../database/repositories";

interface GoalState {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadGoals: () => Promise<void>;
  addGoal: (
    goal: Omit<Goal, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  updateGoalProgress: (id: string, amount: number) => Promise<void>;
  getGoalById: (id: string) => Goal | undefined;
}

export const useGoalStore = create<GoalState>((set, get) => ({
  goals: [],
  isLoading: false,
  error: null,

  loadGoals: async () => {
    set({ isLoading: true, error: null });
    try {
      const goals = await GoalRepository.findAll();
      set({ goals, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addGoal: async (goal) => {
    set({ isLoading: true, error: null });
    try {
      const newGoal = await GoalRepository.create(goal);
      set((state) => ({
        goals: [newGoal, ...state.goals],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateGoal: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await GoalRepository.update(id, updates);
      set((state) => ({
        goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteGoal: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await GoalRepository.delete(id);
      set((state) => ({
        goals: state.goals.filter((g) => g.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateGoalProgress: async (id, amount) => {
    set({ isLoading: true, error: null });
    try {
      await GoalRepository.updateProgress(id, amount);
      set((state) => ({
        goals: state.goals.map((g) =>
          g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getGoalById: (id) => {
    return get().goals.find((g) => g.id === id);
  },
}));
