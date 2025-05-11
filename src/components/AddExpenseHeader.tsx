import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const AddExpenseHeader = () => {
  const router = useRouter();
  return (
    <View>
      <View className="px-8">
        <View className="flex-row justify-between items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <Text className="text-2xl text-white tracking-wider font-bold">
            Add Expenses
          </Text>
          <View>
            <Ionicons name="notifications-circle" size={30} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddExpenseHeader;
