import AddExpenseForm from "@/src/components/AddExpenseForm";
import AddExpenseHeader from "@/src/components/AddExpenseHeader";
import React, { useState } from "react";
import { View } from "react-native";

const Page = () => {
  const [isExpense, setIsExpense] = useState<boolean>(true);
  return (
    <View className="flex-1 pt-16 bg-[#ffc727]">
      <AddExpenseHeader isExpense={isExpense} updateExpense={setIsExpense} />
      <AddExpenseForm isExpense={isExpense} updateExpense={setIsExpense} />
    </View>
  );
};

export default Page;
