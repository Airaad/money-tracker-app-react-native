import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

interface ItemComponentProps {
  icon: string;
  name: string;
  category: string;
  description: string;
  amount: number;
  handleClick: (item: any) => void;
}
const ItemComponent = ({
  category,
  icon,
  name,
  amount,
  description,
  handleClick,
}: ItemComponentProps) => {
  const handlePress = useCallback(() => {
    handleClick({ name, icon, description, amount });
  }, [name, icon, description, amount]);

  return (
    <View className="flex-row justify-between items-center my-2">
      <Pressable onPress={handlePress} className="flex-row gap-4 items-center ">
        <View className="w-14 h-14 justify-center rounded-full items-center bg-black">
          <FontAwesome5 name={icon} size={25} color="#6DB6FE" />
        </View>
        <View>
          <Text className="text-xl font-semibold tracking-wider">{name}</Text>
          <Text className="font-semibold text-gray-500">{description}</Text>
        </View>
      </Pressable>
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
