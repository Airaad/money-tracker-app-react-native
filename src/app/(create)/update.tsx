import UpdateExpenseForm from "@/src/components/UpdateExpenseForm";
import UpdateExpenseHeader from "@/src/components/UpdateExpenseHeader";
import { useBudget } from "@/src/context/BudgetContext";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const Page = () => {
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [itemToUpdate, setItemToUpdate] = useState<any>(null);
  const params = useLocalSearchParams();
  const itemId = Number(params.id);

  const { getData } = useBudget();

  useEffect(() => {
    const getItem = async () => {
      const result = await getData(itemId);
      setItemToUpdate(result);
    };
    getItem();
  }, [itemId]);

  // console.log("This is fetched",itemToUpdate);

  return (
    <View className="flex-1 pt-20 bg-[#ffc727]">
      {itemToUpdate ? (
        <>
          <UpdateExpenseHeader isExpense={itemToUpdate.category.type} />
          <UpdateExpenseForm
            expenseId={itemToUpdate.id}
            categoryId={itemToUpdate.category.id}
            title={itemToUpdate.category.name}
            type={itemToUpdate.category.type}
            icon={itemToUpdate.category.icon}
            amount={itemToUpdate.amount}
            description={itemToUpdate.description}
            createdDate={itemToUpdate.createdDate}
          />
        </>
      ) : null}
    </View>
  );
};

export default Page;
