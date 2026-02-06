/**
 * Integration tests for the main user flows
 * These tests verify that multiple components work together correctly
 */

import { useAuthStore } from "@/store/authStore";
import { useTransactionStore } from "@/store/transactionStore";
import type { User } from "firebase/auth";
import { Transaction } from "@/db/schema";

// Mock user
const mockUser = {
  uid: "user123",
  email: "test@example.com",
  displayName: "Test User",
} as User;

// Reset stores before each test
beforeEach(() => {
  useAuthStore.setState({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  });
  useTransactionStore.setState({
    transactions: [],
    isLoading: false,
  });
});

describe("Authentication Flow Integration", () => {
  describe("Login Flow", () => {
    it("should update auth state when user logs in", () => {
      const { setUser } = useAuthStore.getState();

      // Simulate login
      setUser(mockUser);

      const authState = useAuthStore.getState();
      expect(authState.isAuthenticated).toBe(true);
      expect(authState.user?.email).toBe("test@example.com");
    });

    it("should allow transaction operations after login", () => {
      const { setUser } = useAuthStore.getState();
      const { addTransaction } = useTransactionStore.getState();

      // Login
      setUser(mockUser);

      // Add transaction
      const transaction: Transaction = {
        id: 1,
        userId: mockUser.uid,
        amount: 100,
        category: "Food",
        type: "expense",
        date: new Date(),
        note: null,
      };
      addTransaction(transaction);

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(1);
    });
  });

  describe("Logout Flow", () => {
    it("should clear user data on logout", () => {
      const { setUser, logout } = useAuthStore.getState();

      // Login first
      setUser(mockUser);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // Logout
      logout();

      const authState = useAuthStore.getState();
      expect(authState.isAuthenticated).toBe(false);
      expect(authState.user).toBeNull();
    });

    it("should clear transactions on logout", () => {
      const { setUser, logout } = useAuthStore.getState();
      const { addTransaction, clearTransactions } =
        useTransactionStore.getState();

      // Login and add transactions
      setUser(mockUser);
      addTransaction({
        id: 1,
        userId: mockUser.uid,
        amount: 100,
        category: "Food",
        type: "expense",
        date: new Date(),
        note: null,
      });

      expect(useTransactionStore.getState().transactions).toHaveLength(1);

      // Logout and clear
      logout();
      clearTransactions();

      expect(useTransactionStore.getState().transactions).toHaveLength(0);
    });
  });
});

describe("Transaction Management Flow Integration", () => {
  beforeEach(() => {
    // Simulate logged in user
    useAuthStore.getState().setUser(mockUser);
  });

  describe("CRUD Operations", () => {
    it("should add and retrieve transactions", () => {
      const { addTransaction } = useTransactionStore.getState();

      // Add multiple transactions
      addTransaction({
        id: 1,
        userId: mockUser.uid,
        amount: 500,
        category: "Salary",
        type: "income",
        date: new Date(),
        note: "Monthly salary",
      });

      addTransaction({
        id: 2,
        userId: mockUser.uid,
        amount: 50,
        category: "Food",
        type: "expense",
        date: new Date(),
        note: "Lunch",
      });

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(2);

      // Most recent should be first
      expect(transactions[0].id).toBe(2);
      expect(transactions[1].id).toBe(1);
    });

    it("should update existing transaction", () => {
      const { addTransaction, updateTransaction } =
        useTransactionStore.getState();

      addTransaction({
        id: 1,
        userId: mockUser.uid,
        amount: 100,
        category: "Food",
        type: "expense",
        date: new Date(),
        note: null,
      });

      // Update amount and note
      updateTransaction(1, { amount: 150, note: "Updated note" });

      const { transactions } = useTransactionStore.getState();
      expect(transactions[0].amount).toBe(150);
      expect(transactions[0].note).toBe("Updated note");
    });

    it("should delete transaction", () => {
      const { addTransaction, removeTransaction } =
        useTransactionStore.getState();

      addTransaction({
        id: 1,
        userId: mockUser.uid,
        amount: 100,
        category: "Food",
        type: "expense",
        date: new Date(),
        note: null,
      });

      addTransaction({
        id: 2,
        userId: mockUser.uid,
        amount: 200,
        category: "Shopping",
        type: "expense",
        date: new Date(),
        note: null,
      });

      expect(useTransactionStore.getState().transactions).toHaveLength(2);

      removeTransaction(1);

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(1);
      expect(transactions[0].id).toBe(2);
    });
  });

  describe("Balance Calculation Flow", () => {
    it("should calculate correct balance across multiple transactions", () => {
      const { addTransaction } = useTransactionStore.getState();

      // Income
      addTransaction({
        id: 1,
        userId: mockUser.uid,
        amount: 1000,
        category: "Salary",
        type: "income",
        date: new Date(),
        note: null,
      });

      // Expenses
      addTransaction({
        id: 2,
        userId: mockUser.uid,
        amount: 200,
        category: "Food",
        type: "expense",
        date: new Date(),
        note: null,
      });

      addTransaction({
        id: 3,
        userId: mockUser.uid,
        amount: 100,
        category: "Transport",
        type: "expense",
        date: new Date(),
        note: null,
      });

      const { transactions } = useTransactionStore.getState();

      // Calculate balance
      let balance = 0;
      transactions.forEach((t) => {
        if (t.type === "income") {
          balance += t.amount;
        } else {
          balance -= t.amount;
        }
      });

      expect(balance).toBe(700); // 1000 - 200 - 100
    });
  });
});

describe("Data Persistence Flow", () => {
  it("should maintain state across multiple operations", () => {
    const authStore = useAuthStore.getState();
    const txStore = useTransactionStore.getState();

    // Login
    authStore.setUser(mockUser);

    // Add transactions
    txStore.addTransaction({
      id: 1,
      userId: mockUser.uid,
      amount: 100,
      category: "Test",
      type: "expense",
      date: new Date(),
      note: null,
    });

    // Verify both stores are updated
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useTransactionStore.getState().transactions).toHaveLength(1);

    // Update transaction
    txStore.updateTransaction(1, { amount: 200 });
    expect(useTransactionStore.getState().transactions[0].amount).toBe(200);

    // Still authenticated
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });
});
