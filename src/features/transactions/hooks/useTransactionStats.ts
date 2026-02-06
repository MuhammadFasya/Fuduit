import { useMemo } from "react";
import { Transaction } from "@/db/schema";

interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  incomeCount: number;
  expenseCount: number;
  averageIncome: number;
  averageExpense: number;
  categoryBreakdown: Record<
    string,
    { total: number; count: number; type: "income" | "expense" }
  >;
  monthlyTrend: Record<string, { income: number; expense: number }>;
}

/**
 * Hook to calculate transaction statistics
 */
export const useTransactionStats = (
  transactions: Transaction[]
): TransactionStats => {
  return useMemo(() => {
    const stats: TransactionStats = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      transactionCount: transactions.length,
      incomeCount: 0,
      expenseCount: 0,
      averageIncome: 0,
      averageExpense: 0,
      categoryBreakdown: {},
      monthlyTrend: {},
    };

    transactions.forEach((transaction) => {
      const amount = transaction.amount;
      const isIncome = transaction.type === "income";

      // Calculate totals
      if (isIncome) {
        stats.totalIncome += amount;
        stats.incomeCount++;
      } else {
        stats.totalExpense += amount;
        stats.expenseCount++;
      }

      // Category breakdown
      const category = transaction.category;
      if (!stats.categoryBreakdown[category]) {
        stats.categoryBreakdown[category] = {
          total: 0,
          count: 0,
          type: transaction.type,
        };
      }
      stats.categoryBreakdown[category].total += amount;
      stats.categoryBreakdown[category].count++;

      // Monthly trend
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!stats.monthlyTrend[monthKey]) {
        stats.monthlyTrend[monthKey] = { income: 0, expense: 0 };
      }
      if (isIncome) {
        stats.monthlyTrend[monthKey].income += amount;
      } else {
        stats.monthlyTrend[monthKey].expense += amount;
      }
    });

    // Calculate balance and averages
    stats.balance = stats.totalIncome - stats.totalExpense;
    stats.averageIncome =
      stats.incomeCount > 0 ? stats.totalIncome / stats.incomeCount : 0;
    stats.averageExpense =
      stats.expenseCount > 0 ? stats.totalExpense / stats.expenseCount : 0;

    return stats;
  }, [transactions]);
};

/**
 * Get transactions for the current month
 */
export const filterCurrentMonth = (
  transactions: Transaction[]
): Transaction[] => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  return transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= startOfMonth && date <= endOfMonth;
  });
};

/**
 * Get transactions for the last N days
 */
export const filterLastNDays = (
  transactions: Transaction[],
  days: number
): Transaction[] => {
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= startDate;
  });
};
