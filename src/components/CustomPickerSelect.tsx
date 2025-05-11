import React from "react";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const CustomPickerSelect = () => {
  return (
    <View className="w-[78%] relative">
      <Text className="absolute top-2 left-3 font-semibold text-lg text-white z-10">
        Select Category
      </Text>
      <View className="w-[95%] h-[2px] bg-gray-500 absolute bottom-8 left-2 z-10" />
      <RNPickerSelect
        style={{
          inputIOS: {
            backgroundColor: "black",
            height: 105,
            borderRadius: 16,
            color: "white",
            fontSize: 18,
            lineHeight: 28,
            paddingTop: 28,
            paddingLeft: 12,
            marginBottom: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
          },
          inputAndroid: {
            backgroundColor: "black",
            height: 105,
            borderRadius: 16,
            color: "white",
            fontSize: 16,
            lineHeight: 28,
            paddingTop: 28,
            paddingLeft: 12,
            marginBottom: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
          },
          placeholder: {
            fontSize: 17,
            color: "gray",
          },
        }}
        useNativeAndroidPickerStyle={false}
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      />
    </View>
  );
};

export default CustomPickerSelect;
