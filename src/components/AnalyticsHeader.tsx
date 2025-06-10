import React from "react";
import { Pressable, Text, View } from "react-native";

interface ExpenseProps {
  isExpense: boolean;
  updateExpense: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnalyticsHeader = ({ isExpense, updateExpense }: ExpenseProps) => {
  return (
    <View className="flex-row items-center justify-center mt-10  w-full">
      <Pressable
        onPress={() => updateExpense(true)}
        className={`${
          isExpense ? "bg-[#37474f]" : "bg-white"
        } px-12 py-2 rounded-l-full`}
      >
        <Text
          className={`${
            isExpense ? "text-[#ffc727]" : "text-[#ffc727]"
          } text-xl font-medium tracking-widest`}
        >
          Expense
        </Text>
      </Pressable>

      <Pressable
        onPress={() => updateExpense(false)}
        className={`${
          !isExpense ? "bg-[#37474f]" : "bg-white"
        } px-12 py-2 rounded-r-full`}
      >
        <Text
          className={`${
            !isExpense ? "text-[#ffc727]" : "text-[#ffc727]"
          } text-xl font-medium tracking-widest`}
        >
          Income
        </Text>
      </Pressable>
    </View>
  );
};

export default AnalyticsHeader;
