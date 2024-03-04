import { Box, Button, Grid, Paper, Stack, TextField } from "@mui/material";
import All from "./All";
import useAppSlice from "@/store/hook/useAppSlice";
import MenuForm from "./forms/MenuForm";
import { FormAction } from "@/utils/enums";

const BackofficeLayout = () => {
  const { state, actions, dispatch } = useAppSlice();

  return (
    <Box
      sx={{
        bgcolor: "#f1f2f3",
        py: 1.5,
        px: 5,
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "end",
        justifyContent: "start",
        // flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Button variant="contained">create menu</Button>
      </Box>
      <All />
    </Box>
  );
};

export default BackofficeLayout;
