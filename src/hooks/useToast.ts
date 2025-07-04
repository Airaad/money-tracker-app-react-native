import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const showToast = ({
    type = "success",
    text1,
    text2,
    position = "top",
    visibilityTime = 1500,
  }: {
    type?: ToastType;
    text1: string;
    text2?: string;
    position?: "top" | "bottom";
    bottomOffset?: number;
    visibilityTime?: number;
  }) => {
    Toast.show({
      type,
      text1,
      text2,
      position,
      visibilityTime,
    });
  };

  return { showToast };
};
