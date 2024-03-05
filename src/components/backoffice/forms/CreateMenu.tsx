"use client";
import useAppSlice from "@/store/hook/useAppSlice";
import {
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Menu } from "@prisma/client";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useEffect, useState } from "react";
import { config } from "@/config/config";
import { useShowAlert } from "@/hooks/useShowAlert";

const CreateMenu = () => {
  const [newMenu, setNewMenu] = useState<Menu>({} as Menu);

  const [disabled, setDisabled] = useState<boolean>(true);

  const { actions, dispatch } = useAppSlice();
  const { showAlert } = useShowAlert();

  useEffect(() => {
    if (newMenu) {
      setDisabled(
        !(newMenu.price > 0 && !!newMenu.name && !!newMenu.description)
      );
    }
  }, [newMenu]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await fetch(`${config.backofficeApiBaseUrl}/menus`, {
      method: "POST",
      body: JSON.stringify(newMenu),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    if (!res.ok) {
      showAlert("menu create something wrong", "error");
      return;
    }
    const createdMenu = await res.json();
    console.log(createdMenu, "menu creating......");
    showAlert("new menu successfully created", "success");

    dispatch(actions.menus.addMenu(createdMenu));

    setNewMenu({ name: "", description: "", price: 0 } as Menu);
  };
  const handleReset = () => {
    setNewMenu({} as Menu);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { my: 1 },
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      autoComplete="off"
    >
      <Typography variant="h3" align="center">
        Create Menu
      </Typography>

      <div style={{ padding: "10px" }}>
        <TextField
          fullWidth
          id="outlined-error"
          label="name"
          value={newMenu.name || ""}
          onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
        />
        <TextField
          fullWidth
          id="price"
          label="price"
          type="number"
          value={newMenu.price ? newMenu.price.toString() : "0"}
          onChange={(e) =>
            setNewMenu({ ...newMenu, price: Number(e.target.value) || 0 })
          }
          InputProps={{ startAdornment: <AttachMoneyIcon /> }}
          //   helperText="Incorrect entry."
        />
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="description"
          value={newMenu.description || ""}
          onChange={(e) =>
            setNewMenu({ ...newMenu, description: e.target.value })
          }
          //   helperText="Incorrect entry."
        />

        {/* <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          //   helperText="Incorrect entry."
        /> */}

        <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
          <Button onClick={handleReset} disabled={disabled} variant="outlined">
            Empty
          </Button>
          <Button type="submit" variant="contained" disabled={disabled}>
            create
          </Button>
        </Stack>
      </div>
    </Box>
  );
};
export default CreateMenu;
