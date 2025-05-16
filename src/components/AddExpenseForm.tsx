import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, Text, View } from "react-native";
import { z } from "zod";
import CustomInputController from "./CustomInputController";
import CustomPickerSelect from "./CustomPickerSelect";

interface ExpenseProps {
  isExpense: boolean;
  updateExpense: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  description: z.string().max(50),
  amount: z
    .string()
    .min(1, "Amount is required")
    .max(10, "Amount must contain at most 10 digits"),
  category: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const AddExpenseForm = ({ isExpense, updateExpense }: ExpenseProps) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // console.log(JSON.stringify(errors,null,1));

  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    Alert.alert(JSON.stringify(data));
    console.log(JSON.stringify(data));
    resetField("amount");
    resetField("description");
    resetField("category");
  };
  return (
    <View className="bg-white flex-1 mt-14 rounded-t-[2.5rem]">
      <View className="flex-1 mt-10 items-center">
        <CustomPickerSelect
          isExpense={isExpense}
          labelText="Select a Category"
          placeholder={isExpense ? "Ex. Shopping" : "Ex. Card"}
          control={control}
          errors={errors}
          name="category"
        />
        <CustomInputController
          label="Description"
          placeholder={
            isExpense ? "Ex. Weekly groceries" : "Ex. Monthly Salary"
          }
          name="description"
          control={control}
          errors={errors}
          props={{ maxLength: 50 }}
        />
        <CustomInputController
          label="Amount"
          placeholder="Ex. $789"
          name="amount"
          control={control}
          errors={errors}
          props={{
            keyboardType: "number-pad",
            maxLength: 10,
          }}
        />

        <View className="flex-row gap-8 mt-5">
          <Pressable
            disabled={isSubmitting}
            onPress={() => router.back()}
            className="bg-blue-600 items-center w-[150px] py-3 rounded-full"
          >
            <Text className="text-white text-xl font-semibold tracking-widest">
              Cancel
            </Text>
          </Pressable>

          <Pressable
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            className="bg-blue-600 items-center w-[150px] py-3 rounded-full"
          >
            <Text className="text-white text-xl font-semibold tracking-widest">
              {isSubmitting ? "Saving..." : "Save"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddExpenseForm;
