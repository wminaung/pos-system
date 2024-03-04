import useAppSlice from "@/store/hook/useAppSlice";
import { FormAction } from "@/utils/enums";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Menu } from "@prisma/client";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useEffect, useState } from "react";
import { config } from "@/config/config";

const EditMenu = () => {
  const [oldMenu, setOldMenu] = useState<Menu>({} as Menu);
  const [updatedMenu, setUpdatedMenu] = useState<Menu>({} as Menu);

  const { actions, dispatch, state } = useAppSlice();
  const menus = state.menus;
  const { selectedMenuId } = state.app;

  useEffect(() => {
    if (menus) {
      const selectedMenu = menus.filter(
        (menu) => menu.id === state.app.selectedMenuId
      )[0];
      setOldMenu(selectedMenu || {});
      setUpdatedMenu(selectedMenu || {});
    }
  }, [menus, selectedMenuId]);

  if (!oldMenu || !updatedMenu) return null;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menus/${selectedMenuId}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedMenu),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );

    if (!res.ok) {
      return;
    }
    const editedMenu = await res.json();
    console.log(editedMenu, "editedMenu editedMenu......");

    dispatch(actions.menus.editMenu(editedMenu));

    setUpdatedMenu({ name: "", description: "", price: 0 } as Menu);
    setOldMenu({ name: "", description: "", price: 0 } as Menu);
  };

  const handleReset = () => {
    const selectedMenu = menus.filter(
      (menu) => menu.id === state.app.selectedMenuId
    )[0];
    setOldMenu(selectedMenu || {});
    setUpdatedMenu(selectedMenu || {});
  };

  const disableEditBtn =
    oldMenu.name === updatedMenu.name &&
    oldMenu.price === updatedMenu.price &&
    oldMenu.description === updatedMenu.description;

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
        Menu
      </Typography>

      <div style={{ padding: "10px" }}>
        <TextField
          fullWidth
          id="outlined-error"
          label="name"
          value={updatedMenu.name || ""}
          onChange={(e) =>
            setUpdatedMenu({ ...updatedMenu, name: e.target.value })
          }
        />
        <TextField
          fullWidth
          id="price"
          label="price"
          type="number"
          value={updatedMenu.price ? updatedMenu.price.toString() : "0"}
          onChange={(e) =>
            setUpdatedMenu({
              ...updatedMenu,
              price: Number(e.target.value) || 0,
            })
          }
          InputProps={{ startAdornment: <AttachMoneyIcon /> }}
          //   helperText="Incorrect entry."
        />
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="description"
          value={updatedMenu.description || ""}
          onChange={(e) =>
            setUpdatedMenu({ ...updatedMenu, description: e.target.value })
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

        <Stack spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
            <Button
              onClick={handleReset}
              variant="outlined"
              disabled={disableEditBtn}
            >
              reset
            </Button>
            <Button type="submit" disabled={disableEditBtn} variant="contained">
              Update
            </Button>
          </Stack>
          <Stack>
            <Button variant="outlined" disabled={false} color="error">
              Delete
            </Button>
          </Stack>
        </Stack>
      </div>
    </Box>
  );
};
export default EditMenu;
