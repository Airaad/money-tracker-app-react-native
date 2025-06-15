import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";
import AnalyticsGraph from "./AnalyticsGraph";

type props = {
  data: AnalyticsDataItem[];
  isExpense: boolean;
};

const AnalyticsSliderList = ({ data, isExpense }: props) => {
  const { userPreferenceType } = useBudget();
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  const renderItem = ({ item }: { item: AnalyticsDataItem }) => (
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
        <Text
          style={[
            styles.amountText,
            { color: isExpense ? "#ef4444" : "#22c55e" },
          ]}
        >
          ${item.amount}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {userPreferenceType === "daily"
            ? "Daily"
            : userPreferenceType === "monthly"
            ? "Monthly"
            : "Weekly"}{" "}
          {isExpense ? "Expenses" : "Incomes"}
        </Text>
        <Text
          style={[
            styles.headerAmount,
            { color: isExpense ? "#ef4444" : "#22c55e" },
          ]}
        >
          Total: ${totalAmount}
        </Text>
      </View>

      <FlatList
        initialNumToRender={7}
        maxToRenderPerBatch={5}
        windowSize={7}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<AnalyticsGraph data={data} />}
        ListEmptyComponent={
          <Text className="text-2xl text-gray-400 text-center">
            No Records Present
          </Text>
        }
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
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#37474f",
  },
  headerAmount: {
    fontSize: 18,
    fontWeight: "500",
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
    color: "#37474f",
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
    color: "#37474f",
  },
  separator: {
    height: 10,
  },
});

export default AnalyticsSliderList;
