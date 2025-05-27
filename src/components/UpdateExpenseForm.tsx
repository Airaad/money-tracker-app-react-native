import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, Text, View } from "react-native";
import { z } from "zod";
import { useBudget } from "../context/BudgetContext";
import CustomDatePicker from "./CustomDatePicker";
import CustomInputController from "./CustomInputController";
import CustomPickerSelect from "./CustomPickerSelect";

interface ExpenseProps {
  expenseId: number;
  categoryId: number;
  title: string;
  type: string;
  icon: string;
  amount: string;
  description: string;
  createdDate: string;
}

const formSchema = z.object({
  description: z.string().max(25).optional(),
  amount: z
    .string({ required_error: "Please enter some amount" })
    .min(1, "Amount is required")
    .max(10, "Amount must contain at most 10 digits"),
  category: z.string({ required_error: "Please select the category" }),
  dateOfCreation: z.string().optional(),
  // icon: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const today = new Date();

const parts = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  weekday: "long",
}).formatToParts(today);

const day = parts.find((p) => p.type === "day")?.value;
const month = parts.find((p) => p.type === "month")?.value;
const weekday = parts.find((p) => p.type === "weekday")?.value;

const defaultDate = `${month} ${day}, ${weekday}`;

const UpdateExpenseForm = ({
  expenseId,
  categoryId,
  title,

  type,
  icon,
  amount,
  description,

  createdDate,
}: ExpenseProps) => {
  const { updateData } = useBudget();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    resetField,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
      amount: amount?.toString(),
      category: title,
      dateOfCreation: createdDate,
    },
  });

  useEffect(() => {
    reset({
      description: description,
      amount: amount?.toString(),
      category: title,
      dateOfCreation: createdDate || defaultDate,
    });
  }, [description, amount, title, createdDate]);

  // console.log(JSON.stringify(errors,null,1));

  const onSubmit = async (data: FormData) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // Alert.alert(JSON.stringify(data));
    // console.log(JSON.stringify(data));
    try {
      const expense = {
        id: expenseId,
        amount: Number(data.amount),
        description: data.description ?? "",
        categoryId: 0, //Temporary will be updated in function
        createdDate: data.dateOfCreation ?? defaultDate,
      };
      const category = {
        id: categoryId,
        name: data.category,
        type: type === "expense" ? "expense" : "income",
        icon: icon || "shopping-basket",
      };
      await updateData({ expense, category });
      Alert.alert("Item updated successfully");
      router.back();
    } catch (err) {
      Alert.alert(
        "Update failed",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  };
  return (
    <View className="bg-white flex-1 mt-14 rounded-t-[1.5rem]">
      <View className="flex-1 mt-10 items-center">
        <CustomPickerSelect
          isExpense={type === "expense" ? true : false}
          labelText="Select a Category"
          placeholder={type === "expense" ? "Ex. Shopping" : "Ex. Card"}
          control={control}
          errors={errors}
          name="category"
        />
        <CustomInputController
          label="Description"
          placeholder={
            type === "expense" ? "Ex. Weekly groceries" : "Ex. Monthly Salary"
          }
          name="description"
          control={control}
          errors={errors}
          props={{ maxLength: 25 }}
        />
        <CustomInputController
          label="Amount"
          placeholder="Ex. 789"
          name="amount"
          control={control}
          errors={errors}
          props={{
            keyboardType: "number-pad",
            maxLength: 10,
          }}
        />
        <CustomDatePicker
          labelText="Select a Date"
          control={control}
          errors={errors}
          name="dateOfCreation"
          defaultDate={createdDate}
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
              {isSubmitting ? "Updating..." : "Update"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UpdateExpenseForm;
