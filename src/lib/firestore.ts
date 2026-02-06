import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface FirestoreTransaction {
  id: number;
  amount: number;
  category: string;
  type: "income" | "expense";
  note: string | null;
  date: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Get the user's transactions collection reference
 */
function getUserTransactionsRef(userId: string) {
  return collection(db, "users", userId, "transactions");
}

/**
 * Sync a transaction to Firestore (create or update)
 */
export async function syncTransactionToCloud(
  userId: string,
  transaction: {
    id: number;
    amount: number;
    category: string;
    type: "income" | "expense";
    note: string | null;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const transactionRef = doc(
      getUserTransactionsRef(userId),
      transaction.id.toString()
    );

    await setDoc(transactionRef, {
      id: transaction.id,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      note: transaction.note,
      date: Timestamp.fromDate(transaction.date),
      createdAt: Timestamp.fromDate(transaction.createdAt),
      updatedAt: Timestamp.fromDate(transaction.updatedAt),
    });

    return { success: true };
  } catch (error) {
    console.error("Error syncing transaction to cloud:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sync",
    };
  }
}

/**
 * Delete a transaction from Firestore
 */
export async function deleteTransactionFromCloud(
  userId: string,
  transactionId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const transactionRef = doc(
      getUserTransactionsRef(userId),
      transactionId.toString()
    );

    await deleteDoc(transactionRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting transaction from cloud:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete",
    };
  }
}

/**
 * Fetch all transactions from Firestore for a user
 */
export async function fetchTransactionsFromCloud(userId: string): Promise<{
  success: boolean;
  transactions?: FirestoreTransaction[];
  error?: string;
}> {
  try {
    const transactionsRef = getUserTransactionsRef(userId);
    const q = query(transactionsRef, orderBy("date", "desc"));
    const snapshot = await getDocs(q);

    const transactions: FirestoreTransaction[] = [];
    snapshot.forEach((doc) => {
      transactions.push(doc.data() as FirestoreTransaction);
    });

    return { success: true, transactions };
  } catch (error) {
    console.error("Error fetching transactions from cloud:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch",
    };
  }
}

/**
 * Sync all local transactions to Firestore (bulk sync)
 */
export async function syncAllTransactionsToCloud(
  userId: string,
  transactions: Array<{
    id: number;
    amount: number;
    category: string;
    type: "income" | "expense";
    note: string | null;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  }>
): Promise<{ success: boolean; synced: number; failed: number }> {
  let synced = 0;
  let failed = 0;

  for (const transaction of transactions) {
    const result = await syncTransactionToCloud(userId, transaction);
    if (result.success) {
      synced++;
    } else {
      failed++;
    }
  }

  return { success: failed === 0, synced, failed };
}
