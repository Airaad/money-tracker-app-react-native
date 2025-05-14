import React from "react";
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

// <T extends FieldValues> means T must be an object where keys are strings (like a form field), but it can also have its own specific structure.
// Without extends FieldValues, T could be anything (number, string, etc.), but forms must be objects.
// We can define your own form shape, but TypeScript ensures it’s still a valid form object.
interface CustomInputControllerProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  props?: TextInputProps;
}

const CustomInputController = <T extends FieldValues> ({
  label,
  placeholder,
  name,
  control,
  errors,
  props
}: CustomInputControllerProps<T>) => {
  return (
    <View className="w-[78%] relative">
      <Text className="absolute top-2 left-3 font-semibold text-lg text-white z-10">
        {label}
      </Text>
      <View className="w-[95%] h-[2px] bg-gray-500 absolute bottom-8 left-2 z-10" />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="text-lg text-white h-[105px] rounded-2xl pt-7 mb-2 pl-3 bg-black shadow-md elevation-lg"
            placeholder={placeholder}
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...props}
          />
        )}
        name={name}
      />
      {errors && errors[name] && <Text className="text-red-500">{errors[name]?.message as string}</Text>}
    </View>
  );
};

export default CustomInputController;
