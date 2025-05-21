import migrations from '@/drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BudgetProvider } from '../context/BudgetContext';
import { db } from "../db/dbConfig";
import "./global.css";

export default function RootLayout() {
  const {success, error: migrationError} = useMigrations(db, migrations);
  useDrizzleStudio(db);
  // if (migrationError) {
  //   console.error('Migration error:', migrationError);
  //   return <Text>Database error : {migrationError.message}</Text>;
  // }

  // if (!success) {
  //   return <Text>Loading database...</Text>;
  // }
  return (
    <BudgetProvider>
    <GestureHandlerRootView className="flex-1">
      <StatusBar/>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(create)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
    </BudgetProvider>
  );
}
