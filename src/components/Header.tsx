import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";

const Header = () => {
  const router = useRouter();
  const { items, getTotal, userPreferenceType, targetDate } = useBudget();
  const [sumOfData, setSumOfData] = useState<any>(null);

  useEffect(() => {
    const totalData = async () => {
      const result = await getTotal(userPreferenceType, targetDate);
      setSumOfData(result);
    };
    totalData();
  }, [items]);

  return (
    <View className="w-[95%] mx-auto">
      <View className="flex-row justify-between items-center px-3">
        <View>
          <Text className="text-2xl text-black tracking-wider font-bold">
            Hi, Sheikh Airaad
          </Text>
          <Text className="text-sm text-black font-normal">Welcome Back</Text>
        </View>
        <View>
          <Link href="/add">
            <Ionicons name="add-circle" size={36} color="#00000" />
          </Link>
        </View>
      </View>

      <View className="w-[341px] h-40 mx-auto bg-[#37474f] rounded-3xl my-5">
        <View className="py-6">
          <Text className="text-xl text-gray-400 font-medium px-6">
            Available Balance
          </Text>
          <Text className="text-3xl text-white font-semibold px-6 mt-3">{`$${
            sumOfData?.netBalance ?? 0
          }`}</Text>
          <Pressable onPress={() => router.push("/analysis")}>
            <Text className="text-white text-base px-6 mt-5">See details</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-row justify-between w-[341px] mx-auto bg-[#37474f] p-6 rounded-3xl">
        <View className="flex">
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="account-balance" size={20} color="#9ca3af" />
            <Text className="text-lg text-gray-400 tracking-widest font-medium">
              Total Income
            </Text>
          </View>
          <Text className="text-2xl font-semibold mx-auto mt-1 text-white">{`$${
            sumOfData?.totalIncome ?? 0
          }`}</Text>
        </View>
        <View className="w-[1px] h-16 bg-white" />
        <View>
          <View className="flex-row items-center gap-1">
            <MaterialIcons
              name="account-balance-wallet"
              size={20}
              color="#9ca3af"
            />
            <Text className="text-lg text-gray-400 tracking-widest font-medium">
              Total Expense
            </Text>
          </View>
          <Text className="text-2xl font-semibold mx-auto mt-1 text-white">{`$${
            sumOfData?.totalExpense ?? 0
          }`}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
