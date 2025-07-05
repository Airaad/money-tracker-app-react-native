import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { fontFamily } from "../dimensions/fontFamily";

interface ExpenseProps {
  isExpense: boolean;
  updateExpense: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnalyticsHeader = ({ isExpense, updateExpense }: ExpenseProps) => {
  const router = useRouter();
  return (
    <View>
      <View className="flex-row justify-around items-center mt-2">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text
          style={{ fontFamily: fontFamily.semiBold }}
          className="text-2xl text-white"
        >
          {isExpense ? "Expense Analytics" : "Income Analytics"}
        </Text>
        <View>
          {/* <Ionicons name="notifications-circle" size={30} color="white" /> */}
        </View>
      </View>
      <View className="flex-row justify-center mt-10">
        <Pressable
          onPress={() => updateExpense(true)}
          className={`${
            isExpense ? "bg-[#37474f]" : "bg-white"
          } px-10 py-2 rounded-l-full`}
        >
          <View className="flex-row gap-2 items-center">
            <FontAwesome name="shopping-cart" size={18} color="#ffc727" />
            <Text
              style={{ fontFamily: fontFamily.medium }}
              className={`text-[#ffc727] text-xl`}
            >
              Expense
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => updateExpense(false)}
          className={`${
            !isExpense ? "bg-[#37474f]" : "bg-white"
          } px-10 py-2 rounded-r-full`}
        >
          <View className="flex-row gap-2 items-center">
            <FontAwesome name="dollar" size={18} color="#ffc727" />
            <Text
              style={{ fontFamily: fontFamily.medium }}
              className={`text-[#ffc727] text-xl`}
            >
              Income
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AnalyticsHeader;
