import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Text } from "react-native";

interface BottomSheetProps {
  title: string;
  icon: string;
  description: string;
  amount: number;
}

export type Ref = BottomSheet;

const CustomBottomSheet = forwardRef<Ref, BottomSheetProps>((props, ref) => {
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
      <BottomSheetView className="flex-1 p-36 items-center">
        <Text className="text-white">{props.title} 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default React.memo(CustomBottomSheet);
