import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";

const SplashScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Expensy
      </Text>
      {/* <ActivityIndicator size="large" color={isDark ? "#fff" : "#4f46e5"} /> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
