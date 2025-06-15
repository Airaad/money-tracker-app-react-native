import AnalyticsHeader from "@/src/components/AnalyticsHeader";
import AnalyticsSliderList from "@/src/components/AnalyticsSliderList";
import { useBudget } from "@/src/context/BudgetContext";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

const Page = () => {
  const [isExpense, setIsExpense] = useState(true);
  const { items, loading, error } = useBudget();

  const analyticsData = useMemo(() => {
    const groupedMap = new Map<string, ReturnType<any> & { amount: number }>();

    items
      .filter(
        (item) => item.category.type === (isExpense ? "expense" : "income")
      )
      .forEach((item) => {
        const name = item.category.name;
        if (groupedMap.has(name)) {
          const existing = groupedMap.get(name)!;
          existing.amount += item.amount;
        } else {
          groupedMap.set(name, {
            id: groupedMap.size,
            name,
            amount: item.amount,
            color: item.category.color,
            bgColor: item.category.bgColor,
            icon: item.category.icon,
            legendFontColor: item.category.color,
            legendFontSize: 14,
          });
        }
      });

    return Array.from(groupedMap.values());
  }, [items, isExpense]);

  return (
    <View className="flex-1 pt-16 bg-[#ffc727]">
      <AnalyticsHeader isExpense={isExpense} updateExpense={setIsExpense} />
      <View className="flex-1 mt-10">
        <AnalyticsSliderList data={analyticsData} isExpense={isExpense} />
      </View>
    </View>
  );
};

export default Page;
