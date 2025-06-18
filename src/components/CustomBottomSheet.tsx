import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { format, parseISO } from "date-fns";
import { useRouter } from "expo-router";
import React, { forwardRef, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { useBudget } from "../context/BudgetContext";
import { useToast } from "../hooks/useToast";

interface BottomSheetProps {
  id: number;
  title: string;
  category: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  amount: number;
  date: string;
}

export type Ref = BottomSheet;

const CustomBottomSheet = forwardRef<Ref, BottomSheetProps>((props, ref) => {
  const router = useRouter();
  const { showToast } = useToast();
  const snapPoints = useMemo(() => ["90%"], []);
  // const renderBackdrop = useCallback(
  //   (props: any) => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       disappearsOnIndex={-1}
  //       appearsOnIndex={0}
  //     />
  //   ),
  //   []
  // );
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
      // @ts-ignore
      ref?.current?.close();
      showToast({
        type: "success",
        text1: "Item deleted successfully",
      });
    } catch (err) {
      showToast({
        type: "error",
        text1: "Failed to delete item",
        text2: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };
  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={ref}
      index={-1}
      // backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#37474f" }}
      handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
    >
      <BottomSheetView className="flex-1">
        <View className="p-5 flex-row justify-between items-center">
          <Text className="text-lg text-[#ffc727] text-medium">
            {props.date
              ? format(parseISO(props.date), "MMMM dd, yyyy")
              : "Invalid Date"}
          </Text>
          <View className="flex-row gap-10">
            <Pressable onPress={() => handleDelete(props.id)}>
              <MaterialIcons name="delete" size={24} color="#ffc727" />
            </Pressable>
            <Pressable onPress={() => handleUpdate(props)}>
              <MaterialIcons name="edit" size={24} color="#ffc727" />
            </Pressable>
          </View>
        </View>
        <View className="justify-center items-center gap-5 mt-10">
          <FontAwesome5 name={props.icon} size={25} color={props.color} />
          <Text className="text-[#ffc727] text-2xl font-medium">
            {props.category?.toUpperCase()}
          </Text>
          <Text
            className={`${
              props?.category === "expense" ? "text-red-500" : "text-green-500"
            } text-4xl font-semibold`}
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
