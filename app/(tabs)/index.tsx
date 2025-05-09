import Header from "@/components/Header";
import SliderMenu from "@/components/SliderMenu";
import { ScrollView } from "react-native";

export default function Index() {
  return (
    <>
      <ScrollView className="flex-1 py-20 bg-black">
        <Header />
        <SliderMenu />
      </ScrollView>
    </>
  );
}
