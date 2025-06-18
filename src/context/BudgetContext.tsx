import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subDays,
} from "date-fns";
import { and, desc, eq, gte, lte, sum } from "drizzle-orm";
import { createContext, useContext, useEffect, useState } from "react";
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
  targetDate: Date;
  setTargetDate: React.Dispatch<React.SetStateAction<Date>>;
  userPreferenceType: "daily" | "weekly" | "monthly";
  userCarryOverPreference: boolean;
  userCurrencyPreference: string;
  storeUserPreferenceData: (
    value: "daily" | "weekly" | "monthly",
    carryOverValue: boolean,
    currencySymbolValue: string
  ) => Promise<void>;
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
  getTotal: (
    filterType: "daily" | "weekly" | "monthly",
    targetDate: Date,
    carryOver: boolean
  ) => Promise<any>;
  loading: boolean;
  error: string | null;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [itemsList, setItemsList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetDateForFetch, setTargetDateForFetch] = useState(new Date());
  const [userPreference, setUserPreference] = useState<
    "daily" | "weekly" | "monthly"
  >("monthly");
  const [carryOverTotal, setCarryOverTotal] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  // Using async storage to store the user preference
  const storeUserPreferenceData = async (
    value: "daily" | "monthly" | "weekly",
    carryOverValue: boolean,
    currencySymbolValue: string
  ) => {
    const preferences = {
      fetchType: value,
      carryOver: carryOverValue,
      currencySymbol: currencySymbolValue,
    };
    try {
      setUserPreference(value);
      setCarryOverTotal(carryOverValue);
      setCurrencySymbol(currencySymbolValue);
      await AsyncStorage.setItem(
        "userPreferences",
        JSON.stringify(preferences)
      );
      await fetchData(value, targetDateForFetch);
    } catch (e) {
      console.log("Something went wrong while storing user preference", e);
    }
  };

  // Using async storage to get the user preference
  const getUserPreferenceData = async () => {
    try {
      const stored = await AsyncStorage.getItem("userPreferences");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.fetchType) setUserPreference(parsed.fetchType);
        if (typeof parsed.carryOver === "boolean")
          setCarryOverTotal(parsed.carryOver);
        if (parsed.currencySymbol) setCurrencySymbol(parsed.currencySymbol);
        await fetchData(parsed.fetchType, targetDateForFetch);
      } else {
        setUserPreference("monthly");
        setCarryOverTotal(false);
        setCurrencySymbol("₹");
        await fetchData("monthly", targetDateForFetch);
      }
    } catch (e) {
      console.log("Something went wrong while getting user preference", e);
    }
  };

  const fetchData = async (
    filterType: "daily" | "weekly" | "monthly",
    targetDate: Date = new Date()
  ) => {
    try {
      setLoading(true);
      setError(null);

      let whereCondition;

      if (filterType === "daily") {
        const start = startOfDay(targetDate);
        const end = endOfDay(targetDate);
        whereCondition = and(
          gte(expenses.createdDate, start.toISOString()),
          lte(expenses.createdDate, end.toISOString())
        );
      } else if (filterType === "weekly") {
        const start = startOfDay(subDays(targetDate, 6));
        const end = endOfDay(targetDate);
        whereCondition = and(
          gte(expenses.createdDate, start.toISOString()),
          lte(expenses.createdDate, end.toISOString())
        );
      } else if (filterType === "monthly") {
        const start = startOfMonth(targetDate);
        const end = endOfMonth(targetDate);
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
            color: categories.color,
            bgColor: categories.bgColor,
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
            color: categories.color,
            bgColor: categories.bgColor,
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
      await fetchData(userPreference, targetDateForFetch);
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
      await fetchData(userPreference, targetDateForFetch);
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

      await fetchData(userPreference, targetDateForFetch);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update data");
    } finally {
      setLoading(false);
    }
  };

  const getTotal = async (
    filterType: "daily" | "weekly" | "monthly",
    targetDate: Date = new Date(),
    carryOver = false
  ) => {
    try {
      setLoading(true);
      setError(null);

      let whereCondition;

      if (filterType === "daily") {
        const start = startOfDay(targetDate);
        const end = endOfDay(targetDate);
        whereCondition = and(
          gte(expenses.createdDate, start.toISOString()),
          lte(expenses.createdDate, end.toISOString())
        );
      } else if (filterType === "weekly") {
        const start = startOfDay(subDays(targetDate, 6));
        const end = endOfDay(targetDate);
        whereCondition = and(
          gte(expenses.createdDate, start.toISOString()),
          lte(expenses.createdDate, end.toISOString())
        );
      } else if (filterType === "monthly") {
        const start = startOfMonth(targetDate);
        const end = endOfMonth(targetDate);
        whereCondition = and(
          gte(expenses.createdDate, start.toISOString()),
          lte(expenses.createdDate, end.toISOString())
        );
      }
      //For total expense
      const expenseResult = await db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .innerJoin(categories, eq(expenses.categoryId, categories.id))
        .where(and(eq(categories.type, "expense"), whereCondition))
        .get();

      const totalExpense = Number(expenseResult?.total) || 0;

      //for total income
      const incomeResult = await db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .innerJoin(categories, eq(expenses.categoryId, categories.id))
        .where(and(eq(categories.type, "income"), whereCondition))
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
    getUserPreferenceData();
  }, [targetDateForFetch]);

  return (
    <BudgetContext.Provider
      value={{
        targetDate: targetDateForFetch,
        setTargetDate: setTargetDateForFetch,
        storeUserPreferenceData,
        userPreferenceType: userPreference,
        userCarryOverPreference: carryOverTotal,
        userCurrencyPreference: currencySymbol,
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
