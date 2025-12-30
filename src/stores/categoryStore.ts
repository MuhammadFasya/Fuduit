import { create } from "zustand";
import { Category } from "../types";
import { CategoryRepository } from "../database/repositories";

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadCategories: () => Promise<void>;
  addCategory: (
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getCategoryById: (id: string) => Category | undefined;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  loadCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categories = await CategoryRepository.findAll();
      set({ categories, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addCategory: async (category) => {
    set({ isLoading: true, error: null });
    try {
      const newCategory = await CategoryRepository.create(category);
      set((state) => ({
        categories: [...state.categories, newCategory],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateCategory: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await CategoryRepository.update(id, updates);
      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await CategoryRepository.delete(id);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getCategoryById: (id) => {
    return get().categories.find((c) => c.id === id);
  },
}));
