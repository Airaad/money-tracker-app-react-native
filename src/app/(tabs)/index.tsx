import Header from "@/src/components/Header";
import SliderList from "@/src/components/SliderList";
import { ScrollView } from "react-native";

export default function Home() {
  return (
    <>
      <ScrollView className="flex-1 pt-20 bg-black">
        <Header />
        <SliderList />
      </ScrollView>
    </>
  );
}
