import { Stack } from "expo-router";

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="update"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
