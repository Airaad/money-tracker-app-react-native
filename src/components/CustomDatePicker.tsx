import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface CustomDatePickerProps<T extends FieldValues> {
  labelText: string;
  defaultDate: string;
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
}

const CustomDatePicker = <T extends FieldValues>({
  labelText,
  defaultDate,
  name,
  control,
  errors,
}: CustomDatePickerProps<T>) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <View className="w-[78%] relative">
        <Text className="absolute top-2 left-3 font-semibold text-lg text-blue-400 z-10">
          {labelText}
        </Text>
        <View className="w-[95%] h-[2px] bg-gray-500 absolute bottom-7 left-2 z-10" />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Pressable
                onPress={showDatePicker}
                className="text-lg text-white h-[90px] rounded-2xl pt-7 mb-2 pl-3 bg-black shadow-md elevation-lg"
              >
                <Text className="text-white text-lg pt-4">{selectedDate}</Text>
              </Pressable>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                display="default"
                mode="date"
                onConfirm={(date: Date) => {
                  const parts = new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "long",
                    weekday: "long",
                  }).formatToParts(date);
                  console.log(parts);

                  const day = parts.find((p) => p.type === "day")?.value;
                  const month = parts.find((p) => p.type === "month")?.value;
                  const weekday = parts.find(
                    (p) => p.type === "weekday"
                  )?.value;

                  const formatted = `${month} ${day}, ${weekday}`;
                  onChange(formatted);
                  setSelectedDate(formatted);
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
              />
            </>
          )}
          name={name}
        />
      </View>
      {errors && errors[name] && (
        <Text className="text-red-500 mb-3">
          {errors[name]?.message as string}
        </Text>
      )}
    </>
  );
};

export default CustomDatePicker;
