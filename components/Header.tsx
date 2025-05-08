import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  return (
    <View className="px-8">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-2xl text-white tracking-wider font-bold">
            Hi, Sheikh Airaad
          </Text>
          <Text className="text-sm text-white font-normal">Welcome Back</Text>
        </View>
        <View>
          <Ionicons name="notifications-circle" size={30} color="white" />
        </View>
      </View>

      <View className="flex-row mt-10 justify-around">
        <View className="flex">
          <Text className="text-lg text-white tracking-widest font-medium">
            Total Balance
          </Text>
          <Text className="text-2xl text-blue-500">$778.30</Text>
        </View>
        <View className="w-[1px] h-10 bg-gray-700" />
        <View>
          <Text className="text-lg text-white tracking-widest font-medium">
            Total Expense
          </Text>
          <Text className="text-2xl text-blue-500">-$778.30</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
