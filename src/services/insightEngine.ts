import { Insight, Transaction } from "../types";
import { TransactionRepository } from "../database/repositories";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
  parseISO,
} from "date-fns";

// Base interface for insight rules
interface InsightRule {
  type: string;
  generate: (transactions: Transaction[]) => Insight | null;
}

// Spending Anomaly Detection
class SpendingAnomalyRule implements InsightRule {
  type = "spending_anomaly";

  generate(transactions: Transaction[]): Insight | null {
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );
    if (expenseTransactions.length < 10) return null;

    const currentMonth = new Date();
    const lastMonth = subMonths(currentMonth, 1);

    const currentMonthExpenses = this.getMonthlyTotal(
      expenseTransactions,
      currentMonth
    );
    const lastMonthExpenses = this.getMonthlyTotal(
      expenseTransactions,
      lastMonth
    );

    if (lastMonthExpenses === 0) return null;

    const percentageChange =
      ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

    if (Math.abs(percentageChange) > 20) {
      const direction = percentageChange > 0 ? "increased" : "decreased";
      const absChange = Math.abs(percentageChange).toFixed(0);

      return {
        id: `anomaly_${Date.now()}`,
        type: "spending_anomaly",
        title: "Spending Pattern Changed",
        description: `Your spending has ${direction} by ${absChange}% compared to last month.`,
        severity: percentageChange > 0 ? "warning" : "success",
        metadata: {
          percentageChange,
          currentMonthExpenses,
          lastMonthExpenses,
        },
        createdAt: new Date().toISOString(),
      };
    }

    return null;
  }

  private getMonthlyTotal(transactions: Transaction[], month: Date): number {
    const start = startOfMonth(month);
    const end = endOfMonth(month);

    return transactions
      .filter((t) => {
        const txDate = parseISO(t.date);
        return txDate >= start && txDate <= end;
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }
}

// Category Frequency Analysis
class CategoryFrequencyRule implements InsightRule {
  type = "category_frequency";

  generate(transactions: Transaction[]): Insight | null {
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense" && t.categoryId
    );
    if (expenseTransactions.length < 5) return null;

    const categoryCount: Record<
      string,
      { count: number; total: number; name: string }
    > = {};

    expenseTransactions.forEach((t) => {
      if (t.categoryId) {
        if (!categoryCount[t.categoryId]) {
          categoryCount[t.categoryId] = {
            count: 0,
            total: 0,
            name: t.categoryId,
          };
        }
        categoryCount[t.categoryId].count++;
        categoryCount[t.categoryId].total += t.amount;
      }
    });

    const mostFrequent = Object.values(categoryCount).sort(
      (a, b) => b.count - a.count
    )[0];
    const percentage = (
      (mostFrequent.count / expenseTransactions.length) *
      100
    ).toFixed(0);

    return {
      id: `category_freq_${Date.now()}`,
      type: "category_frequency",
      title: "Top Spending Category",
      description: `${percentage}% of your transactions are in one category. Consider if this aligns with your priorities.`,
      severity: "info",
      metadata: {
        categoryId: mostFrequent.name,
        count: mostFrequent.count,
        total: mostFrequent.total,
        percentage: parseFloat(percentage),
      },
      createdAt: new Date().toISOString(),
    };
  }
}

// Time-based Spending Pattern
class TimePatternRule implements InsightRule {
  type = "time_pattern";

  generate(transactions: Transaction[]): Insight | null {
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );
    if (expenseTransactions.length < 7) return null;

    const weekendSpending = this.getWeekendSpending(expenseTransactions);
    const weekdaySpending = this.getWeekdaySpending(expenseTransactions);
    const totalSpending = weekendSpending + weekdaySpending;

    if (totalSpending === 0) return null;

    const weekendPercentage = (weekendSpending / totalSpending) * 100;

    if (weekendPercentage > 60) {
      return {
        id: `time_pattern_${Date.now()}`,
        type: "time_pattern",
        title: "Weekend Spending Trend",
        description: `You spend ${weekendPercentage.toFixed(
          0
        )}% of your budget on weekends. Planning ahead might help.`,
        severity: "info",
        metadata: {
          weekendSpending,
          weekdaySpending,
          weekendPercentage,
        },
        createdAt: new Date().toISOString(),
      };
    }

    return null;
  }

  private getWeekendSpending(transactions: Transaction[]): number {
    return transactions
      .filter((t) => {
        const day = parseISO(t.date).getDay();
        return day === 0 || day === 6; // Sunday or Saturday
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }

  private getWeekdaySpending(transactions: Transaction[]): number {
    return transactions
      .filter((t) => {
        const day = parseISO(t.date).getDay();
        return day !== 0 && day !== 6;
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }
}

// Budget Warning (based on income vs expense)
class BudgetWarningRule implements InsightRule {
  type = "budget_warning";

  generate(transactions: Transaction[]): Insight | null {
    const currentMonth = new Date();
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    const monthlyTransactions = transactions.filter((t) => {
      const txDate = parseISO(t.date);
      return txDate >= start && txDate <= end;
    });

    const income = monthlyTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthlyTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    if (income === 0) return null;

    const expenseRatio = (expense / income) * 100;

    if (expenseRatio > 90) {
      return {
        id: `budget_warning_${Date.now()}`,
        type: "budget_warning",
        title: "High Spending Alert",
        description: `You've spent ${expenseRatio.toFixed(
          0
        )}% of your monthly income. Consider reviewing your expenses.`,
        severity: "warning",
        metadata: {
          income,
          expense,
          expenseRatio,
          remaining: income - expense,
        },
        createdAt: new Date().toISOString(),
      };
    }

    if (expenseRatio < 50) {
      return {
        id: `budget_success_${Date.now()}`,
        type: "budget_warning",
        title: "Great Savings Rate",
        description: `You're saving ${(100 - expenseRatio).toFixed(
          0
        )}% of your income this month. Keep it up!`,
        severity: "success",
        metadata: {
          income,
          expense,
          expenseRatio,
          remaining: income - expense,
        },
        createdAt: new Date().toISOString(),
      };
    }

    return null;
  }
}

// Main Insight Engine
export class InsightEngine {
  private static rules: InsightRule[] = [
    new SpendingAnomalyRule(),
    new CategoryFrequencyRule(),
    new TimePatternRule(),
    new BudgetWarningRule(),
  ];

  static async generate(): Promise<Insight[]> {
    try {
      const transactions = await TransactionRepository.findAll();
      const insights: Insight[] = [];

      for (const rule of this.rules) {
        const insight = rule.generate(transactions);
        if (insight) {
          insights.push(insight);
        }
      }

      return insights;
    } catch (error) {
      console.error("Failed to generate insights:", error);
      return [];
    }
  }

  // Method to add custom rules (for future AI-based insights)
  static addRule(rule: InsightRule): void {
    this.rules.push(rule);
  }

  // Method to remove rules by type
  static removeRule(type: string): void {
    this.rules = this.rules.filter((r) => r.type !== type);
  }
}
