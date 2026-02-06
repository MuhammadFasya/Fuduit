export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  userId: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: Date;
  note: string | null;
}

export interface NewTransaction {
  userId: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: Date;
  note?: string | null;
}

export interface TransactionFilter {
  type?: TransactionType;
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

export const EXPENSE_CATEGORIES = [
  "food",
  "transport",
  "shopping",
  "entertainment",
  "bills",
  "health",
  "education",
  "travel",
  "other",
] as const;

export const INCOME_CATEGORIES = [
  "salary",
  "freelance",
  "investment",
  "gift",
  "refund",
  "other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
