import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";
import currencyOptions from "../data/currencyOptions";
import { fontFamily } from "../dimensions/fontFamily";

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
  const { themeMode } = useTheme();
  return (
    <>
      <View>
        <Text
          style={{ fontFamily: fontFamily.medium }}
          className="text-lg text-[#ffc727] mb-2"
        >
          Change Currency
        </Text>
        <DropDownPicker
          style={{
            height: 50,
            backgroundColor: themeMode === "dark" ? "#d1d5db" : "#f5f5f5",
            borderRadius: 12,
            borderWidth: 0,
          }}
          theme="DARK"
          modalTitleStyle={{
            color: "#ffc727",
            fontSize: 20,
            fontFamily: fontFamily.bold,
          }}
          labelStyle={{
            fontSize: 16,
            color: "black",
            fontFamily: fontFamily.medium,
          }}
          placeholderStyle={{
            color: "transparent",
            fontFamily: fontFamily.light,
          }}
          listMode="MODAL"
          modalTitle="Select your currency"
          modalContentContainerStyle={{
            backgroundColor: "#263647",
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            padding: 10,
          }}
          modalProps={{
            animationType: "slide",
            transparent: false,
          }}
          open={open}
          value={pickerValue ?? userCurrencyPreference}
          items={curencyItems}
          setOpen={setOpen}
          setValue={setPickerValue}
          setItems={setCurrencyItems}
          renderListItem={({ item, isSelected }) => (
            <View
              className="flex-row items-center py-6 px-5 mb-4 rounded-lg"
              style={{
                backgroundColor: isSelected ? "#334155" : "transparent",
              }}
            >
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
                className="text-[#F1F5F9] text-xl flex-1"
                style={{ fontFamily: fontFamily.semiBold }}
              >
                {item.label}
              </Text>
              {isSelected && (
                <AntDesign name="checkcircle" size={20} color="#34D399" />
              )}
            </View>
          )}
        />
      </View>
      <Text
        style={{ fontFamily: fontFamily.medium }}
        className="text-sm text-gray-600 mt-2 ml-2 dark:text-gray-300"
      >
        Selected:{" "}
        <Text style={{ fontFamily: fontFamily.medium }}>
          {userCurrencyPreference}
        </Text>
      </Text>
    </>
  );
};

export default React.memo(CurrencyPicker);
