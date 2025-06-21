import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs, useRouter } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: "transparent" }}
              pressOpacity={0.3}
            />
          ),
          tabBarShowLabel: false,
          tabBarItemStyle: {
            paddingVertical: 8,
            marginTop: 5,
          },
          tabBarActiveTintColor: "#ffc727",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#37474f",
            height: 72,
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
      {/* <Pressable
        onPress={() => router.push("/add")}
        className="bg-black absolute bottom-24 right-6 h-14 w-14 justify-center items-center border-2 border-black rounded-full"
      >
        <FontAwesome6 name="plus" size={30} color="#ffc727" />
      </Pressable> */}
    </View>
  );
}
