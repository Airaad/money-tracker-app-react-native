import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";
import { fontFamily } from "../dimensions/fontFamily";

interface ItemComponentProps {
  icon: string;
  name: string;
  color: string;
  bgColor: string;
  category: string;
  description: string;
  amount: number;
}
const ItemComponent = ({
  category,
  icon,
  color,
  bgColor,
  name,
  amount,
  description,
}: ItemComponentProps) => {
  const { userCurrencyPreference } = useBudget();
  return (
    <View className="flex-row justify-between items-center my-2">
      <View className="flex-row gap-4 items-center ">
        <View
          className="w-14 h-14 justify-center rounded-full items-center"
          style={{ backgroundColor: bgColor }}
        >
          <FontAwesome5 name={icon} size={25} color={color} />
        </View>
        <View>
          <Text
            style={{ fontFamily: fontFamily.semiBold }}
            className="text-xl text-[#37474f] tracking-wider dark:text-white"
          >
            {name}
          </Text>
          <Text
            style={{ fontFamily: fontFamily.semiBold }}
            className="text-gray-400 dark:text-gray-300"
          >
            {description}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{ fontFamily: fontFamily.semiBold }}
          className={`text-xl ${
            category === "expense" ? "text-red-500" : "text-green-500"
          }`}
        >
          {`${
            category === "expense"
              ? `-${userCurrencyPreference}` + amount
              : `+${userCurrencyPreference}` + amount
          }`}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(ItemComponent);
