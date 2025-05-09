import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <View className="flex-1">
      <StatusBar backgroundColor="black" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
