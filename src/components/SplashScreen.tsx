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
      <Text style={[styles.title, { color: "#ffc727" }]}>Expensy</Text>
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
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 600,
    marginBottom: 20,
    letterSpacing: 1,
  },
});
