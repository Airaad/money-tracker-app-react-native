import Header from "@/src/components/Header";
import SliderList from "@/src/components/SliderList";
import { View } from "react-native";

export default function Home() {
  return (
    <>
      <View className="flex-1 pt-16 bg-[#ffc727]">
        <Header />
        <SliderList />
      </View>
    </>
  );
}
