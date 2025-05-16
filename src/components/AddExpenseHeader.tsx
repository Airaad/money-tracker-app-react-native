import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface ExpenseProps {
  isExpense: boolean;
  updateExpense: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddExpenseHeader = ({ isExpense, updateExpense }: ExpenseProps) => {
  const router = useRouter();
  return (
    <View>
      <View className="px-8">
        <View className="flex-row justify-between items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <Text className="text-2xl text-white tracking-wider font-semibold">
            {isExpense ? "Add New Expense" : "Add New Income"}
          </Text>
          <View>
            <Ionicons name="notifications-circle" size={30} color="white" />
          </View>
        </View>

        <View className="flex-row items-center mt-14 mx-auto w-[90%]">
          <Pressable
            onPress={() => updateExpense((prev) => !prev)}
            className={`${
              isExpense ? "bg-blue-500" : "bg-white"
            } px-12 py-1 rounded-l-full`}
          >
            <Text
              className={`${
                isExpense ? "text-white" : "text-blue-500"
              } text-xl font-medium tracking-widest`}
            >
              Expense
            </Text>
          </Pressable>

          <Pressable
            onPress={() => updateExpense((prev) => !prev)}
            className={`${
              !isExpense ? "bg-blue-500" : "bg-white"
            } px-12 py-1 rounded-r-full`}
          >
            <Text
              className={`${
                !isExpense ? "text-white" : "text-blue-500"
              } text-xl font-medium tracking-widest`}
            >
              Income
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddExpenseHeader;
