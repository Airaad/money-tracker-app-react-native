import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { z } from "zod";
import { useBudget } from "../context/BudgetContext";
import expenseItems from "../data/expenseCategory";
import incomeItems from "../data/incomeCategory";
import { useToast } from "../hooks/useToast";
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
  dateOfCreation: z.date().optional(),
});

type FormData = z.infer<typeof formSchema>;

const UpdateExpenseForm = ({
  expenseId,
  title,
  type,
  icon,
  amount,
  description,
  createdDate,
}: ExpenseProps) => {
  const { updateData } = useBudget();
  const { showToast } = useToast();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    resetField,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
      amount: amount?.toString(),
      category: title,
      dateOfCreation: new Date(createdDate),
    },
  });

  useEffect(() => {
    reset({
      description: description,
      amount: amount?.toString(),
      category: title,
      dateOfCreation: new Date(createdDate),
    });
  }, [description, amount, title, createdDate]);

  // console.log(JSON.stringify(errors,null,1));

  const onSubmit = async (data: FormData) => {
    if (isNaN(Number(data.amount))) {
      setError("amount", {
        type: "manual",
        message: "Amount must be a valid number",
      });
      return;
    }

    const selectedExpenseCategory = expenseItems.find(
      (item) => item.value.title === data.category
    );

    const selectedIncomeCategory = incomeItems.find(
      (item) => item.value.title === data.category
    );

    const categoryIcon = selectedExpenseCategory
      ? selectedExpenseCategory?.value.icon
      : selectedIncomeCategory?.value.icon;

    const categoryIconColor = selectedExpenseCategory
      ? selectedExpenseCategory?.value.color
      : selectedIncomeCategory?.value.color;

    const categoryIconBgColor = selectedExpenseCategory
      ? selectedExpenseCategory?.value.bgColor
      : selectedIncomeCategory?.value.bgColor;
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // Alert.alert(JSON.stringify(data));
    // console.log(JSON.stringify(data));
    try {
      const expense = {
        id: expenseId,
        amount: Number(data.amount),
        description: data.description ?? "",
        categoryId: 0, //Temporary will be updated in function
        createdDate: data.dateOfCreation?.toISOString() ?? createdDate,
      };
      const category = {
        name: data.category,
        type: type === "expense" ? "expense" : "income",
        icon: categoryIcon || "shopping-basket",
        color: categoryIconColor || "#f3f4f6",
        bgColor: categoryIconBgColor || "#37474f",
      };
      await updateData({ expense, category });
      showToast({
        type: "success",
        text1: "Item updated successfully",
      });
      router.back();
    } catch (err) {
      showToast({
        type: "error",
        text1: "Failed to update item",
        text2: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };
  return (
    <View className="bg-white flex-1 mt-14 rounded-t-[2rem] dark:bg-[#37474f]">
      <View className="flex-1 mt-24 gap-4 items-center">
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
            inputMode: "numeric",
            maxLength: 10,
          }}
        />
        <CustomDatePicker
          labelText="Select a Date"
          control={control}
          errors={errors}
          name="dateOfCreation"
          defaultDate={format(
            parseISO(createdDate.split("T")[0]),
            "MMMM dd, yyyy"
          )}
        />

        <View className="flex-row gap-8 mt-5">
          <Pressable
            disabled={isSubmitting}
            onPress={() => router.back()}
            className="bg-[#37474f] items-center w-[130px] py-3 rounded-full dark:bg-gray-400"
          >
            <Text className="text-white text-lg font-semibold tracking-widest">
              Cancel
            </Text>
          </Pressable>

          <Pressable
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            className="bg-[#ffc727] items-center w-[130px] py-3 rounded-full"
          >
            <Text className="text-white text-lg font-semibold tracking-widest">
              {isSubmitting ? "Updating..." : "Update"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UpdateExpenseForm;
