import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Pressable } from "react-native-gesture-handler";
import { useBudget } from "../context/BudgetContext";
import currencyOptions from "../data/currencyOptions";

const Section = ({ icon, title, children }: any) => (
  <View className="mb-10">
    <View className="flex-row items-center gap-2 mb-4">
      <Ionicons name={icon} size={24} color="#263238" />
      <Text className="text-xl font-bold text-[#263238] tracking-wide">
        {title}
      </Text>
    </View>
    <View className="bg-gray-100 rounded-xl p-4 space-y-4">{children}</View>
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
  return (
    <View className="bg-white flex-1 mt-5 rounded-t-3xl px-5 py-10">
      <View>
        <Section icon="brush" title="Appearance">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">Dark Mode</Text>
            <Switch />
          </View>
          <View className="flex-row justify-between items-center my-4">
            <Text className="text-lg text-gray-800">Carry Over</Text>
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
            <Text className="text-lg text-[#ffc727]">Change Currency</Text>
            <DropDownPicker
              style={{
                height: 50,
                backgroundColor: "#f5f5f5",
                borderRadius: 12,
                borderWidth: 0,
              }}
              modalTitleStyle={{
                color: "#ffc727",
                fontSize: 18,
                fontWeight: "bold",
              }}
              labelStyle={{ fontSize: 16 }}
              placeholderStyle={{ color: "transparent" }}
              listMode="MODAL"
              modalTitle="Select your currency"
              modalContentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 20,
              }}
              modalProps={{ animationType: "slide" }}
              open={open}
              value={pickerValue ?? userCurrencyPreference}
              items={curencyItems}
              setOpen={setOpen}
              setValue={setPickerValue}
              setItems={setCurrencyItems}
              renderListItem={({ item }) => (
                <View className="p-4 border-b-[#333] border-b-[1px]">
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
                    className="text-black text-xl font-semibold py-2"
                  >
                    {item.label}
                  </Text>
                </View>
              )}
            />
          </View>
          <Text className="text-sm text-gray-600 mt-2">
            Selected:{" "}
            <Text className="font-medium">{userCurrencyPreference}</Text>
          </Text>
        </Section>

        <Section icon="notifications" title="Notification">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">Enable Daily Reminder</Text>
            <Switch />
          </View>
          <Pressable>
            <Text className="text-lg text-[#ffc727]">
              Open Notification Settings
            </Text>
          </Pressable>
        </Section>

        <Section icon="information-circle" title="About">
          <Pressable>
            <Text className="text-lg text-[#ffc727]">Privacy Policy</Text>
          </Pressable>
          <Pressable>
            <Text className="text-lg text-[#ffc727] my-3">
              Terms & Conditions
            </Text>
          </Pressable>
          <Text className="text-sm text-gray-500 mt-2">App version: 1.0.0</Text>
        </Section>
      </View>
    </View>
  );
};

export default PreferencesList;
