import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const SettingsHeader = () => {
  const router = useRouter();
  return (
    <View>
      <View className="flex-row justify-around items-center mt-2">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text className="text-2xl text-white tracking-wider font-semibold">
          Preferences
        </Text>
        <View>
          {/* <Ionicons name="notifications-circle" size={30} color="#37474f" /> */}
        </View>
      </View>
      <View className="flex-row items-center justify-center mt-10 w-full"></View>
    </View>
  );
};

export default SettingsHeader;
