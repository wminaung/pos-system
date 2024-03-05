import { SnackbarOrigin, VariantType, useSnackbar } from "notistack";

export const useShowAlert = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showAlert = (
    message: string,
    variant: VariantType,
    autoHideDuration: number | null = 3000,
    anchorOrigin: SnackbarOrigin = { vertical: "top", horizontal: "right" }
  ) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration,
      persist: false,
      anchorOrigin,
    });
  };

  return { showAlert };
};
