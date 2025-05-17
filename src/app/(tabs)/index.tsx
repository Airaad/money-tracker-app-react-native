import Header from "@/src/components/Header";
import SliderList from "@/src/components/SliderList";
import { View } from "react-native";

export default function Home() {
  return (
    <>
      <View className="flex-1 pt-20 bg-black">
        <Header />
        <SliderList />
      </View>
    </>
  );
}
