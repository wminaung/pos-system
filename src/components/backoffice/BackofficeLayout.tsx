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
        display: "flex",
        justifyContent: "space-between",
        height: 800,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box width={{ md: "100%" }} sx={{ order: { xs: 2, md: 1 } }}>
        <All />
      </Box>{" "}
      <Box
        mb={2}
        width={{ xs: "100%", md: "300px" }}
        sx={{ mt: 8, order: { xs: 1, md: 2 }, bgcolor: "#a5a5a52d" }}
      >
        <Box sx={{}} component={Paper} elevation={1}>
          <MenuForm />
        </Box>
      </Box>
    </Box>

    // <Box sx={{ display: "flex", justifyContent: "space-between", height: 800 }}>
    //   <Box width={"80%"}>
    //     <All />
    //   </Box>
    //   <Box width={"300px"} sx={{ bgcolor: "", mt: 20 }}>
    //     <MenuForm menu={menu} formAction={FormAction.create} />
    //   </Box>
    // </Box>
  );
};

export default BackofficeLayout;
