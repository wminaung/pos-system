import { useAppSlice } from "@/store/slices/appSlice";
import { NextComponentType, NextPageContext } from "next";
import Loading from "./Loading";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const BackofficeApp = ({ children }: Props) => {
  const { state } = useAppSlice();
  const { init, isLoading } = state.app;

  if (!init) {
    return (
      <Box sx={{ height: 800 }}>
        <Loading />
      </Box>
    );
  }

  return <>{children}</>;
};

export default BackofficeApp;
