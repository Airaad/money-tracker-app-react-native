import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <View className="flex-1">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
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
