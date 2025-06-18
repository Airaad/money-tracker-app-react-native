import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { BudgetProvider } from "../context/BudgetContext";
import { db } from "../db/dbConfig";
import "./global.css";

export default function RootLayout() {
  const { success, error: migrationError } = useMigrations(db, migrations);
  useDrizzleStudio(db);
  // Handle loading state
  if (!success && !migrationError) {
    return (
      <GestureHandlerRootView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Loading database...</Text>
      </GestureHandlerRootView>
    );
  }

  // Handle error state
  if (migrationError) {
    return (
      <GestureHandlerRootView className="flex-1 items-center justify-center p-4">
        <View className="bg-red-100 p-4 rounded-lg">
          <Text className="text-red-800 font-bold">Database Error</Text>
          <Text className="text-red-600 mt-2">{migrationError.message}</Text>
          <Text className="text-red-600 mt-4">
            Please restart the app. If the problem persists, contact support.
          </Text>
        </View>
      </GestureHandlerRootView>
    );
  }
  return (
    <GestureHandlerRootView className="flex-1">
      <BudgetProvider>
        <StatusBar translucent backgroundColor="transparent" />
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
              animation: "slide_from_right",
              presentation: "transparentModal",
            }}
          />
        </Stack>
        <Toast />
      </BudgetProvider>
    </GestureHandlerRootView>
  );
}
