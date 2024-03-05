import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import All from "./AllMenus";
import DialogBox from "../DialogBox";
import { useState } from "react";
import CreateMenu from "./forms/CreateMenu";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AllMenus from "./AllMenus";

const MenusApp = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: "#f1f2f3",
        py: 1.5,
        px: 5,
        pb: 10,
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "end",
        justifyContent: "start",
        // flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="h6" mr={0.5}>
            Add New Menu
          </Typography>
          <IconButton
            title="create new menu"
            onClick={() => setOpen(true)}
            sx={{ color: "#528078" }}
            size="medium"
          >
            <AddBoxIcon fontSize="large" sx={{ fontSize: "4rem" }} />
          </IconButton>
        </Stack>
        <span>
          <DialogBox open={open} setOpen={setOpen} title="Create Menu">
            <CreateMenu />
          </DialogBox>
        </span>
      </Box>

      {
        //! this is all menus >>> <<<
      }
      <AllMenus />
    </Box>
  );
};

export default MenusApp;
