import { endOfMonth, startOfDay, startOfMonth, subDays } from "date-fns";
import { and, desc, eq, gte, lte, sum } from "drizzle-orm";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { db } from "../db/dbConfig";
import {
  categories,
  CategoryType,
  ExpenseItemType,
  expenses,
} from "../db/schema";

export type ItemType = ExpenseItemType & { category: CategoryType };

interface BudgetContextType {
  items: ItemType[];
  getData: (id: number) => Promise<any>;
  insertData: ({
    expense,
    category,
  }: {
    expense: Omit<ExpenseItemType, "id">;
    category: Omit<CategoryType, "id">;
  }) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
  updateData: ({
    expense,
    category,
  }: {
    expense: ExpenseItemType;
    category: Omit<CategoryType, "id">;
  }) => Promise<void>;
  getTotal: () => Promise<any>;
  loading: boolean;
  error: string | null;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [itemsList, setItemsList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (filterType: "daily" | "weekly" | "monthly") => {
    try {
      setLoading(true);
      setError(null);

      const now = new Date();
      let whereCondition;

      if (filterType === "daily") {
        const start = startOfDay(now);
        whereCondition = gte(expenses.createdDate, start.toISOString());
      } else if (filterType === "weekly") {
        const start = subDays(now, 7);
        whereCondition = gte(expenses.createdDate, start.toISOString());
      } else if (filterType === "monthly") {
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        whereCondition = and(
          gte(expenses.createdDate, start.toISOString()),
          lte(expenses.createdDate, end.toISOString())
        );
      }

      const result = await db
        .select({
          id: expenses.id,
          amount: expenses.amount,
          description: expenses.description,
          createdDate: expenses.createdDate,
          category: {
            id: categories.id,
            name: categories.name,
            icon: categories.icon,
            type: categories.type,
          },
        })
        .from(expenses)
        .leftJoin(categories, eq(expenses.categoryId, categories.id))
        .where(whereCondition)
        .orderBy(desc(expenses.createdDate))
        .execute();

      setItemsList(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const getData = async (id: number) => {
    try {
      const result = await db
        .select({
          id: expenses.id,
          amount: expenses.amount,
          description: expenses.description,
          createdDate: expenses.createdDate,
          category: {
            id: categories.id,
            name: categories.name,
            icon: categories.icon,
            type: categories.type,
          },
        })
        .from(expenses)
        .where(eq(expenses.id, id))
        .leftJoin(categories, eq(expenses.categoryId, categories.id))
        .get();
      if (!result) {
        console.log("No such entry found");
        return;
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get data");
    }
  };

  const insertData = async ({
    expense,
    category,
  }: {
    expense: Omit<ExpenseItemType, "id">;
    category: Omit<CategoryType, "id">;
  }) => {
    try {
      setLoading(true);
      setError(null);
      await db.transaction(async (tx) => {
        if (category) {
          const existingCategory = await db
            .select()
            .from(categories)
            .where(
              and(
                eq(categories.name, category.name),
                eq(categories.type, category.type)
              )
            )
            .get();
          if (existingCategory) {
            expense.categoryId = existingCategory.id;
          } else {
            const newCategory = await tx
              .insert(categories)
              .values(category)
              .returning({ id: categories.id })
              .get();
            expense.categoryId = newCategory.id;
          }
        }
        await tx.insert(expenses).values(expense).run();
      });
      await fetchData("monthly");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to insert data");
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      await db.delete(expenses).where(eq(expenses.id, id));
      await fetchData("monthly");
      Alert.alert("Entry deleted successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete data");
    } finally {
      setLoading(false);
    }
  };

  const updateData = async ({
    expense,
    category,
  }: {
    expense: ExpenseItemType;
    category: Omit<CategoryType, "id">;
  }) => {
    try {
      setLoading(true);
      setError(null);

      if (!expense.id) {
        throw new Error("Missing expense ID for update.");
      }

      await db.transaction(async (tx) => {
        let updatedExpense = { ...expense };

        if (category) {
          const existingCategory = await db
            .select()
            .from(categories)
            .where(eq(categories.name, category.name))
            .get();

          if (existingCategory) {
            updatedExpense.categoryId = existingCategory.id;
          } else {
            const newCategory = await tx
              .insert(categories)
              .values(category)
              .returning({ id: categories.id })
              .get();

            updatedExpense.categoryId = newCategory.id;
          }
        }

        await tx
          .update(expenses)
          .set(updatedExpense)
          .where(eq(expenses.id, updatedExpense.id))
          .run();
      });

      await fetchData("monthly");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update data");
    } finally {
      setLoading(false);
    }
  };

  const getTotal = async () => {
    try {
      setLoading(true);
      setError(null);
      //For total expense
      const expenseResult = await db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .innerJoin(categories, eq(expenses.categoryId, categories.id))
        .where(eq(categories.type, "expense"))
        .get();

      const totalExpense = Number(expenseResult?.total) || 0;

      //for total income
      const incomeResult = await db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .innerJoin(categories, eq(expenses.categoryId, categories.id))
        .where(eq(categories.type, "income"))
        .get();

      const totalIncome = Number(incomeResult?.total) || 0;

      const netBalance = totalIncome - totalExpense;

      return {
        totalIncome,
        totalExpense,
        netBalance,
      };
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load total transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("monthly");
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        items: itemsList,
        getData,
        insertData,
        deleteData,
        updateData,
        getTotal,
        loading,
        error,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context)
    throw new Error("useBudget must be used within a BudgetProvider");
  return context;
}
