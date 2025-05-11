import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from "react";
import { Button, Text, View } from "react-native";


const CustomBottomSheet = () => {
  const snapPoints = useMemo(()=>['75%'],[])
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleClose = () => bottomSheetRef.current?.close()
  const handleOpen = () => bottomSheetRef.current?.expand()
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
  return (
    <View className='bg-white flex-1 mt-32 rounded-t-[2.5rem]'>
      <Button title='Open' onPress={handleOpen}/>
      {/* <Button title='Close' onPress={handleClose}/> */}
    <BottomSheet 
    snapPoints={snapPoints} 
    ref={bottomSheetRef} index={-1} 
    enablePanDownToClose={true} 
    backgroundStyle={{backgroundColor: "#0068FF"}}
    handleIndicatorStyle={{backgroundColor: "#ffffff"}}
    backdropComponent={renderBackdrop}
    >
      <BottomSheetView className='flex-1 p-36 items-center'>
          <Text className='text-white'>Awesome 🎉</Text>
        </BottomSheetView>
    </BottomSheet>
    </View>
  );
}

export default CustomBottomSheet