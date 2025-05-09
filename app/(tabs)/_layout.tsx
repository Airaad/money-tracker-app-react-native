import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import { Pressable, View } from "react-native";

export default function TabLayout() {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarActiveTintColor: "#3299FF",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#000000",
            borderRadius: 50,
            marginHorizontal: 15,
            marginBottom: 25,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0F0D23",
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
                color={focused ? "#3299FF" : "#ffffff"}
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
                color={focused ? "#3299FF" : "#ffffff"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="user"
                size={24}
                color={focused ? "#3299FF" : "#ffffff"}
              />
            ),
          }}
        />
      </Tabs>
      <Pressable className="bg-black absolute bottom-24 right-6 h-14 w-14 justify-center items-center border-2 border-black rounded-full">
        <FontAwesome6 name="plus" size={30} color="#3299FF" />
      </Pressable>
    </View>
  );
}
