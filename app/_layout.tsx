import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <StatusBar backgroundColor="black" />
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
  );
}
