import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: "#000000" }]}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* <Text
        style={[
          styles.title,
          { color: "#ffc727", fontFamily: fontFamily.bold },
        ]}
      >
        Expensy
      </Text> */}
      <ActivityIndicator size="large" color="#ffc727" />
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
    fontSize: 25,
    marginBottom: 20,
  },
});
