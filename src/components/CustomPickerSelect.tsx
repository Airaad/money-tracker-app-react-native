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

interface CustomInputControllerProps<T extends FieldValues> {
  labelText: string;
  placeholder: string;
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
}

const CustomPickerSelect = <T extends FieldValues>({
  labelText,
  placeholder,
  name,
  control,
  errors,
}: CustomInputControllerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "Shopping", value: "shopping" },
    { label: "Loan", value: "loan" },
    { label: "Bills", value: "bills" },
    { label: "Transport", value: "transport" },
    { label: "Home", value: "home" },
  ]);
  return (
    <View className="w-[78%] relative" style={{ zIndex: 1000 }}>
      <Text
        className="absolute top-2 left-3 font-semibold text-lg text-white"
        style={{ zIndex: 1001 }}
      >
        {labelText}
      </Text>
      <View
        className="w-[95%] h-[2px] bg-gray-500 absolute bottom-8 left-2"
        style={{ zIndex: 1001 }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <DropDownPicker
            style={{
              backgroundColor: "black",
              zIndex: 1000,
              height: 105,
              borderRadius: 16,
              paddingTop: 28,
              marginBottom: 9,
              paddingLeft: 10,
            }}
            containerStyle={{ zIndex: 999 }}
            placeholderStyle={{ color: "gray", fontSize: 16 }}
            textStyle={{ color: "white", fontSize: 16 }} //styling of the selected item
            listMode="MODAL"
            modalTitle="Choose a Category"
            theme="DARK"
            modalTitleStyle={{ color: "white", fontSize: 18 }}
            modalContentContainerStyle={{
              backgroundColor: "black",
              paddingHorizontal: 15,
              paddingTop: 20,
            }}
            modalProps={{
              animationType: "slide",
              transparent: false,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={placeholder}
            renderListItem={({ item }) => (
              <View
                style={{
                  padding: 16,
                  borderBottomColor: "#333",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  onPress={() => {
                    if (item.value !== undefined) {
                      setValue(item.value);
                      onChange(item.value);
                      setOpen(false);
                    }
                  }}
                  style={{ color: "white", fontSize: 16 }}
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
  );
};

export default CustomPickerSelect;
