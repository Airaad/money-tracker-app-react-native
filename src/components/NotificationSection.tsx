import React from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { fontFamily } from "../dimensions/fontFamily";

const NotificationSection = () => {
  return (
    <>
      <View className="flex-row justify-between items-center">
        <Text
          style={{ fontFamily: fontFamily.medium }}
          className="text-lg text-gray-800 dark:text-white"
        >
          Enable Daily Reminder
        </Text>
        <Switch />
      </View>
      <Pressable>
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
