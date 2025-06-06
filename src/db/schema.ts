import { sql } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: int("id").unique().primaryKey({ autoIncrement: true }),
  name: text("name").notNull(), // e.g., "Food", "Salary"
  icon: text("icon").notNull(), // e.g., "🍕"
  type: text("type").notNull(), // "income" or "expense"
});

export const expenses = sqliteTable("expenses", {
  id: int("id").unique().primaryKey({ autoIncrement: true }),
  categoryId: int("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  amount: real("amount").notNull(), // e.g., 49.99
  description: text("description").notNull(),
  createdDate: text("created_date")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`), // e.g., "2025-05-20"
});

export type CategoryType = typeof categories.$inferSelect;
export type ExpenseItemType = typeof expenses.$inferSelect;
