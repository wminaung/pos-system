import useAppSlice from "@/store/hook/useAppSlice";
import { FormAction } from "@/utils/enums";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useEffect, useState } from "react";
import { config } from "@/config/config";

const EditMenuCategory = () => {
  const [oldMenuCategory, setOldMenuCategory] = useState<MenuCategory>({
    name: "",
  } as MenuCategory);
  const [updatedMenuCategory, setUpdatedMenuCategory] = useState<MenuCategory>({
    name: "",
  } as MenuCategory);

  const { actions, dispatch, state } = useAppSlice();
  const { menuCategories } = state;
  const { selectedMenuCategoryId } = state.app;

  useEffect(() => {
    if (menuCategories) {
      const selectedMenuCategory = menuCategories.filter(
        (menuCategories) =>
          menuCategories.id === state.app.selectedMenuCategoryId
      )[0];
      setOldMenuCategory(selectedMenuCategory || {});
      setUpdatedMenuCategory(selectedMenuCategory || {});
    }
  }, [menuCategories, state.app.selectedMenuCategoryId]);

  if (!oldMenuCategory || !updatedMenuCategory) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories/${selectedMenuCategoryId}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedMenuCategory),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    if (!res.ok) {
      return;
    }
    const editedMenuCategory = await res.json();
    console.log(
      editedMenuCategory,
      "editedMenuCategory editedMenuCategory......"
    );
    dispatch(actions.menuCategories.editMenuCategory(editedMenuCategory));
    setUpdatedMenuCategory({ name: "" } as MenuCategory);
    setOldMenuCategory({ name: "" } as MenuCategory);
  };

  const handleReset = () => {
    const selectedMenuCategory = menuCategories.filter(
      (menucat) => menucat.id === state.app.selectedMenuCategoryId
    )[0];
    setOldMenuCategory(selectedMenuCategory || {});
    setUpdatedMenuCategory(selectedMenuCategory || {});
  };

  const handleDelete = async () => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories/${selectedMenuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      return;
    }
    const deletedMenuCategory = await res.json();
    console.log(deletedMenuCategory, "deletedMenucat deletedMenucat......");
    dispatch(actions.menuCategories.removeMenuCategory(deletedMenuCategory));
    setUpdatedMenuCategory({ name: "" } as MenuCategory);
    setOldMenuCategory({ name: "" } as MenuCategory);
  };

  const disableEditBtn =
    updatedMenuCategory.name.trim() === oldMenuCategory.name.trim();

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { my: 1 },
        // border: "1px solid black",
      }}
      //   noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      autoComplete="off"
    >
      <Typography variant="h3" align="center">
        Edit
      </Typography>
      <Typography variant="h3" align="center">
        Menu Category
      </Typography>

      <div style={{ padding: "10px" }}>
        <TextField
          fullWidth
          id="outlined-error"
          label="name"
          value={updatedMenuCategory.name || ""}
          onChange={(e) =>
            setUpdatedMenuCategory({
              ...updatedMenuCategory,
              name: e.target.value,
            })
          }
        />

        {/* <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          //   helperText="Incorrect entry."
        /> */}

        <Stack spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
            <Button
              onClick={handleReset}
              variant="outlined"
              type="button"
              disabled={disableEditBtn}
            >
              reset
            </Button>
            <Button type="submit" disabled={disableEditBtn} variant="contained">
              Update
            </Button>
          </Stack>
          <Stack>
            <Button
              onClick={handleDelete}
              variant="outlined"
              disabled={false}
              color="error"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </div>
    </Box>
  );
};
export default EditMenuCategory;
