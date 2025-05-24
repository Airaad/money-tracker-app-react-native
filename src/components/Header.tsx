import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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

      <View className="flex-row mt-10 justify-between">
        <View className="flex">
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="account-balance" size={20} color="white" />
            <Text className="text-xl text-white tracking-widest font-medium">
              Total Balance
            </Text>
          </View>
          <Text className="text-2xl text-green-500">$778.30</Text>
        </View>
        <View className="w-[1px] h-10 bg-gray-700" />
        <View>
          <View className="flex-row items-center gap-1">
            <MaterialIcons
              name="account-balance-wallet"
              size={20}
              color="white"
            />
            <Text className="text-xl text-white tracking-widest font-medium">
              Total Expense
            </Text>
          </View>
          <Text className="text-2xl text-red-500">-$778.30</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
