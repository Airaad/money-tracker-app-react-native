import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type themeContextType = {
  themeMode: "light" | "dark";
  toggleThemeMode: (mode: "light" | "dark" | "default") => Promise<void>;
};

const ThemeContext = createContext<themeContextType>({
  themeMode: "light",
  toggleThemeMode: async () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorTheme = useColorScheme();
  const [colorTheme, setColorTheme] = useState<"light" | "dark">(
    systemColorTheme ?? "light"
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("themeType");
        if (storedTheme === "light" || storedTheme === "dark") {
          setColorTheme(storedTheme);
        } else {
          setColorTheme(systemColorTheme ?? "light");
        }
      } catch (error) {
        console.error("Failed to load theme from storage", error);
      }
    };

    loadTheme();
  }, [systemColorTheme]);

  const toggleThemeMode = async (mode: "light" | "dark" | "default") => {
    try {
      if (mode === "light" || mode === "dark") {
        setColorTheme(mode);
        await AsyncStorage.setItem("themeType", mode);
      } else {
        await AsyncStorage.removeItem("themeType");
        setColorTheme(systemColorTheme ?? "light");
      }
    } catch (error) {
      console.error("Failed to toggle theme", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode: colorTheme,
        toggleThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
