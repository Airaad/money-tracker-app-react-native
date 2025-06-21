import Header from "@/src/components/Header";
import SliderList from "@/src/components/SliderList";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, View } from "react-native";

export default function Home() {
  return (
    <>
      <View className="flex-1 pt-16 bg-[#ffc727]">
        <Header />
        <SliderList />
        <Pressable className="bg-black absolute bottom-24 right-6 h-14 w-14 justify-center items-center border-2 border-black rounded-full">
          <FontAwesome6 name="plus" size={30} color="#ffc727" />
        </Pressable>
      </View>
    </>
  );
}
