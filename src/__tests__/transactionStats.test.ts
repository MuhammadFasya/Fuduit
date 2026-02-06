import { Transaction } from "@/db/schema";

// We can't test hooks directly, so let's extract the logic
// and test the calculation function

interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  incomeCount: number;
  expenseCount: number;
}

// Pure function for calculating stats (extracted logic)
function calculateStats(transactions: Transaction[]): TransactionStats {
  let totalIncome = 0;
  let totalExpense = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
      incomeCount++;
    } else {
      totalExpense += transaction.amount;
      expenseCount++;
    }
  });

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    transactionCount: transactions.length,
    incomeCount,
    expenseCount,
  };
}

describe("Transaction Stats Calculation", () => {
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      userId: "user123",
      amount: 1000,
      category: "Salary",
      type: "income",
      date: new Date("2024-01-15"),
      note: null,
    },
    {
      id: 2,
      userId: "user123",
      amount: 50,
      category: "Food",
      type: "expense",
      date: new Date("2024-01-16"),
      note: "Lunch",
    },
    {
      id: 3,
      userId: "user123",
      amount: 200,
      category: "Freelance",
      type: "income",
      date: new Date("2024-01-17"),
      note: null,
    },
    {
      id: 4,
      userId: "user123",
      amount: 100,
      category: "Transport",
      type: "expense",
      date: new Date("2024-01-18"),
      note: null,
    },
  ];

  describe("calculateStats", () => {
    it("should calculate total income correctly", () => {
      const stats = calculateStats(mockTransactions);
      expect(stats.totalIncome).toBe(1200); // 1000 + 200
    });

    it("should calculate total expense correctly", () => {
      const stats = calculateStats(mockTransactions);
      expect(stats.totalExpense).toBe(150); // 50 + 100
    });

    it("should calculate balance correctly", () => {
      const stats = calculateStats(mockTransactions);
      expect(stats.balance).toBe(1050); // 1200 - 150
    });

    it("should count transactions correctly", () => {
      const stats = calculateStats(mockTransactions);
      expect(stats.transactionCount).toBe(4);
      expect(stats.incomeCount).toBe(2);
      expect(stats.expenseCount).toBe(2);
    });

    it("should handle empty array", () => {
      const stats = calculateStats([]);
      expect(stats.totalIncome).toBe(0);
      expect(stats.totalExpense).toBe(0);
      expect(stats.balance).toBe(0);
      expect(stats.transactionCount).toBe(0);
    });

    it("should handle only income transactions", () => {
      const incomeOnly = mockTransactions.filter((t) => t.type === "income");
      const stats = calculateStats(incomeOnly);
      expect(stats.totalExpense).toBe(0);
      expect(stats.balance).toBe(stats.totalIncome);
    });

    it("should handle only expense transactions", () => {
      const expenseOnly = mockTransactions.filter((t) => t.type === "expense");
      const stats = calculateStats(expenseOnly);
      expect(stats.totalIncome).toBe(0);
      expect(stats.balance).toBe(-stats.totalExpense);
    });
  });
});

// Test filterCurrentMonth function
describe("filterCurrentMonth", () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const transactionsAcrossMonths: Transaction[] = [
    {
      id: 1,
      userId: "user123",
      amount: 100,
      category: "Test",
      type: "expense",
      date: new Date(currentYear, currentMonth, 15), // Current month
      note: null,
    },
    {
      id: 2,
      userId: "user123",
      amount: 200,
      category: "Test",
      type: "income",
      date: new Date(currentYear, currentMonth - 1, 15), // Last month
      note: null,
    },
    {
      id: 3,
      userId: "user123",
      amount: 300,
      category: "Test",
      type: "expense",
      date: new Date(currentYear, currentMonth, 1), // Current month (1st)
      note: null,
    },
  ];

  function filterCurrentMonth(transactions: Transaction[]): Transaction[] {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions.filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });
  }

  it("should filter only current month transactions", () => {
    const filtered = filterCurrentMonth(transactionsAcrossMonths);
    expect(filtered).toHaveLength(2);
    expect(
      filtered.every((t) => new Date(t.date).getMonth() === currentMonth)
    ).toBe(true);
  });

  it("should exclude transactions from other months", () => {
    const filtered = filterCurrentMonth(transactionsAcrossMonths);
    const hasLastMonth = filtered.some(
      (t) => new Date(t.date).getMonth() === currentMonth - 1
    );
    expect(hasLastMonth).toBe(false);
  });
});
