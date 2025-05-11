import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, View } from "react-native";
import { z } from "zod";
import CustomInputController from "./CustomInputController";

const formSchema = z.object({
  description: z.string().max(50),
  amount: z.string()
    .min(1, "Amount is required")
    .max(10, "Amount must contain at most 10 digits"),
});

type FormData = z.infer<typeof formSchema>;

const AddExpenseForm = () => {
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
    resetField("amount")
    resetField("description")
  };
  return (
    <View className="bg-white flex-1 mt-32 rounded-t-[2.5rem]">
      <View className="flex-1 justify-center items-center">
        <CustomInputController
          label="Description"
          placeholder="Ex. Weekly groceries"
          name="description"
          control={control}
          errors={errors}
          props={{maxLength:50}}
        />
        <CustomInputController
          label="Amount"
          placeholder="Ex. $78"
          name="amount"
          control={control}
          errors={errors}
          props={{
            keyboardType: "number-pad",
            maxLength:10
          }}
        />
      </View>
      <Button disabled={isSubmitting} title={isSubmitting ? "Submitting" : "Submit"} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AddExpenseForm;
