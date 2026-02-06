import { useCallback } from "react";
import { eq, and, desc, gte, lte } from "drizzle-orm";

import { db } from "@/db/client";
import { transactions, Transaction, NewTransaction } from "@/db/schema";
import { useTransactionStore } from "@/store/transactionStore";
import { useAuthStore } from "@/store/authStore";
import {
  syncTransactionToCloud,
  deleteTransactionFromCloud,
} from "@/lib/firestore";

interface TransactionFilter {
  type?: "income" | "expense";
  startDate?: Date;
  endDate?: Date;
  category?: string;
}

interface UseTransactionsReturn {
  transactions: Transaction[];
  isLoading: boolean;
  fetchTransactions: (filter?: TransactionFilter) => Promise<void>;
  addTransaction: (
    data: Omit<NewTransaction, "userId">
  ) => Promise<{ success: boolean; error?: string }>;
  updateTransaction: (
    id: number,
    data: Partial<Omit<NewTransaction, "userId">>
  ) => Promise<{ success: boolean; error?: string }>;
  deleteTransaction: (
    id: number
  ) => Promise<{ success: boolean; error?: string }>;
  getTransactionById: (id: number) => Promise<Transaction | null>;
}

/**
 * Hook to manage transaction CRUD operations
 * All operations are scoped to the current authenticated user
 */
export const useTransactions = (): UseTransactionsReturn => {
  const { user } = useAuthStore();
  const {
    transactions: storeTransactions,
    isLoading,
    setTransactions,
    addTransaction: addToStore,
    updateTransaction: updateInStore,
    removeTransaction,
    setLoading,
  } = useTransactionStore();

  /**
   * Fetch all transactions for the current user
   */
  const fetchTransactions = useCallback(
    async (filter?: TransactionFilter): Promise<void> => {
      if (!user?.uid) {
        console.warn("[Transactions] No authenticated user");
        return;
      }

      try {
        setLoading(true);

        // Build query conditions
        const conditions = [eq(transactions.userId, user.uid)];

        if (filter?.type) {
          conditions.push(eq(transactions.type, filter.type));
        }

        if (filter?.category) {
          conditions.push(eq(transactions.category, filter.category));
        }

        if (filter?.startDate) {
          conditions.push(gte(transactions.date, filter.startDate));
        }

        if (filter?.endDate) {
          conditions.push(lte(transactions.date, filter.endDate));
        }

        const result = await db
          .select()
          .from(transactions)
          .where(and(...conditions))
          .orderBy(desc(transactions.date));

        setTransactions(result);
      } catch (error) {
        console.error("[Transactions] Fetch error:", error);
      } finally {
        setLoading(false);
      }
    },
    [user?.uid, setTransactions, setLoading]
  );

  /**
   * Add a new transaction
   */
  const addTransaction = useCallback(
    async (
      data: Omit<NewTransaction, "userId">
    ): Promise<{ success: boolean; error?: string }> => {
      if (!user?.uid) {
        return { success: false, error: "Not authenticated" };
      }

      try {
        setLoading(true);

        const newTransaction: NewTransaction = {
          ...data,
          userId: user.uid,
        };

        const result = await db
          .insert(transactions)
          .values(newTransaction)
          .returning();

        if (result.length > 0) {
          addToStore(result[0]);

          // Sync to Firestore in background (non-blocking)
          syncTransactionToCloud(user.uid, {
            ...result[0],
            date: result[0].date,
            createdAt: new Date(),
            updatedAt: new Date(),
          }).catch((err) => console.warn("[Firestore] Sync failed:", err));

          return { success: true };
        }

        return { success: false, error: "Failed to insert transaction" };
      } catch (error) {
        console.error("[Transactions] Add error:", error);
        return { success: false, error: "Failed to add transaction" };
      } finally {
        setLoading(false);
      }
    },
    [user?.uid, addToStore, setLoading]
  );

  /**
   * Update an existing transaction
   */
  const updateTransaction = useCallback(
    async (
      id: number,
      data: Partial<Omit<NewTransaction, "userId">>
    ): Promise<{ success: boolean; error?: string }> => {
      if (!user?.uid) {
        return { success: false, error: "Not authenticated" };
      }

      try {
        setLoading(true);

        // Ensure user can only update their own transactions
        const result = await db
          .update(transactions)
          .set(data)
          .where(
            and(eq(transactions.id, id), eq(transactions.userId, user.uid))
          )
          .returning();

        if (result.length > 0) {
          updateInStore(id, result[0]);

          // Sync update to Firestore in background
          syncTransactionToCloud(user.uid, {
            ...result[0],
            date: result[0].date,
            createdAt: new Date(), // We don't track original creation
            updatedAt: new Date(),
          }).catch((err) => console.warn("[Firestore] Sync failed:", err));

          return { success: true };
        }

        return {
          success: false,
          error: "Transaction not found or not authorized",
        };
      } catch (error) {
        console.error("[Transactions] Update error:", error);
        return { success: false, error: "Failed to update transaction" };
      } finally {
        setLoading(false);
      }
    },
    [user?.uid, updateInStore, setLoading]
  );

  /**
   * Delete a transaction
   */
  const deleteTransaction = useCallback(
    async (id: number): Promise<{ success: boolean; error?: string }> => {
      if (!user?.uid) {
        return { success: false, error: "Not authenticated" };
      }

      try {
        setLoading(true);

        // Ensure user can only delete their own transactions
        const result = await db
          .delete(transactions)
          .where(
            and(eq(transactions.id, id), eq(transactions.userId, user.uid))
          )
          .returning();

        if (result.length > 0) {
          removeTransaction(id);

          // Delete from Firestore in background
          deleteTransactionFromCloud(user.uid, id).catch((err) =>
            console.warn("[Firestore] Delete sync failed:", err)
          );

          return { success: true };
        }

        return {
          success: false,
          error: "Transaction not found or not authorized",
        };
      } catch (error) {
        console.error("[Transactions] Delete error:", error);
        return { success: false, error: "Failed to delete transaction" };
      } finally {
        setLoading(false);
      }
    },
    [user?.uid, removeTransaction, setLoading]
  );

  /**
   * Get a single transaction by ID
   */
  const getTransactionById = useCallback(
    async (id: number): Promise<Transaction | null> => {
      if (!user?.uid) {
        return null;
      }

      try {
        const result = await db
          .select()
          .from(transactions)
          .where(
            and(eq(transactions.id, id), eq(transactions.userId, user.uid))
          )
          .limit(1);

        return result.length > 0 ? result[0] : null;
      } catch (error) {
        console.error("[Transactions] Get by ID error:", error);
        return null;
      }
    },
    [user?.uid]
  );

  return {
    transactions: storeTransactions,
    isLoading,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
  };
};
