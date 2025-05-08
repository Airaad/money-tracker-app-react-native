import Header from "@/components/Header";
import Slider from "@/components/Slider";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 py-20 bg-black">
      <Header/>
      <Slider/>
    </View>
  );
}
