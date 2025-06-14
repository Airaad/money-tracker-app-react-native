import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Text, View } from "react-native";

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
          <Text className="text-xl text-[#37474f] font-semibold tracking-wider">
            {name}
          </Text>
          <Text className="font-semibold text-gray-400">{description}</Text>
        </View>
      </View>
      <View>
        <Text
          className={`text-xl ${
            category === "expense" ? "text-red-500" : "text-green-500"
          } font-semibold tracking-wider`}
        >
          {`${category === "expense" ? "-$" + amount : "+$" + amount}`}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(ItemComponent);
