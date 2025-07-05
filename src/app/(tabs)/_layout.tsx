import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            paddingVertical: 4,
            marginTop: 4,
          },
          tabBarActiveTintColor: "#ffc727",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#37474f",
            height: 63,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={23}
                name="home"
                color={focused ? "#ffc727" : "#ffffff"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="analysis"
          options={{
            title: "Analysis",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Octicons
                name="graph"
                size={24}
                color={focused ? "#ffc727" : "#ffffff"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings"
                size={24}
                color={focused ? "#ffc727" : "#ffffff"}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
