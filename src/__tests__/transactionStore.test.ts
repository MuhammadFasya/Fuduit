import { useTransactionStore } from "@/store/transactionStore";
import { Transaction } from "@/db/schema";

// Reset store before each test
beforeEach(() => {
  useTransactionStore.setState({
    transactions: [],
    isLoading: false,
  });
});

describe("transactionStore", () => {
  const mockTransaction: Transaction = {
    id: 1,
    userId: "user123",
    amount: 100,
    category: "Food",
    type: "expense",
    date: new Date("2024-01-15"),
    note: "Lunch",
  };

  describe("setTransactions", () => {
    it("should set transactions array", () => {
      const { setTransactions } = useTransactionStore.getState();

      setTransactions([mockTransaction]);

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(1);
      expect(transactions[0]).toEqual(mockTransaction);
    });

    it("should replace existing transactions", () => {
      const { setTransactions } = useTransactionStore.getState();

      setTransactions([mockTransaction]);
      setTransactions([{ ...mockTransaction, id: 2 }]);

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(1);
      expect(transactions[0].id).toBe(2);
    });
  });

  describe("addTransaction", () => {
    it("should add a transaction to the beginning of the list", () => {
      const { setTransactions, addTransaction } =
        useTransactionStore.getState();

      setTransactions([mockTransaction]);
      const newTransaction: Transaction = {
        ...mockTransaction,
        id: 2,
        category: "Transport",
      };
      addTransaction(newTransaction);

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(2);
      expect(transactions[0].id).toBe(2); // New one should be first
      expect(transactions[1].id).toBe(1);
    });
  });

  describe("removeTransaction", () => {
    it("should remove a transaction by id", () => {
      const { setTransactions, removeTransaction } =
        useTransactionStore.getState();

      setTransactions([
        mockTransaction,
        { ...mockTransaction, id: 2 },
        { ...mockTransaction, id: 3 },
      ]);
      removeTransaction(2);

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(2);
      expect(transactions.find((t) => t.id === 2)).toBeUndefined();
    });

    it("should not modify array if id not found", () => {
      const { setTransactions, removeTransaction } =
        useTransactionStore.getState();

      setTransactions([mockTransaction]);
      removeTransaction(999);

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(1);
    });
  });

  describe("updateTransaction", () => {
    it("should update a transaction by id", () => {
      const { setTransactions, updateTransaction } =
        useTransactionStore.getState();

      setTransactions([mockTransaction]);
      updateTransaction(1, { amount: 200, note: "Updated" });

      const { transactions } = useTransactionStore.getState();
      expect(transactions[0].amount).toBe(200);
      expect(transactions[0].note).toBe("Updated");
      expect(transactions[0].category).toBe("Food"); // Unchanged
    });

    it("should not modify other transactions", () => {
      const { setTransactions, updateTransaction } =
        useTransactionStore.getState();

      setTransactions([mockTransaction, { ...mockTransaction, id: 2 }]);
      updateTransaction(1, { amount: 500 });

      const { transactions } = useTransactionStore.getState();
      expect(transactions.find((t) => t.id === 1)?.amount).toBe(500);
      expect(transactions.find((t) => t.id === 2)?.amount).toBe(100);
    });
  });

  describe("setLoading", () => {
    it("should set loading state to true", () => {
      const { setLoading } = useTransactionStore.getState();

      setLoading(true);

      const { isLoading } = useTransactionStore.getState();
      expect(isLoading).toBe(true);
    });

    it("should set loading state to false", () => {
      const { setLoading } = useTransactionStore.getState();

      setLoading(true);
      setLoading(false);

      const { isLoading } = useTransactionStore.getState();
      expect(isLoading).toBe(false);
    });
  });

  describe("clearTransactions", () => {
    it("should clear all transactions", () => {
      const { setTransactions, clearTransactions } =
        useTransactionStore.getState();

      setTransactions([mockTransaction, { ...mockTransaction, id: 2 }]);
      clearTransactions();

      const { transactions } = useTransactionStore.getState();
      expect(transactions).toHaveLength(0);
    });
  });
});
