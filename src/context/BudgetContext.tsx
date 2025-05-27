import { desc, eq } from "drizzle-orm";
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
    category: CategoryType;
  }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [itemsList, setItemsList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

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
            .where(eq(categories.name, category.name))
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
      await fetchData();
      Alert.alert("Entry successfully entered");
      router.back();
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
      await fetchData();
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
    category: CategoryType;
  }) => {
    try {
      setLoading(true);
      setError(null);

      await db.transaction(async (tx) => {
        if (category) {
          const existingCategory = await db
            .select()
            .from(categories)
            .where(eq(categories.name, category.name))
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
        await tx
          .update(expenses)
          .set(expense)
          .where(eq(expenses.id, expense.id))
          .run();
      });
      await fetchData();
      Alert.alert("Entry updated successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        items: itemsList,
        getData,
        insertData,
        deleteData,
        updateData,
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
