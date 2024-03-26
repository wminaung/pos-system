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
import { Menu, MenuCategory } from "@prisma/client";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useEffect, useState } from "react";
import { config } from "@/config/config";
import { useShowAlert } from "@/hooks/useShowAlert";

const CreateMenuCategory = () => {
  const [newMenuCategory, setNewMenuCategory] = useState<MenuCategory>(
    {} as MenuCategory
  );

  const [disabled, setDisabled] = useState<boolean>(true);

  const { actions, dispatch } = useAppSlice();
  const { showAlert } = useShowAlert();

  useEffect(() => {
    if (newMenuCategory) {
      setDisabled(!!!newMenuCategory.name);
    }
  }, [newMenuCategory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await fetch(`${config.backofficeApiBaseUrl}/menuCategories`, {
      method: "POST",
      body: JSON.stringify(newMenuCategory),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    if (!res.ok) {
      showAlert("menu-cat create something wrong", "error");
      return;
    }
    const createdMenuCategory = await res.json();
    console.log(createdMenuCategory, "menu-category creating......");
    showAlert("new menu-category successfully created", "success");

    dispatch(actions.menuCategories.addMenuCategory(createdMenuCategory));

    setNewMenuCategory({ name: "", description: "", price: 0 } as Menu);
  };
  const handleReset = () => {
    setNewMenuCategory({} as Menu);
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
        Create Menu Category
      </Typography>

      <div style={{ padding: "10px" }}>
        <TextField
          fullWidth
          id="outlined-error"
          label="name"
          value={newMenuCategory.name || ""}
          onChange={(e) =>
            setNewMenuCategory({
              ...newMenuCategory,
              name: e.target.value,
            })
          }
        />

        {/* <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="description"
          value={newMenu.description || ""}
          onChange={(e) =>
            setNewMenu({ ...newMenu, description: e.target.value })
          }
          //   helperText="Incorrect entry."
        /> */}

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
export default CreateMenuCategory;
