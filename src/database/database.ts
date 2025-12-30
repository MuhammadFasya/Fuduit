import * as SQLite from "expo-sqlite";
import { APP_CONFIG } from "../config/constants";

let database: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync(APP_CONFIG.databaseName);
  await createTables(database);
  await seedDefaultData(database);

  return database;
};

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!database) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return database;
};

const createTables = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  // Create transactions table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
      amount REAL NOT NULL,
      categoryId TEXT,
      incomeSourceId TEXT,
      description TEXT,
      date TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL,
      FOREIGN KEY (incomeSourceId) REFERENCES incomeSources(id) ON DELETE SET NULL
    );
  `);

  // Create categories table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'expense',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  // Create income sources table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS incomeSources (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  // Create goals table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      targetAmount REAL NOT NULL,
      currentAmount REAL NOT NULL DEFAULT 0,
      deadline TEXT,
      color TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  // Create indexes for better query performance
  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
    CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
    CREATE INDEX IF NOT EXISTS idx_transactions_categoryId ON transactions(categoryId);
  `);
};

const seedDefaultData = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  // Check if data already exists
  const categoryCount = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM categories"
  );

  if (categoryCount && categoryCount.count > 0) {
    return; // Data already seeded
  }

  const now = new Date().toISOString();

  // Seed default categories
  const defaultCategories = [
    { name: "Food & Dining", icon: "🍽️", color: "orange" },
    { name: "Transportation", icon: "🚗", color: "blue" },
    { name: "Shopping", icon: "🛍️", color: "pink" },
    { name: "Entertainment", icon: "🎬", color: "purple" },
    { name: "Bills & Utilities", icon: "💡", color: "yellow" },
    { name: "Healthcare", icon: "⚕️", color: "red" },
    { name: "Education", icon: "📚", color: "cyan" },
    { name: "Other", icon: "📦", color: "green" },
  ];

  for (const category of defaultCategories) {
    const id = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.runAsync(
      "INSERT INTO categories (id, name, icon, color, type, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, category.name, category.icon, category.color, "expense", now, now]
    );
  }

  // Seed default income sources
  const defaultIncomeSources = [
    { name: "Salary", icon: "💼", color: "green" },
    { name: "Freelance", icon: "💻", color: "blue" },
    { name: "Investment", icon: "📈", color: "purple" },
    { name: "Other", icon: "💰", color: "cyan" },
  ];

  for (const source of defaultIncomeSources) {
    const id = `inc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.runAsync(
      "INSERT INTO incomeSources (id, name, icon, color, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [id, source.name, source.icon, source.color, now, now]
    );
  }
};

// Helper function to generate unique IDs
export const generateId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
