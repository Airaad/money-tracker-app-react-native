import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import expenseItems from "../data/expenseCategory";
import incomeItems from "../data/incomeCategory";

interface CustomInputControllerProps<T extends FieldValues> {
  isExpense: boolean;
  labelText: string;
  placeholder: string;
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
}

const CustomPickerSelect = <T extends FieldValues>({
  isExpense,
  labelText,
  placeholder,
  name,
  control,
  errors,
}: CustomInputControllerProps<T>) => {
  const dropdownExpenseItems = expenseItems.map((item) => ({
    label: item.label,
    value: item.value.title, // Only title goes to dropdown
  }));

  const dropdownIncomeItems = incomeItems.map((item) => ({
    label: item.label,
    value: item.value.title, // Only title goes to dropdown
  }));
  const [open, setOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState<string | null>(null);
  const [expenseCategory, setExpenseCategory] = useState(dropdownExpenseItems);
  const [incomeCategory, setIncomeCategory] = useState(dropdownIncomeItems);
  return (
    <>
      <View className="w-[78%] relative" style={{ zIndex: 1000 }}>
        <Text
          className="absolute top-2 left-3 font-semibold text-lg text-[#ffc727]"
          style={{ zIndex: 1001 }}
        >
          {labelText}
        </Text>
        <View
          className="w-[95%] h-[2px] bg-gray-500 absolute bottom-7 left-2"
          style={{ zIndex: 1001 }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              style={{
                backgroundColor: "black",
                zIndex: 1000,
                height: 90,
                borderRadius: 16,
                paddingTop: 28,
                marginBottom: 10,
                paddingLeft: 10,
              }}
              containerStyle={{ zIndex: 999 }}
              modalTitleStyle={{ color: "#ffc727", fontSize: 20 }}
              labelStyle={{ color: "white", fontSize: 16 }}
              placeholderStyle={{ color: "gray", fontSize: 16 }}
              listMode="MODAL"
              modalTitle="Select a Category"
              theme="DARK"
              modalContentContainerStyle={{
                backgroundColor: "#37474f",
                paddingHorizontal: 15,
                paddingTop: 20,
              }}
              modalProps={{
                animationType: "slide",
                transparent: false,
              }}
              open={open}
              value={value}
              items={isExpense ? expenseCategory : incomeCategory}
              setOpen={setOpen}
              setValue={setPickerValue}
              setItems={isExpense ? setExpenseCategory : setIncomeCategory}
              placeholder={placeholder}
              renderListItem={({ item }) => (
                <View className="p-4 border-b-[#333] border-b-[1px]">
                  <Text
                    onPress={() => {
                      if (item.value !== undefined) {
                        setPickerValue(item.value);
                        onChange(item.value);
                        setOpen(false);
                      }
                    }}
                    className="text-white text-xl font-semibold py-2"
                  >
                    {item.label}
                  </Text>
                </View>
              )}
            />
          )}
          name={name}
        />
      </View>
      {errors && errors[name] && (
        <Text className="text-red-500">{errors[name]?.message as string}</Text>
      )}
    </>
  );
};

export default CustomPickerSelect;
