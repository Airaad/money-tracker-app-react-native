import React from "react";
import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "Housing",
    amount: 1200,
    color: "#5D9CEC", 
    icon: "home",
    legendFontColor: "#5D9CEC",
    legendFontSize: 12,
  },
  {
    name: "Transport",
    amount: 350,
    color: "#FC5C65", 
    icon: "car",
    legendFontColor: "#FC5C65",
    legendFontSize: 12,
  },
  {
    name: "Food",
    amount: 600,
    color: "#FD9644", 
    icon: "utensils",
    legendFontColor: "#FD9644",
    legendFontSize: 12,
  },
  {
    name: "Utilities",
    amount: 250,
    color: "#26DE81", 
    icon: "lightbulb",
    legendFontColor: "#26DE81",
    legendFontSize: 12,
  },
  {
    name: "Entertainment",
    amount: 200,
    color: "#778CA3", 
    icon: "film",
    legendFontColor: "#778CA3",
    legendFontSize: 12,
  },
  {
    name: "Healthcare",
    amount: 150,
    color: "#A55EEA", 
    icon: "heartbeat",
    legendFontColor: "#A55EEA",
    legendFontSize: 12,
  },
];

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

const AnalyticsGraph = () => {
  return (
    <View className="bg-[#F9FAFB] mt-2 p-2 justify-center items-center rounded-t-[1.8rem]">
      <PieChart
        data={data}
        width={screenWidth - 20}
        height={240}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[0, 0]}
        hasLegend={true}
        avoidFalseZero={true}
        style={{ marginVertical: 8 }}
      />
    </View>
  );
};

export default AnalyticsGraph;
