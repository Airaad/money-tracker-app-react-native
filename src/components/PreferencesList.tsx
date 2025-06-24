import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Pressable } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";
import currencyOptions from "../data/currencyOptions";
import { useToast } from "../hooks/useToast";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const { showToast } = useToast();
  const { themeMode, themeName, toggleThemeMode } = useTheme();

  const handleThemeSelect = async (theme: "system" | "light" | "dark") => {
    setIsModalVisible(false);
    try {
      await toggleThemeMode(theme);
    } catch (err) {
      showToast({
        type: "error",
        text1: "Failed to change theme",
        text2: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };

  return (
    <View className="bg-white flex-1 mt-5 rounded-t-3xl px-5 py-10 dark:bg-black">
      <View>
        <Section icon="brush" title="Appearance" themeMode={themeMode}>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg text-gray-800 dark:text-white">
              Choose Theme
            </Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <FontAwesome
                name="chevron-circle-down"
                size={24}
                color={themeMode === "dark" ? "white" : "#ffc727"}
              />
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(false)}
          >
            <View className="w-[80%] self-center bg-white rounded-lg p-5 dark:bg-black">
              <Text className="text-xl font-semibold mb-4 text-center dark:text-white">
                Select Theme
              </Text>

              <TouchableOpacity onPress={() => handleThemeSelect("system")}>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xl py-3 dark:text-white">System Default</Text>
                  {themeName === "system" && (
                    <FontAwesome
                      name="dot-circle-o"
                      size={24}
                      color="#ffc727"
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleThemeSelect("light")}>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xl py-3 dark:text-white">Light</Text>
                  {themeName === "light" && (
                    <FontAwesome
                      name="dot-circle-o"
                      size={24}
                      color="#ffc727"
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleThemeSelect("dark")}>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xl py-3 dark:text-white">Dark</Text>
                  {themeName === "dark" && (
                    <FontAwesome
                      name="dot-circle-o"
                      size={24}
                      color="#ffc727"
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text className="text-center mt-4 text-['#4a90e2'] text-lg">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
