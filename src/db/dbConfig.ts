import * as schema from "@/src/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

const expo = SQLite.openDatabaseSync("budget.db", {
  enableChangeListener: true,
});
export const db = drizzle(expo, { schema });
