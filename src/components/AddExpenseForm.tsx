import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, View } from "react-native";
import * as yup from "yup";
import CustomInputController from "./CustomInputController";

const formSchema = yup.object({
  description: yup.string().max(50),
  amount: yup.string().required("Amount is required").max(10),
});

const AddExpenseForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  // console.log(JSON.stringify(errors,null,1));
 
  const onSubmit = (data: any) => {
    Alert.alert(JSON.stringify(data));
    console.log(JSON.stringify(data));
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
            maxLength: 10
          }}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AddExpenseForm;
