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
import { fontFamily } from "../dimensions/fontFamily";

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
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <View className="w-[78%] relative">
        <Text
          style={{ fontFamily: fontFamily.semiBold }}
          className="absolute top-2 left-3 text-lg text-[#ffc727] z-10"
        >
          {labelText}
        </Text>
        <View className="w-[95%] h-[2px] bg-gray-500 absolute bottom-6 left-2 z-10" />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            const parts = new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "long",
              weekday: "long",
            }).formatToParts(value);

            const day = parts.find((p) => p.type === "day")?.value;
            const month = parts.find((p) => p.type === "month")?.value;
            const weekday = parts.find((p) => p.type === "weekday")?.value;

            const formatted = `${month} ${day}, ${weekday}`;
            const displayedDate = formatted || defaultDate;
            return (
              <>
                <Pressable
                  onPress={showDatePicker}
                  className="text-lg text-white h-[90px] rounded-2xl pt-7 mb-2 pl-3 bg-black shadow-md elevation-lg"
                >
                  <Text
                    style={{ fontFamily: fontFamily.regular }}
                    className="text-white text-lg pt-4"
                  >
                    {displayedDate}
                  </Text>
                </Pressable>
                <DateTimePickerModal
                  buttonTextColorIOS="#ffc727"
                  pickerContainerStyleIOS={{ backgroundColor: "#ffc727" }}
                  isVisible={isDatePickerVisible}
                  display="default"
                  mode="date"
                  onConfirm={(date: Date) => {
                    onChange(date);
                    hideDatePicker();
                  }}
                  onCancel={hideDatePicker}
                  maximumDate={new Date()}
                />
              </>
            );
          }}
          name={name}
        />
      </View>
      {errors && errors[name] && (
        <Text
          style={{ fontFamily: fontFamily.medium }}
          className="text-red-500 mb-3"
        >
          {errors[name]?.message as string}
        </Text>
      )}
    </>
  );
};

export default CustomDatePicker;
