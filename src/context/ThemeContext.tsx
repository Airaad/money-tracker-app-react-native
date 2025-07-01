import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme } from "nativewind";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import SplashScreen from "../components/SplashScreen";

type ThemeContextType = {
  themeMode: "light" | "dark";
  themeName: "light" | "dark" | "system";
  toggleThemeMode: (mode: "light" | "dark" | "system") => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  themeName: "system",
  toggleThemeMode: async () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorTheme = useColorScheme() ?? "light";
  const [colorTheme, setColorTheme] = useState<"light" | "dark">(
    systemColorTheme
  );
  const [themeName, setThemeName] = useState<"light" | "dark" | "system">(
    "system"
  );
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("themeType");
        if (storedTheme === "light" || storedTheme === "dark") {
          colorScheme.set(storedTheme);
          setColorTheme(storedTheme);
          setThemeName(storedTheme);
        } else {
          colorScheme.set("system");
          setColorTheme(systemColorTheme);
          setThemeName("system");
        }
      } catch (error) {
        console.error("Failed to load theme from storage", error);
        colorScheme.set("system");
        setColorTheme(systemColorTheme);
        setThemeName("system");
      } finally {
        await new Promise(r => setTimeout(r, 300));
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, [systemColorTheme]);

  const toggleThemeMode = async (mode: "light" | "dark" | "system") => {
    try {
      if (mode === "light" || mode === "dark") {
        colorScheme.set(mode);
        setColorTheme(mode);
        setThemeName(mode);
        await AsyncStorage.setItem("themeType", mode);
      } else {
        colorScheme.set("system");
        setColorTheme(systemColorTheme);
        setThemeName("system");
        await AsyncStorage.removeItem("themeType");
      }
    } catch (error) {
      colorScheme.set("system");
      setColorTheme(systemColorTheme);
      setThemeName("system");
      throw new Error("Failed to change theme");
    }
  };

  if (!isThemeLoaded) return <SplashScreen />;

  return (
    <ThemeContext.Provider
      value={{
        themeMode: colorTheme,
        themeName,
        toggleThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
