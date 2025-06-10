import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const analysisData = [
  {
    name: "Housing",
    amount: 1200,
    color: "#5D9CEC", // Soft blue
    icon: "home",
    bgColor: "#E7F0FD",
  },
  {
    name: "Transport",
    amount: 350,
    color: "#FC5C65", // Red
    icon: "car",
    bgColor: "#FFEEEF",
  },
  {
    name: "Food",
    amount: 600,
    color: "#FD9644", // Orange
    icon: "utensils",
    bgColor: "#FFF3E9",
  },
  {
    name: "Utilities",
    amount: 250,
    color: "#26DE81", // Green
    icon: "lightbulb",
    bgColor: "#E8F9F0",
  },
  {
    name: "Entertainment",
    amount: 200,
    color: "#778CA3", // Blue-gray
    icon: "film",
    bgColor: "#F1F4F7",
  },
  {
    name: "Healthcare",
    amount: 150,
    color: "#A55EEA", // Purple
    icon: "heartbeat",
    bgColor: "#F4EEFF",
  },
];

const AnalyticsSliderList = () => {
  const totalAmount = analysisData.reduce((sum, item) => sum + item.amount, 0);

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <FontAwesome5 name={item.icon} size={20} color={item.color} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.percentageText}>
          {Math.round((item.amount / totalAmount) * 100)}% of total
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>${item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Monthly Expenses</Text>
        <Text style={styles.headerAmount}>Total: ${totalAmount}</Text>
      </View>

      <FlatList
        data={analysisData}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F2937",
  },
  headerAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3B82F6",
  },
  listContent: {
    paddingBottom: 60, //bottom padding for the flatlist
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 3,
  },
  percentageText: {
    fontSize: 13,
    color: "#6B7280",
  },
  amountContainer: {
    minWidth: 80,
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  separator: {
    height: 12,
  },
});

export default AnalyticsSliderList;
