import React from "react";
import { Linking, Platform, Pressable, Switch, Text, View } from "react-native";
import { fontFamily } from "../dimensions/fontFamily";
import { useNotification } from "../hooks/useNotification";

const NotificationSection = () => {
  const { reminderEnabled, toggleReminders } = useNotification();
  const handleOpenSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };
  return (
    <>
      <View className="flex-row justify-between items-center">
        <Text
          style={{ fontFamily: fontFamily.medium }}
          className="text-lg text-gray-800 dark:text-white"
        >
          Enable Daily Reminders
        </Text>
        <Switch
          thumbColor={reminderEnabled ? "#ffffff" : "#f4f3f4"}
          trackColor={{ false: "#d3d3d3", true: "#ffc727" }}
          value={reminderEnabled}
          onValueChange={toggleReminders}
        />
      </View>
      <Pressable onPress={handleOpenSettings}>
        <Text
          style={{ fontFamily: fontFamily.medium }}
          className="text-lg text-[#ffc727]"
        >
          Open Notification Settings
        </Text>
      </Pressable>
    </>
  );
};

export default NotificationSection;
