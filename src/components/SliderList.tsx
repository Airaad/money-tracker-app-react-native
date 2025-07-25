import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  addDays,
  addMonths,
  format,
  parseISO,
  subDays,
  subMonths,
} from "date-fns";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { ItemType, useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";
import { fontFamily } from "../dimensions/fontFamily";
import { useToast } from "../hooks/useToast";
import CustomBottomSheet from "./CustomBottomSheet";
import ItemComponent from "./ItemComponent";

const SliderList = () => {
  const [bottomSheetItems, setBottomSheetItems] = useState<any>(null);
  const { showToast } = useToast();
  const {
    items,
    setTargetDate,
    targetDate,
    storeUserPreferenceData,
    userCurrencyPreference,
    userCarryOverPreference,
    userPreferenceType,
    loading,
  } = useBudget();

  const { themeMode } = useTheme();

  const router = useRouter();

  const handlePress = async (value: "daily" | "weekly" | "monthly") => {
    try {
      await storeUserPreferenceData(
        value,
        userCarryOverPreference,
        userCurrencyPreference
      );
    } catch (err) {
      showToast({
        type: "error",
        text1: "Failed to update preferences",
        text2: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
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

  const translateY = useRef(new Animated.Value(0)).current;
  const scrollOffset = useRef(0);
  const scrollDirection = useRef<"up" | "down" | null>(null);

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const delta = currentOffset - scrollOffset.current;

    // Ignore small scrolls (jitter)
    if (Math.abs(delta) < 9) {
      return;
    }

    const newDirection = delta > 0 ? "down" : "up";

    if (scrollDirection.current !== newDirection) {
      scrollDirection.current = newDirection;

      Animated.timing(translateY, {
        toValue: newDirection === "down" ? 100 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    scrollOffset.current = currentOffset;
  };

  return (
    <View className="bg-[#F9FAFB] flex-1 mt-5 rounded-t-[1.8rem] dark:bg-black">
      <View className="flex-1 mb-[70px]">
        <FlatList
          onScroll={handleScroll}
          scrollEventThrottle={16}
          initialNumToRender={7}
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
              <Text
                style={{ fontFamily: fontFamily.regular }}
                className="text-xl text-gray-500 mx-auto  mt-20 dark:text-gray-200"
              >
                Start Tracking Your Money
              </Text>
            )
          }
          ListHeaderComponent={
            <>
              <View className="flex-row bg-gray-200 p-4 mt-8 mx-8 rounded-full justify-around dark:bg-[#37474f]">
                <Pressable onPress={() => handlePress("daily")}>
                  <Text
                    style={{ fontFamily: fontFamily.medium }}
                    className={`${
                      userPreferenceType === "daily"
                        ? "text-[#ffc727]"
                        : "text-[#37474f] dark:text-white"
                    } text-xl`}
                  >
                    Daily
                  </Text>
                </Pressable>
                <Pressable onPress={() => handlePress("monthly")}>
                  <Text
                    style={{ fontFamily: fontFamily.medium }}
                    className={`${
                      userPreferenceType === "monthly"
                        ? "text-[#ffc727]"
                        : "text-[#37474f] dark:text-white"
                    } text-xl`}
                  >
                    Monthly
                  </Text>
                </Pressable>
                <Pressable onPress={() => handlePress("weekly")}>
                  <Text
                    style={{ fontFamily: fontFamily.medium }}
                    className={`${
                      userPreferenceType === "weekly"
                        ? "text-[#ffc727]"
                        : "text-[#37474f] dark:text-white"
                    } text-xl`}
                  >
                    Weekly
                  </Text>
                </Pressable>
              </View>
              <View className="flex-row items-center justify-around w-full mx-auto my-5 p-4 rounded-full">
                <Pressable onPress={handlePrev}>
                  <AntDesign
                    name="caretleft"
                    size={24}
                    color={themeMode === "light" ? "#37474f" : "white"}
                  />
                </Pressable>
                <Text
                  style={{ fontFamily: fontFamily.medium }}
                  className="text-lg text-[#37474f] dark:text-white"
                >
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
                  <AntDesign
                    name="caretright"
                    size={24}
                    color={themeMode === "light" ? "#37474f" : "white"}
                  />
                </Pressable>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View className="px-4 my-3">
              <View className="mb-4 px-1">
                <Text
                  style={{ fontFamily: fontFamily.semiBold }}
                  className="text-gray-500 text-lg w-[150px] dark:text-gray-300"
                >
                  {format(parseISO(item.date), "MMMM dd, yyyy")}
                </Text>
                <View className="h-[1px] bg-gray-400 w-full dark:bg-gray-300" />
              </View>
              {item.data.map((item) => (
                <Pressable key={item.id} onPress={() => handleOpen(item)}>
                  <ItemComponent
                    category={item.category.type}
                    icon={item.category.icon}
                    color={item.category.color}
                    bgColor={item.category.bgColor}
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
      <Animated.View
        style={{
          position: "absolute",
          bottom: 85,
          right: 15,
          transform: [{ translateY }],
        }}
      >
        <Pressable
          className="bg-black h-14 w-14 justify-center items-center border-2 border-black rounded-full dark:bg-white dark:border-white"
          onPress={() => router.push("/add")}
        >
          <FontAwesome6 name="plus" size={30} color="#ffc727" />
        </Pressable>
      </Animated.View>

      <CustomBottomSheet
        ref={bottomSheetRef}
        id={bottomSheetItems?.id}
        category={bottomSheetItems?.category?.type}
        title={bottomSheetItems?.category?.name}
        icon={bottomSheetItems?.category?.icon}
        color={bottomSheetItems?.category?.color}
        bgColor={bottomSheetItems?.category?.bgColor}
        description={bottomSheetItems?.description}
        amount={bottomSheetItems?.amount}
        date={bottomSheetItems?.createdDate}
      />
    </View>
  );
};

export default React.memo(SliderList);
