import React, { useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";
import currencyOptions from "../data/currencyOptions";

const CurrencyPicker = () => {
  const [open, setOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState<string | null>(null);
  const [curencyItems, setCurrencyItems] = useState(currencyOptions);
  const {
    storeUserPreferenceData,
    userCurrencyPreference,
    userCarryOverPreference,
    userPreferenceType,
  } = useBudget();
  const { themeMode, themeName, toggleThemeMode } = useTheme();
  return (
    <>
      <View>
        <Text className="text-lg text-[#ffc727] mb-2">Change Currency</Text>
        <DropDownPicker
          style={{
            height: 50,
            backgroundColor: themeMode === "dark" ? "#d1d5db" : "#f5f5f5",
            borderRadius: 12,
            borderWidth: 0,
          }}
          theme={themeMode === "dark" ? "DARK" : "LIGHT"}
          modalTitleStyle={{
            color: "#ffc727",
            fontSize: 20,
            fontWeight: "bold",
          }}
          labelStyle={{ fontSize: 16, color: "black" }}
          placeholderStyle={{ color: "transparent" }}
          listMode="MODAL"
          modalTitle="Select your currency"
          modalContentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 20,
            backgroundColor: themeMode === "dark" ? "#37474f" : "white",
          }}
          modalProps={{ animationType: "slide" }}
          open={open}
          value={pickerValue ?? userCurrencyPreference}
          items={curencyItems}
          setOpen={setOpen}
          setValue={setPickerValue}
          setItems={setCurrencyItems}
          renderListItem={({ item }) => (
            <View className="p-4 border-b-gray-300 border-b-[1px] dark:border-b-gray-600">
              <Text
                onPress={() => {
                  if (item.value !== undefined) {
                    setPickerValue(item.value);
                    setOpen(false);
                    storeUserPreferenceData(
                      userPreferenceType,
                      userCarryOverPreference,
                      item.value
                    );
                  }
                }}
                className="text-black text-xl font-semibold py-2 dark:text-white"
              >
                {item.label}
              </Text>
            </View>
          )}
        />
      </View>
      <Text className="text-sm text-gray-600 mt-2 ml-2 dark:text-gray-300">
        Selected: <Text className="font-medium">{userCurrencyPreference}</Text>
      </Text>
    </>
  );
};

export default React.memo(CurrencyPicker);
