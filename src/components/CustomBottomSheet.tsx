import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";

interface BottomSheetProps {
  id: number;
  title: string;
  category: string;
  icon: string;
  description: string;
  amount: number;
  date: string;
}

export type Ref = BottomSheet;

const CustomBottomSheet = forwardRef<Ref, BottomSheetProps>((props, ref) => {
  const router = useRouter()
  const snapPoints = useMemo(() => ["70%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  // console.log(props);
  const { deleteData, loading, error } = useBudget();

  const handleUpdate = async (item: BottomSheetProps) => {
    router.push({
  pathname: "/update",
  params: {
    id: item.id.toString(),
  },
});
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteData(id);

      if (!error) {
        // @ts-ignore
        ref?.current?.close();
      } else {
        Alert.alert("Error", "Failed to delete the item. Please try again.");
        console.error("Delete error:", error);
      }
    } catch (err) {
      Alert.alert("Unexpected Error", "Something went wrong.");
      console.error("Unexpected error:", err);
    }
  };
  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={ref}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#000000" }}
      handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
    >
      <BottomSheetView className="flex-1">
        <View className="p-5 flex-row justify-between items-center">
          <Text className="text-lg text-white text-medium">{props.date}</Text>
          <View className="flex-row gap-10">
            <Pressable onPress={() => handleDelete(props.id)}>
              <MaterialIcons name="delete" size={24} color="white" />
            </Pressable>
            <Pressable onPress={() => handleUpdate(props)}>
            <MaterialIcons name="edit" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View className="justify-center items-center gap-5 mt-20">
          <Text className="text-blue-500 text-2xl font-medium">
            {props.category?.toUpperCase()}
          </Text>
          <Text
            className={`${
              props?.category === "expense" ? "text-red-500" : "text-green-500"
            } text-4xl font-medium`}
          >{`${
            props?.category === "expense"
              ? "-$" + props.amount
              : "+$" + props.amount
          }`}</Text>
          <View>
            <Text className="text-white tracking-widest text-3xl font-semibold text-center">
              {props.title}
            </Text>
            <Text className="text-gray-400 text-lg text-center">
              {props.description}
            </Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default React.memo(CustomBottomSheet);
