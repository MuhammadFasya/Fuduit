import { expoDb } from "./client";

/**
 * SQL migration to create the transactions table
 */
const CREATE_TRANSACTIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    date INTEGER NOT NULL,
    note TEXT,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );
`;

/**
 * Create index for faster user-specific queries
 */
const CREATE_USER_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
`;

/**
 * Create index for date-based queries
 */
const CREATE_DATE_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
`;

/**
 * Initialize the database with required tables and indexes
 * Call this on app startup before any database operations
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Create transactions table
    expoDb.execSync(CREATE_TRANSACTIONS_TABLE);

    // Create indexes for performance
    expoDb.execSync(CREATE_USER_INDEX);
    expoDb.execSync(CREATE_DATE_INDEX);

    console.log("[DB] Database initialized successfully");
  } catch (error) {
    console.error("[DB] Failed to initialize database:", error);
    throw error;
  }
};

/**
 * Reset the database (for development/testing only)
 * WARNING: This will delete all data!
 */
export const resetDatabase = async (): Promise<void> => {
  try {
    expoDb.execSync("DROP TABLE IF EXISTS transactions;");
    await initializeDatabase();
    console.log("[DB] Database reset successfully");
  } catch (error) {
    console.error("[DB] Failed to reset database:", error);
    throw error;
  }
};
