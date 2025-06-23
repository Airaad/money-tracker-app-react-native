import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Pressable } from "react-native-gesture-handler";
import { useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";
import currencyOptions from "../data/currencyOptions";

const Section = ({ icon, title, themeMode, children }: any) => (
  <View className="mb-10 dark:bg-black">
    <View className="flex-row items-center gap-2 mb-4">
      <Ionicons
        name={icon}
        size={24}
        color={themeMode === "dark" ? "white" : "#263238"}
      />
      <Text className="text-xl font-bold text-[#263238] tracking-wide dark:text-white">
        {title}
      </Text>
    </View>
    <View className="bg-gray-100 rounded-xl p-4 space-y-4 dark:bg-[#37474f]">
      {children}
    </View>
  </View>
);

const PreferencesList = () => {
  const [open, setOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState<string | null>(null);
  const [curencyItems, setCurrencyItems] = useState(currencyOptions);
  const {
    storeUserPreferenceData,
    userCurrencyPreference,
    userCarryOverPreference,
    userPreferenceType,
    loading,
    error,
  } = useBudget();
  const { themeMode } = useTheme();
  return (
    <View className="bg-white flex-1 mt-5 rounded-t-3xl px-5 py-10 dark:bg-black">
      <View>
        <Section icon="brush" title="Appearance" themeMode={themeMode}>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg text-gray-800 dark:text-white">
              Dark Mode
            </Text>
            <Switch />
          </View>
          <View className="flex-row justify-between items-center my-4">
            <Text className="text-lg text-gray-800 dark:text-white">
              Carry Over
            </Text>
            <Switch
              thumbColor={userCarryOverPreference ? "#ffffff" : "#f4f3f4"}
              trackColor={{ false: "#d3d3d3", true: "#ffc727" }}
              value={userCarryOverPreference}
              onValueChange={(value) =>
                storeUserPreferenceData(
                  userPreferenceType,
                  value,
                  userCurrencyPreference
                )
              }
            />
          </View>
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
            Selected:{" "}
            <Text className="font-medium">{userCurrencyPreference}</Text>
          </Text>
        </Section>

        <Section
          icon="notifications"
          title="Notification"
          themeMode={themeMode}
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-lg text-gray-800 dark:text-white">
              Enable Daily Reminder
            </Text>
            <Switch />
          </View>
          <Pressable>
            <Text className="text-lg text-[#ffc727]">
              Open Notification Settings
            </Text>
          </Pressable>
        </Section>

        <Section icon="information-circle" title="About" themeMode={themeMode}>
          <Pressable>
            <Text className="text-lg text-[#ffc727]">Privacy Policy</Text>
          </Pressable>
          <Pressable>
            <Text className="text-lg text-[#ffc727] my-3">
              Terms & Conditions
            </Text>
          </Pressable>
          <Text className="text-sm text-gray-500 mt-2 dark:text-gray-300">
            App version: 1.0.0
          </Text>
        </Section>
      </View>
    </View>
  );
};

export default PreferencesList;
