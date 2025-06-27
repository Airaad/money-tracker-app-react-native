import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../hooks/useToast";

const ThemeSelectorModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { themeMode, themeName, toggleThemeMode } = useTheme();
  const { showToast } = useToast();

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
    <>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <FontAwesome
          name="chevron-circle-down"
          size={24}
          color={themeMode === "dark" ? "white" : "#ffc727"}
        />
      </TouchableOpacity>
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
              <Text className="text-xl py-3 dark:text-white">
                System Default
              </Text>
              {themeName === "system" && (
                <FontAwesome name="dot-circle-o" size={24} color="#ffc727" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleThemeSelect("light")}>
            <View className="flex-row justify-between items-center">
              <Text className="text-xl py-3 dark:text-white">Light</Text>
              {themeName === "light" && (
                <FontAwesome name="dot-circle-o" size={24} color="#ffc727" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleThemeSelect("dark")}>
            <View className="flex-row justify-between items-center">
              <Text className="text-xl py-3 dark:text-white">Dark</Text>
              {themeName === "dark" && (
                <FontAwesome name="dot-circle-o" size={24} color="#ffc727" />
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
    </>
  );
};

export default React.memo(ThemeSelectorModal);
