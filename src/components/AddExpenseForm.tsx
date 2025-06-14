import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, Text, View } from "react-native";
import { z } from "zod";
import { useBudget } from "../context/BudgetContext";
import expenseItems from "../data/expenseCategory";
import incomeItems from "../data/incomeCategory";
import CustomDatePicker from "./CustomDatePicker";
import CustomInputController from "./CustomInputController";
import CustomPickerSelect from "./CustomPickerSelect";

interface ExpenseProps {
  isExpense: boolean;
  updateExpense?: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  description: z.string().max(25).optional(),
  amount: z
    .string({ required_error: "Please enter some amount" })
    .min(1, "Amount is required")
    .max(9, "Amount must contain at most 9 digits"),
  category: z.string({ required_error: "Please select the category" }),
  dateOfCreation: z.date().optional(),
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

const AddExpenseForm = ({ isExpense }: ExpenseProps) => {
  const { insertData } = useBudget();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

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
    // console.log(JSON.stringify(data));
    try {
      const expense = {
        amount: Number(data.amount),
        description: data.description ? data.description : "",
        categoryId: 0, //Temporary will be updated in function
        createdDate: data.dateOfCreation
          ? data.dateOfCreation.toISOString()
          : today.toISOString(),
      };
      const category = {
        name: data.category,
        type: isExpense ? "expense" : "income",
        icon: categoryIcon || "shopping-basket",
        color: categoryIconColor || "#f3f4f6",
        bgColor: categoryIconBgColor || "#37474f",
      };
      await insertData({ expense, category });
      resetField("amount");
      resetField("description");
      resetField("category");
      resetField("dateOfCreation");
      Alert.alert("Item successfully entered");
      router.back();
    } catch (err) {
      Alert.alert(
        "Update failed",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  };
  return (
    <View className="bg-[#37474f] flex-1 mt-14 rounded-t-[2rem]">
      <View className="flex-1 mt-20 gap-2 items-center">
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
            maxLength: 9,
          }}
        />
        <CustomDatePicker
          labelText="Select a Date"
          control={control}
          errors={errors}
          name="dateOfCreation"
          defaultDate={defaultDate}
        />

        <View className="flex-row gap-8 mt-5">
          <Pressable
            disabled={isSubmitting}
            onPress={() => router.back()}
            className="bg-gray-400 items-center w-[130px] py-3 rounded-full"
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
              {isSubmitting ? "Saving..." : "Save"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddExpenseForm;
