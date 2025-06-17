import PreferencesList from "@/src/components/PreferencesList";
import SettingsHeader from "@/src/components/SettingsHeader";
import React from "react";
import { View } from "react-native";

const Page = () => {
  return (
    <View className="flex-1 pt-16 bg-[#ffc727]">
      <SettingsHeader />
      <PreferencesList />
    </View>
  );
};

export default Page;
