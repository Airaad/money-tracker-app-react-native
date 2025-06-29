import { Image, StyleSheet, Text, View } from "react-native";
import { fontFamily } from "../dimensions/fontFamily";

const SplashScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: "#000000" }]}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.title,
          { color: "#ffc727", fontFamily: fontFamily.semiBold },
        ]}
      >
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
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
});
