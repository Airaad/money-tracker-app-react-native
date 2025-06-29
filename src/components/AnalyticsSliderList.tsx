import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { format, subDays } from "date-fns";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";
import { fontFamily } from "../dimensions/fontFamily";
import AnalyticsGraph from "./AnalyticsGraph";

type props = {
  data: AnalyticsDataItem[];
  isExpense: boolean;
};

const AnalyticsSliderList = ({ data, isExpense }: props) => {
  const { targetDate, userPreferenceType, userCurrencyPreference } =
    useBudget();

  const { themeMode } = useTheme();

  const totalAmount = useMemo(
    () => data.reduce((sum, item) => sum + item.amount, 0),
    [data]
  );

  const renderItem = ({ item }: { item: AnalyticsDataItem }) => (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: themeMode === "dark" ? "#37474f" : "white",
          shadowColor: themeMode === "dark" ? "transparent" : "#000",
        },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <FontAwesome5 name={item.icon} size={20} color={item.color} />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.categoryName,
            { color: themeMode === "dark" ? "#e5e7eb" : "#37474f" },
            { fontFamily: fontFamily.semiBold },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.percentageText,
            { color: themeMode === "dark" ? "#9ca3af" : "#6B7280" },
            { fontFamily: fontFamily.medium },
          ]}
        >
          {Math.round((item.amount / totalAmount) * 100)}% of total
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amountText,
            { color: isExpense ? "#ef4444" : "#22c55e" },
            { fontFamily: fontFamily.semiBold },
          ]}
        >
          {userCurrencyPreference}
          {item.amount}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeMode === "dark" ? "black" : "#F9FAFB" },
      ]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: themeMode === "dark" ? "#d1d5db" : "#9ca3af" },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: themeMode === "dark" ? "white" : "#37474f" },
            { fontFamily: fontFamily.semiBold },
          ]}
        >
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
            { fontFamily: fontFamily.semiBold },
          ]}
        >
          Total: {userCurrencyPreference}
          {totalAmount}
        </Text>
      </View>

      <FlatList
        initialNumToRender={7}
        maxToRenderPerBatch={5}
        windowSize={7}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <Text
              style={[
                styles.headerDate,
                { color: themeMode === "dark" ? "white" : "#37474f" },
                { fontFamily: fontFamily.medium },
              ]}
            >
              {userPreferenceType === "monthly"
                ? format(targetDate, "MMMM yyyy")
                : userPreferenceType === "daily"
                ? format(targetDate, "d MMMM yyyy")
                : `${format(subDays(targetDate, 6), "d MMMM")} - ${format(
                    targetDate,
                    "d MMMM yyyy"
                  )}`}
            </Text>
            <AnalyticsGraph data={data} />
          </View>
        }
        ListEmptyComponent={
          <Text
            style={{ fontFamily: fontFamily.light }}
            className="text-2xl text-gray-400 text-center dark:text-gray-200"
          >
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
  },
  headerTitle: {
    fontSize: 18,
  },
  headerAmount: {
    fontSize: 18,
  },
  headerDate: {
    fontSize: 17,
    marginHorizontal: "auto",
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 60, //bottom padding for the flatlist
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
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
    marginBottom: 3,
  },
  percentageText: {
    fontSize: 13,
  },
  amountContainer: {
    minWidth: 80,
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
  },
  separator: {
    height: 10,
  },
});

export default React.memo(AnalyticsSliderList);
