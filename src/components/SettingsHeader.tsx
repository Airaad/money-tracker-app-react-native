import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { fontFamily } from "../dimensions/fontFamily";

const SettingsHeader = () => {
  const router = useRouter();
  return (
    <View className="mb-5">
      <View className="flex-row items-center mt-2">
        <Pressable className="pl-5" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View className="flex-1 ml-24">
          <Text
            style={{ fontFamily: fontFamily.semiBold }}
            className="text-2xl text-white"
          >
            Preferences
          </Text>
        </View>
        <View>
          {/* <Ionicons name="notifications-circle" size={30} color="#37474f" /> */}
        </View>
      </View>
    </View>
  );
};

export default SettingsHeader;
