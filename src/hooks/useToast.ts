import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const showToast = ({
    type = "success",
    text1,
    text2,
    position = "top",
  }: {
    type?: ToastType;
    text1: string;
    text2?: string;
    position?: "top" | "bottom";
    bottomOffset?: number;
  }) => {
    Toast.show({
      type,
      text1,
      text2,
      position,
    });
  };

  return { showToast };
};
