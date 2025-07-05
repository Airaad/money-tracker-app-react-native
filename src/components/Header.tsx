import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";
import { fontFamily } from "../dimensions/fontFamily";
import { useToast } from "../hooks/useToast";

const Header = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    items,
    getTotal,
    userPreferenceType,
    userCarryOverPreference,
    userCurrencyPreference,
    targetDate,
  } = useBudget();
  const { themeMode } = useTheme();
  const [sumOfData, setSumOfData] = useState<any>(null);

  useEffect(() => {
    const totalData = async () => {
      try {
        const result = await getTotal(
          userPreferenceType,
          targetDate,
          userCarryOverPreference
        );
        setSumOfData(result);
      } catch (err) {
        showToast({
          type: "error",
          text1: "Failed to get total",
          text2: err instanceof Error ? err.message : "Something went wrong.",
        });
      }
    };
    totalData();
  }, [items, userCarryOverPreference]);

  return (
    <View className="w-full mx-auto">
      <View className="flex-row items-center px-9 mb-2 mt-1">
        <View className="flex-row items-center gap-2">
          <Image
            source={require("../../assets/images/icon.png")}
            className="w-10 h-10"
            resizeMode="contain"
          />
          <Text
            className="text-2xl text-[#37474f]"
            style={{ fontFamily: fontFamily.bold }}
          >
            Expensy
          </Text>
          {/* <Text className="text-sm text-white font-normal">Track your money</Text> */}
        </View>
        {/* <View>
          <Link href="/add">
            <Ionicons name="add-circle" size={36} color="#000000" />
          </Link>
        </View> */}
      </View>

      <View className="w-96 h-40 mx-auto bg-[#F9FAFB] rounded-3xl my-5 dark:bg-[#37474f]">
        <View className="py-6">
          <Text
            className="text-xl text-[#37474f] px-6 dark:text-gray-400"
            style={{ fontFamily: fontFamily.medium }}
          >
            Available Balance
          </Text>
          <Text
            style={{ fontFamily: fontFamily.semiBold }}
            className="text-3xl text-black px-6 mt-3 dark:text-white"
          >{`${userCurrencyPreference}${sumOfData?.netBalance ?? 0}`}</Text>
          <Pressable onPress={() => router.push("/analysis")}>
            <View className="flex-row items-center px-6 mt-5 gap-2">
              <Text
                style={{ fontFamily: fontFamily.medium }}
                className="text-black text-base dark:text-white"
              >
                See details
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={themeMode === "dark" ? "white" : "black"}
              />
            </View>
          </Pressable>
        </View>
      </View>

      <View className="flex-row justify-between w-96 mx-auto bg-white dark:bg-[#37474f] p-6 rounded-3xl">
        <View className="flex">
          <View className="flex-row items-center gap-1">
            <MaterialIcons
              name="account-balance"
              size={20}
              color={themeMode === "dark" ? "#9ca3af" : "#37474f"}
            />
            <Text
              style={{ fontFamily: fontFamily.medium }}
              className="text-lg text-[#37474f] dark:text-gray-400"
            >
              Total Income
            </Text>
          </View>
          <Text
            style={{ fontFamily: fontFamily.semiBold }}
            className="text-2xl mx-auto mt-1 text-black dark:text-white"
          >{`${userCurrencyPreference}${sumOfData?.totalIncome ?? 0}`}</Text>
        </View>
        <View className="w-[1px] h-16 bg-white" />
        <View>
          <View className="flex-row items-center gap-1">
            <MaterialIcons
              name="account-balance-wallet"
              size={20}
              color={themeMode === "dark" ? "#9ca3af" : "#37474f"}
            />
            <Text
              style={{ fontFamily: fontFamily.medium }}
              className="text-lg text-[#37474f] dark:text-gray-400"
            >
              Total Expense
            </Text>
          </View>
          <Text
            style={{ fontFamily: fontFamily.semiBold }}
            className="text-2xl font-semibold mx-auto mt-1 text-black dark:text-white"
          >{`${userCurrencyPreference}${sumOfData?.totalExpense ?? 0}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Header);
