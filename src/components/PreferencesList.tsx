import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Linking, Switch, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";

import { fontFamily } from "../dimensions/fontFamily";
import CurrencyPicker from "./CurrencyPicker";
import NotificationSection from "./NotificationSection";
import ThemeSelectorModal from "./ThemeSelectorModal";

const Section = ({ icon, title, themeMode, children }: any) => (
  <View className="mb-10 dark:bg-black">
    <View className="flex-row items-center gap-2 mb-4">
      <Ionicons
        name={icon}
        size={22}
        color={themeMode === "dark" ? "white" : "#263238"}
      />
      <Text
        style={{ fontFamily: fontFamily.semiBold }}
        className="text-lg text-[#263238] dark:text-white"
      >
        {title}
      </Text>
    </View>
    <View className="bg-gray-100 rounded-xl px-4 py-2 dark:bg-[#37474f]">
      {children}
    </View>
  </View>
);

const PreferencesList = () => {
  const {
    storeUserPreferenceData,
    userCurrencyPreference,
    userCarryOverPreference,
    userPreferenceType,
  } = useBudget();
  const { themeMode } = useTheme();

  return (
    <View className="bg-white flex-1 mt-5 rounded-t-3xl px-5 py-8 dark:bg-black">
      <View>
        <Section
          icon="color-palette-outline"
          title="Appearance"
          themeMode={themeMode}
        >
          <View className="flex-row justify-between items-center">
            <Text
              style={{ fontFamily: fontFamily.medium }}
              className="text-lg text-gray-800 dark:text-white"
            >
              Choose Theme
            </Text>
            <ThemeSelectorModal />
          </View>

          <View className="flex-row justify-between items-center my-4">
            <Text
              style={{ fontFamily: fontFamily.medium }}
              className="text-lg text-gray-800 dark:text-white"
            >
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
          <CurrencyPicker />
        </Section>

        <Section
          icon="notifications-outline"
          title="Notification"
          themeMode={themeMode}
        >
          <NotificationSection />
        </Section>

        <Section
          icon="information-circle-outline"
          title="About"
          themeMode={themeMode}
        >
          <Pressable
            onPress={() =>
              Linking.openURL(
                "https://airaad.github.io/money-tracker-app-react-native/"
              )
            }
          >
            <Text
              style={{ fontFamily: fontFamily.medium }}
              className="text-lg text-[#ffc727]"
            >
              Privacy Policy
            </Text>
          </Pressable>
          <Pressable>
            <Text
              style={{ fontFamily: fontFamily.medium }}
              className="text-lg text-[#ffc727] my-3"
            >
              Like Expensy
            </Text>
          </Pressable>
          <Text
            style={{ fontFamily: fontFamily.regular }}
            className="text-sm text-gray-500 mt-2 dark:text-gray-300"
          >
            Expensy: 1.0.0
          </Text>
          <Text
            style={{ fontFamily: fontFamily.regular }}
            className="text-sm text-gray-500 dark:text-gray-300"
          >
            Developed by Sheikh Airaad
          </Text>
          <Text
            style={{ fontFamily: fontFamily.regular }}
            className="text-sm text-gray-500 dark:text-gray-300"
          >
            Contact: sheikhairaad@gmail.com
          </Text>
        </Section>
      </View>
    </View>
  );
};

export default React.memo(PreferencesList);
