import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Switch, Text, View } from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";

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
  return (
    <View className="bg-white flex-1 mt-5 rounded-t-3xl px-5 py-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section icon="brush" title="Appearance">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">Dark Mode</Text>
            <Switch />
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">Carry Over</Text>
            <Switch />
          </View>
          <Pressable>
            <Text className="text-lg text-[#ffc727]">
              Change Currency Symbol
            </Text>
          </Pressable>
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
            <Text className="text-lg text-[#ffc727]">Terms & Conditions</Text>
          </Pressable>
          <Text className="text-sm text-gray-500 mt-2">App version: 1.0.0</Text>
        </Section>
      </ScrollView>
    </View>
  );
};

export default PreferencesList;
