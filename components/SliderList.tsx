import dailyExpenses from "@/data/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Text, View } from "react-native";

const SliderList = () => {
  return (
    <View className="bg-white flex-1 mt-32 rounded-t-[2.5rem]">
      <View className="flex-row p-6 my-10 mx-5 rounded-full justify-around bg-gray-200">
        <Text className="font-medium text-xl">Daily</Text>
        <Text className="font-medium text-xl">Weekly</Text>
        <Text className="font-medium text-xl">Monthly</Text>
      </View>

      <View className="flex-1 pb-40">
        {dailyExpenses.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center p-3 mx-5"
          >
            <View className="flex-row gap-4 items-center ">
              <View className="w-12 h-12 justify-center rounded-full items-center bg-black">
                <FontAwesome5 name={item.icon} size={23} color="#6DB6FE" />
              </View>
              <Text className="text-xl font-semibold tracking-wider">
                {item.name}
              </Text>
            </View>
            <View>
              <Text className="text-xl text-[#0068FF] font-semibold tracking-wider">
                {item.amount}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SliderList;
