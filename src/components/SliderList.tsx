import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";
const SliderList = () => {
  const { items } = useBudget();
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

  return (
    <View className="bg-white flex-1 mt-12 rounded-t-[1.8rem]">
      <View className="flex-1 mb-[75px]">
        {groupedArray.length === 0 && (
          <Text className="text-xl text-gray-500 absolute top-[300px] left-32">
            Start Tracking Your Money
          </Text>
        )}
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
                <View
                  key={item.id}
                  className="flex-row justify-between items-center my-2"
                >
                  <View className="flex-row gap-4 items-center ">
                    <View className="w-14 h-14 justify-center rounded-full items-center bg-black">
                      <FontAwesome5
                        name={item.category.icon}
                        size={25}
                        color="#6DB6FE"
                      />
                    </View>
                    <View>
                      <Text className="text-xl font-semibold tracking-wider">
                        {item.category.name}
                      </Text>
                      <Text className="font-semibold text-gray-500">
                        {item.description}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className={`text-xl ${item.category.type === "expense" ? "text-red-400" : "text-green-400"} font-semibold tracking-wider`}>
                      {`${item.category.type === "expense" ? "-$"+item.amount : "+$"+item.amount}`}
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
