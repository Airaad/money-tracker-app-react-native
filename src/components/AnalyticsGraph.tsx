import React from "react";
import { Dimensions, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type AnalyticsGraphProps = {
  data: AnalyticsDataItem[];
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  propsForLabels: {
    dx: 10, // adjust legend label positioning
  },
};

const AnalyticsGraph = ({ data }: AnalyticsGraphProps) => {
  return (
    <View className="bg-[#F9FAFB] px-2">
      <PieChart
        data={data}
        width={screenWidth - 20}
        height={250}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[50, 0]}
        hasLegend={false}
        avoidFalseZero={true}
      />
      <View className="flex flex-wrap flex-row justify-center mb-4">
        {data.map((item, index) => (
          <View key={index} className="flex-row items-center mx-2 my-1">
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: item.color,
                borderRadius: 6,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                color: item.legendFontColor,
                fontSize: item.legendFontSize,
              }}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AnalyticsGraph;
