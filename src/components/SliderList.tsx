import FontAwesome from "@expo/vector-icons/FontAwesome";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  addDays,
  addMonths,
  format,
  parseISO,
  subDays,
  subMonths,
} from "date-fns";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { ItemType, useBudget } from "../context/BudgetContext";
import CustomBottomSheet from "./CustomBottomSheet";
import ItemComponent from "./ItemComponent";

const SliderList = () => {
  const [bottomSheetItems, setBottomSheetItems] = useState<any>(null);

  const {
    items,
    setTargetDate,
    targetDate,
    storeUserPreferenceData,
    userPreferenceType,
    loading,
    error,
  } = useBudget();

  const handlePress = async (value: "daily" | "weekly" | "monthly") => {
    await storeUserPreferenceData(value);
  };

  // Move to next day
  const handleNextDay = () => {
    setTargetDate((prev) => addDays(prev, 1));
  };

  // Move to previous day
  const handlePrevDay = () => {
    setTargetDate((prev) => subDays(prev, 1));
  };

  // Move to next month
  const handleNextMonth = () => {
    setTargetDate((prev) => addMonths(prev, 1));
  };

  // Move to previous month
  const handlePrevMonth = () => {
    setTargetDate((prev) => subMonths(prev, 1));
  };

  // Move to next week
  const handleNextWeek = () => {
    setTargetDate((prev) => addDays(prev, 7));
  };

  // Move to previous week
  const handlePrevWeek = () => {
    setTargetDate((prev) => subDays(prev, 7));
  };

  const handlePrev = useCallback(() => {
    if (userPreferenceType === "daily") handlePrevDay();
    else if (userPreferenceType === "monthly") handlePrevMonth();
    else handlePrevWeek();
  }, [userPreferenceType]);

  const handleNext = useCallback(() => {
    if (userPreferenceType === "daily") handleNextDay();
    else if (userPreferenceType === "monthly") handleNextMonth();
    else handleNextWeek();
  }, [userPreferenceType]);

  // Function for arranging database data
  const groupedArray = useMemo(() => {
    // Groups the item by their creation date
    const groupedByDate = items.reduce((acc, item) => {
      const date = item.createdDate.split("T")[0];
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
  const handleOpen = (item: ItemType) => {
    setBottomSheetItems(item);
    bottomSheetRef.current?.expand();
  };

  useFocusEffect(
    useCallback(() => {
      bottomSheetRef.current?.close(); // Close the sheet when screen is focused
    }, [])
  );

  return (
    <View className="bg-white flex-1 mt-5 rounded-t-[1.8rem]">
      <View className="flex-1 mb-[75px]">
        <FlatList
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          data={groupedArray}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                color="#3b82f6"
                className="mt-20"
              />
            ) : (
              <Text className="text-xl text-gray-500 relative left-[95px] mt-20">
                Start Tracking Your Money
              </Text>
            )
          }
          ListHeaderComponent={
            <>
              <View className="flex-row p-4 mt-8 mx-8 rounded-full justify-around bg-gray-200">
                <Pressable onPress={() => handlePress("daily")}>
                  <Text
                    className={`${
                      userPreferenceType === "daily"
                        ? "text-[#ffc727]"
                        : "text-black"
                    } font-medium text-xl`}
                  >
                    Daily
                  </Text>
                </Pressable>
                <Pressable onPress={() => handlePress("monthly")}>
                  <Text
                    className={`${
                      userPreferenceType === "monthly"
                        ? "text-[#ffc727]"
                        : "text-black"
                    } font-medium text-xl`}
                  >
                    Monthly
                  </Text>
                </Pressable>
                <Pressable onPress={() => handlePress("weekly")}>
                  <Text
                    className={`${
                      userPreferenceType === "weekly"
                        ? "text-[#ffc727]"
                        : "text-black"
                    } font-medium text-xl`}
                  >
                    Weekly
                  </Text>
                </Pressable>
              </View>
              <View className="bg-gray-500 flex-row items-center justify-around w-[50%] mx-auto my-5 p-4 rounded-full">
                <Pressable onPress={handlePrev}>
                  <FontAwesome name="angle-left" size={24} color="white" />
                </Pressable>
                <Text className="text-lg text-white">
                  {userPreferenceType === "monthly"
                    ? format(targetDate, "MMMM yyyy")
                    : userPreferenceType === "daily"
                    ? format(targetDate, "d MMMM yyyy")
                    : `${format(subDays(targetDate, 6), "d MMMM")} - ${format(
                        targetDate,
                        "d MMMM yyyy"
                      )}`}
                </Text>
                <Pressable onPress={handleNext}>
                  <FontAwesome name="angle-right" size={24} color="white" />
                </Pressable>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View className="px-4 my-3">
              <View className="mb-4 px-1">
                <Text className="text-gray-400 font-semibold text-lg w-[150px]">
                  {format(parseISO(item.date), "MMMM dd, yyyy")}
                </Text>
                <View className="h-[1px] bg-gray-400 w-full" />
              </View>
              {item.data.map((item) => (
                <Pressable key={item.id} onPress={() => handleOpen(item)}>
                  <ItemComponent
                    category={item.category.type}
                    icon={item.category.icon}
                    name={item.category.name}
                    description={item.description}
                    amount={item.amount}
                  />
                </Pressable>
              ))}
            </View>
          )}
        />
      </View>

      <CustomBottomSheet
        ref={bottomSheetRef}
        id={bottomSheetItems?.id}
        category={bottomSheetItems?.category?.type}
        title={bottomSheetItems?.category?.name}
        icon={bottomSheetItems?.category?.icon}
        description={bottomSheetItems?.description}
        amount={bottomSheetItems?.amount}
        date={bottomSheetItems?.createdDate}
      />
    </View>
  );
};

export default SliderList;
