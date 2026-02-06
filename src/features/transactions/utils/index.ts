import type {
  Transaction,
  TransactionSummary,
  TransactionFilter,
  TransactionType,
} from "../types";

/**
 * Formats a currency amount for display
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Calculates transaction summary from a list of transactions
 */
export const calculateSummary = (
  transactions: Transaction[]
): TransactionSummary => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    transactionCount: transactions.length,
  };
};

/**
 * Filters transactions based on provided criteria
 */
export const filterTransactions = (
  transactions: Transaction[],
  filter: TransactionFilter
): Transaction[] => {
  return transactions.filter((transaction) => {
    if (filter.type && transaction.type !== filter.type) {
      return false;
    }

    if (filter.category && transaction.category !== filter.category) {
      return false;
    }

    if (filter.startDate && transaction.date < filter.startDate) {
      return false;
    }

    if (filter.endDate && transaction.date > filter.endDate) {
      return false;
    }

    return true;
  });
};

/**
 * Groups transactions by date (day)
 */
export const groupTransactionsByDate = (
  transactions: Transaction[]
): Map<string, Transaction[]> => {
  const grouped = new Map<string, Transaction[]>();

  transactions.forEach((transaction) => {
    const dateKey = transaction.date.toISOString().split("T")[0];
    const existing = grouped.get(dateKey) || [];
    grouped.set(dateKey, [...existing, transaction]);
  });

  return grouped;
};

/**
 * Gets category icon name for lucide-react-native
 */
export const getCategoryIcon = (
  category: string,
  type: TransactionType
): string => {
  const icons: Record<string, string> = {
    // Expense categories
    food: "utensils",
    transport: "car",
    shopping: "shopping-bag",
    entertainment: "gamepad-2",
    bills: "receipt",
    health: "heart-pulse",
    education: "graduation-cap",
    travel: "plane",
    // Income categories
    salary: "briefcase",
    freelance: "laptop",
    investment: "trending-up",
    gift: "gift",
    refund: "rotate-ccw",
    // Default
    other: type === "income" ? "plus-circle" : "minus-circle",
  };

  return icons[category] || icons.other;
};
