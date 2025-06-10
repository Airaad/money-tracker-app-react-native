import AnalyticsGraph from "@/src/components/AnalyticsGraph";
import AnalyticsHeader from "@/src/components/AnalyticsHeader";
import AnalyticsSliderList from "@/src/components/AnalyticsSliderList";
import React, { useState } from "react";
import { View } from "react-native";

const Page = () => {
  const [isExpense, setIsExpense] = useState(true);
  return (
    <View className="flex-1 pt-16 bg-[#ffc727]">
      <AnalyticsHeader isExpense={isExpense} updateExpense={setIsExpense} />
      <View className="flex-1 mt-20">
      <AnalyticsGraph/>
      <AnalyticsSliderList/>
      </View>
    </View>
  );
};

export default Page;
