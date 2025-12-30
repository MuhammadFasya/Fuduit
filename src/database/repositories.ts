import { getDatabase, generateId } from "./database";
import type { Transaction, Category, IncomeSource, Goal } from "../types";

// Transaction Repository
export class TransactionRepository {
  static async create(
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">
  ): Promise<Transaction> {
    const db = getDatabase();
    const now = new Date().toISOString();
    const id = generateId("txn");

    await db.runAsync(
      `INSERT INTO transactions (id, type, amount, categoryId, incomeSourceId, description, date, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        transaction.type,
        transaction.amount,
        transaction.categoryId ?? null,
        transaction.incomeSourceId ?? null,
        transaction.description ?? null,
        transaction.date,
        now,
        now,
      ]
    );

    return { ...transaction, id, createdAt: now, updatedAt: now };
  }

  static async findAll(): Promise<Transaction[]> {
    const db = getDatabase();
    return await db.getAllAsync<Transaction>(
      "SELECT * FROM transactions ORDER BY date DESC, createdAt DESC"
    );
  }

  static async findByDateRange(
    startDate: string,
    endDate: string
  ): Promise<Transaction[]> {
    const db = getDatabase();
    return await db.getAllAsync<Transaction>(
      "SELECT * FROM transactions WHERE date BETWEEN ? AND ? ORDER BY date DESC",
      [startDate, endDate]
    );
  }

  static async findById(id: string): Promise<Transaction | null> {
    const db = getDatabase();
    return await db.getFirstAsync<Transaction>(
      "SELECT * FROM transactions WHERE id = ?",
      [id]
    );
  }

  static async update(
    id: string,
    updates: Partial<Transaction>
  ): Promise<void> {
    const db = getDatabase();
    const now = new Date().toISOString();

    const fields = Object.keys(updates).filter(
      (k) => k !== "id" && k !== "createdAt"
    );
    const setClause = fields.map((f) => `${f} = ?`).join(", ");
    const values = [
      ...fields.map((f) => updates[f as keyof Transaction]),
      now,
      id,
    ];

    await db.runAsync(
      `UPDATE transactions SET ${setClause}, updatedAt = ? WHERE id = ?`,
      values
    );
  }

  static async delete(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync("DELETE FROM transactions WHERE id = ?", [id]);
  }

  static async getTotalByType(
    type: "income" | "expense",
    startDate?: string,
    endDate?: string
  ): Promise<number> {
    const db = getDatabase();
    let query =
      "SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE type = ?";
    const params: any[] = [type];

    if (startDate && endDate) {
      query += " AND date BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }

    const result = await db.getFirstAsync<{ total: number }>(query, params);
    return result?.total ?? 0;
  }
}

// Category Repository
export class CategoryRepository {
  static async create(
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ): Promise<Category> {
    const db = getDatabase();
    const now = new Date().toISOString();
    const id = generateId("cat");

    await db.runAsync(
      "INSERT INTO categories (id, name, icon, color, type, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        category.name,
        category.icon,
        category.color,
        category.type,
        now,
        now,
      ]
    );

    return { ...category, id, createdAt: now, updatedAt: now };
  }

  static async findAll(): Promise<Category[]> {
    const db = getDatabase();
    return await db.getAllAsync<Category>(
      "SELECT * FROM categories ORDER BY name ASC"
    );
  }

  static async findById(id: string): Promise<Category | null> {
    const db = getDatabase();
    return await db.getFirstAsync<Category>(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
  }

  static async update(id: string, updates: Partial<Category>): Promise<void> {
    const db = getDatabase();
    const now = new Date().toISOString();

    const fields = Object.keys(updates).filter(
      (k) => k !== "id" && k !== "createdAt"
    );
    const setClause = fields.map((f) => `${f} = ?`).join(", ");
    const values = [
      ...fields.map((f) => updates[f as keyof Category]),
      now,
      id,
    ];

    await db.runAsync(
      `UPDATE categories SET ${setClause}, updatedAt = ? WHERE id = ?`,
      values
    );
  }

  static async delete(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync("DELETE FROM categories WHERE id = ?", [id]);
  }
}

// Income Source Repository
export class IncomeSourceRepository {
  static async create(
    source: Omit<IncomeSource, "id" | "createdAt" | "updatedAt">
  ): Promise<IncomeSource> {
    const db = getDatabase();
    const now = new Date().toISOString();
    const id = generateId("inc");

    await db.runAsync(
      "INSERT INTO incomeSources (id, name, icon, color, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [id, source.name, source.icon, source.color, now, now]
    );

    return { ...source, id, createdAt: now, updatedAt: now };
  }

  static async findAll(): Promise<IncomeSource[]> {
    const db = getDatabase();
    return await db.getAllAsync<IncomeSource>(
      "SELECT * FROM incomeSources ORDER BY name ASC"
    );
  }

  static async findById(id: string): Promise<IncomeSource | null> {
    const db = getDatabase();
    return await db.getFirstAsync<IncomeSource>(
      "SELECT * FROM incomeSources WHERE id = ?",
      [id]
    );
  }

  static async update(
    id: string,
    updates: Partial<IncomeSource>
  ): Promise<void> {
    const db = getDatabase();
    const now = new Date().toISOString();

    const fields = Object.keys(updates).filter(
      (k) => k !== "id" && k !== "createdAt"
    );
    const setClause = fields.map((f) => `${f} = ?`).join(", ");
    const values = [
      ...fields.map((f) => updates[f as keyof IncomeSource]),
      now,
      id,
    ];

    await db.runAsync(
      `UPDATE incomeSources SET ${setClause}, updatedAt = ? WHERE id = ?`,
      values
    );
  }

  static async delete(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync("DELETE FROM incomeSources WHERE id = ?", [id]);
  }
}

// Goal Repository
export class GoalRepository {
  static async create(
    goal: Omit<Goal, "id" | "createdAt" | "updatedAt">
  ): Promise<Goal> {
    const db = getDatabase();
    const now = new Date().toISOString();
    const id = generateId("goal");

    await db.runAsync(
      "INSERT INTO goals (id, name, targetAmount, currentAmount, deadline, color, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        goal.name,
        goal.targetAmount,
        goal.currentAmount,
        goal.deadline ?? null,
        goal.color,
        now,
        now,
      ]
    );

    return { ...goal, id, createdAt: now, updatedAt: now };
  }

  static async findAll(): Promise<Goal[]> {
    const db = getDatabase();
    return await db.getAllAsync<Goal>(
      "SELECT * FROM goals ORDER BY createdAt DESC"
    );
  }

  static async findById(id: string): Promise<Goal | null> {
    const db = getDatabase();
    return await db.getFirstAsync<Goal>("SELECT * FROM goals WHERE id = ?", [
      id,
    ]);
  }

  static async update(id: string, updates: Partial<Goal>): Promise<void> {
    const db = getDatabase();
    const now = new Date().toISOString();

    const fields = Object.keys(updates).filter(
      (k) => k !== "id" && k !== "createdAt"
    );
    const setClause = fields.map((f) => `${f} = ?`).join(", ");
    const values = [...fields.map((f) => updates[f as keyof Goal]), now, id];

    await db.runAsync(
      `UPDATE goals SET ${setClause}, updatedAt = ? WHERE id = ?`,
      values
    );
  }

  static async delete(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync("DELETE FROM goals WHERE id = ?", [id]);
  }

  static async updateProgress(id: string, amount: number): Promise<void> {
    const db = getDatabase();
    const now = new Date().toISOString();
    await db.runAsync(
      "UPDATE goals SET currentAmount = currentAmount + ?, updatedAt = ? WHERE id = ?",
      [amount, now, id]
    );
  }
}
