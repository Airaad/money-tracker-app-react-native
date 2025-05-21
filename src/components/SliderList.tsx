import dailyExpenses from "@/src/data/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";
const SliderList = () => {
  const {items} = useBudget()
  console.log(items);
  
  return (
    <View className="bg-white flex-1 mt-12 rounded-t-[1.8rem]">
      <View className="flex-1 mb-[75px]">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dailyExpenses}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View className="flex-row p-6 my-8 mx-5 rounded-full justify-around bg-gray-200">
              <Text className="font-medium text-xl">Daily</Text>
              <Text className="font-medium text-xl">Weekly</Text>
              <Text className="font-medium text-xl">Monthly</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View key={item.id} className="px-4 my-3">
              <View className="mb-4 px-1">
                <Text className="text-gray-400 font-semibold text-lg w-[150px]">
                  {item.createdDate}
                </Text>
                <View className="h-[1px] bg-gray-400 w-full" />
              </View>
              {item.item.map((item) => (
                <View
                  key={item.id}
                  className="flex-row justify-between items-center my-2"
                >
                  <View className="flex-row gap-4 items-center ">
                    <View className="w-14 h-14 justify-center rounded-full items-center bg-black">
                      <FontAwesome5
                        name={item.icon}
                        size={25}
                        color="#6DB6FE"
                      />
                    </View>
                    <View>
                      <Text className="text-xl font-semibold tracking-wider">
                        {item.category}
                      </Text>
                      <Text className="font-semibold text-gray-500">
                        {item.description}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="text-xl text-[#0068FF] font-semibold tracking-wider">
                      {item.amount}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SliderList;
