import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
          paddingTop: 16,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: "#000000",
        tabBarStyle: {
          backgroundColor: '#DFF7E2',
          height: 80,
          position: "absolute",
          bottom: 0,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => <Ionicons size={23} name="home" color="#000000" />,
        }}
      />
    </Tabs>
  );
}
