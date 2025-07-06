import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { BudgetProvider } from "../context/BudgetContext";
import { ThemeProvider } from "../context/ThemeContext";
import { db } from "../db/dbConfig";
import { fontFamily } from "../dimensions/fontFamily";
import "./global.css";

export default function RootLayout() {
  const { success, error: migrationError } = useMigrations(db, migrations);
  useDrizzleStudio(db);

  const [loaded, error] = useFonts({
    [fontFamily.light]: require("../../assets/fonts/Poppins-Light.ttf"),
    [fontFamily.regular]: require("../../assets/fonts/Poppins-Regular.ttf"),
    [fontFamily.medium]: require("../../assets/fonts/Poppins-Medium.ttf"),
    [fontFamily.semiBold]: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    [fontFamily.bold]: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  // Handle loading state
  if (!success && !migrationError && loaded) {
    return (
      <ThemeProvider>
        <GestureHandlerRootView className="flex-1 items-center justify-center"></GestureHandlerRootView>
      </ThemeProvider>
    );
  }

  // Handle error state
  if (migrationError) {
    return (
      <ThemeProvider>
        <GestureHandlerRootView className="flex-1 items-center justify-center p-4">
          <View className="bg-red-100 p-4 rounded-lg">
            <Text className="text-red-800 font-bold">Database Error</Text>
            <Text className="text-red-600 mt-2">{migrationError.message}</Text>
            <Text className="text-red-600 mt-4">
              Please restart the app. If the problem persists, contact support.
            </Text>
          </View>
        </GestureHandlerRootView>
      </ThemeProvider>
    );
  }
  return (
    <GestureHandlerRootView>
      <BudgetProvider>
        <ThemeProvider>
          <StatusBar
            translucent
            backgroundColor="transparent"
          />
          <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
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
          </SafeAreaView>
        </ThemeProvider>
      </BudgetProvider>
    </GestureHandlerRootView>
  );
}
