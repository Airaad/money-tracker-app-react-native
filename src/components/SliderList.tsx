import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";
import CustomBottomSheet from "./CustomBottomSheet";
import ItemComponent from "./ItemComponent";

const SliderList = () => {
  const [bottomSheetItems, setBottomSheetItems] = useState<any>(null);
  const { items, loading, error } = useBudget();
  const groupedArray = useMemo(() => {
    // Groups the item by their creation date
    const groupedByDate = items.reduce((acc, item) => {
      const date = item.createdDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].unshift(item); //adds item at the start of array
      return acc;
    }, {} as Record<string, (typeof items)[number][]>);
    // Converts the object into an array
    return Object.entries(groupedByDate).map(([date, data], index) => ({
      id: index.toString(),
      date,
      data,
    }));
  }, [items]);
  // console.log(JSON.stringify(groupedArray, null, 2));

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpen = useCallback((item: any) => {
    setBottomSheetItems(item);
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <View className="bg-white flex-1 mt-12 rounded-t-[1.8rem]">
      <View className="flex-1 mb-[75px]">
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#3b82f6"
            className="absolute top-[250px] left-48"
          />
        ) : groupedArray.length === 0 ? (
          <Text className="text-xl text-gray-500 absolute top-[260px] left-[95px]">
            Start Tracking Your Money
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={groupedArray}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View className="flex-row p-6 my-8 mx-5 rounded-full justify-around bg-gray-200">
                <Text className="font-medium text-xl">Daily</Text>
                <Text className="font-medium text-xl">Weekly</Text>
                <Text className="font-medium text-xl">Monthly</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View className="px-4 my-3">
                <View className="mb-4 px-1">
                  <Text className="text-gray-400 font-semibold text-lg w-[150px]">
                    {item.date}
                  </Text>
                  <View className="h-[1px] bg-gray-400 w-full" />
                </View>
                {item.data.map((item) => (
                  <ItemComponent
                    key={item.id}
                    expenseId={item.id}
                    category={item.category.type}
                    icon={item.category.icon}
                    name={item.category.name}
                    description={item.description}
                    amount={item.amount}
                    date={item.createdDate}
                    handleClick={handleOpen}
                  />
                ))}
              </View>
            )}
          />
        )}
      </View>
      <CustomBottomSheet
        ref={bottomSheetRef}
        id={bottomSheetItems?.expenseId}
        category={bottomSheetItems?.category}
        title={bottomSheetItems?.name}
        icon={bottomSheetItems?.icon}
        description={bottomSheetItems?.description}
        amount={bottomSheetItems?.amount}
        date={bottomSheetItems?.date}
      />
    </View>
  );
};

export default SliderList;
