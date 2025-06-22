import FontAwesome from "@expo/vector-icons/FontAwesome";
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
            <Ionicons name="arrow-back" size={26} color="#ffffff" />
          </Pressable>
          <Text className="text-2xl text-white tracking-wider font-semibold">
            {isExpense ? "Add New Expense" : "Add New Income"}
          </Text>
          <View>
            {/* <Ionicons name="notifications-circle" size={30} color="white" /> */}
          </View>
        </View>

        <View className="flex-row items-center mt-14 mx-auto">
          <Pressable
            onPress={() => updateExpense(true)}
            className={`${
              isExpense ? "bg-[#37474f]" : "bg-white"
            } px-12 py-2 rounded-l-full`}
          >
            <View className="flex-row gap-2 items-center">
              <FontAwesome name="shopping-cart" size={18} color="#ffc727" />
              <Text
                className={`text-[#ffc727] text-xl font-medium tracking-widest`}
              >
                Expense
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => updateExpense(false)}
            className={`${
              !isExpense ? "bg-[#37474f]" : "bg-white"
            } px-12 py-2 rounded-r-full`}
          >
            <View className="flex-row gap-2 items-center">
              <FontAwesome name="dollar" size={18} color="#ffc727" />
              <Text
                className={`text-[#ffc727] text-xl font-medium tracking-widest`}
              >
                Income
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddExpenseHeader;
