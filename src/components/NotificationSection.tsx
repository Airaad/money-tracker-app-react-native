import React from "react";
import { Pressable, Switch, Text, View } from "react-native";

const NotificationSection = () => {
  return (
    <>
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
    </>
  );
};

export default NotificationSection;
