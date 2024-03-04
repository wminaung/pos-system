import CircularProgress from "@mui/material/CircularProgress";
import Layout from "./Layout";
import { Box, Dialog, DialogContent } from "@mui/material";
import useAppSlice from "@/store/hook/useAppSlice";

const Loading = () => {
  const { state } = useAppSlice();
  const { isLoading, init } = state.app;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "80%",
        justifyContent: "center",
      }}
    >
      <Dialog open={isLoading}>
        <DialogContent sx={{ color: "blue" }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default Loading;
