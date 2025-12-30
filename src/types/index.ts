// Type definitions for the Fuduit application

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId?: string;
  incomeSourceId?: string;
  description?: string;
  date: string; // ISO 8601 format
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: "expense"; // For future: could support income categories
  createdAt: string;
  updatedAt: string;
}

export interface IncomeSource {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string; // ISO 8601 format
  color: string;
  createdAt: string;
  updatedAt: string;
}

export type InsightType =
  | "spending_anomaly"
  | "category_frequency"
  | "time_pattern"
  | "goal_progress"
  | "budget_warning";

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  severity: "info" | "warning" | "success";
  metadata?: Record<string, any>;
  createdAt: string;
}

// Chart data types
export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface WeeklyData {
  week: string;
  amount: number;
}

export interface CategoryData {
  name: string;
  amount: number;
  color: string;
  percentage: number;
}

// Database schema types
export interface DatabaseSchema {
  transactions: Transaction;
  categories: Category;
  incomeSources: IncomeSource;
  goals: Goal;
}
