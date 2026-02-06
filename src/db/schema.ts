import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  amount: real("amount").notNull(),
  category: text("category").notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  note: text("note"),
});

// Type exports for use throughout the app
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
