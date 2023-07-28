import {
  Box,
  Button,
  Chip,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { config } from "@/config/config";
import { location } from "@prisma/client";
import { selectMuiStyle } from "@/utils";
import { Payload } from "@/typings/types";
import ShowMenus from "@/components/menuCategory/ShowMenus";
import { theme } from "@/config/myTheme";
import { useAppSlice } from "@/store/slices/appSlice";

const { ITEM_HEIGHT, ITEM_PADDING_TOP } = selectMuiStyle;

const MenuCategoryDetail = () => {
  //********************* */

  const [menuCat, setMenuCat] = useState<Payload.MenuCategory.Update>(
    {} as Payload.MenuCategory.Update
  );
  const [oldMenuCat, setOldMenuCat] = useState(
    {} as Payload.MenuCategory.Update
  );

  const {
    state: {
      menuCategories,
      locations,
      menus,
      app: { selectedLocationId },
    },
    actions,
    dispatch,
  } = useAppSlice();

  const router = useRouter();
  const { id: menuCategoryIdStr } = router.query;

  const menuCategoryId = parseInt(menuCategoryIdStr as string, 10);

  const menuCategory = menuCategories.find(
    (menuCategory) => menuCategory.id === menuCategoryId
  );

  // useEffect(() => {
  //   selectedLocationId &&
  //     console.log(oldMenuCat, "****************************");
  // }, [selectedLocationId]);
  useEffect(() => {
    if (menuCategory) {
      const defaultLocations = locations.filter((location) =>
        menuCategory.menu_menu_category_location.find(
          (mmcl) => mmcl.location_id === location.id
        )
      );
      setMenuCat({
        ...menuCat,
        name: menuCategory.name,
        selectedLocations: defaultLocations,
      });
      setOldMenuCat({
        ...menuCat,
        name: menuCategory.name,
        selectedLocations: defaultLocations,
      });
    }
  }, [menuCategory]);

  if (!menuCategory || !menuCat.selectedLocations) return null;

  const handeleUpdateMenuCategory = async () => {
    const { name, selectedLocations } = menuCat;

    if (!name || !selectedLocations.length) {
      return alert("put all feild");
    }

    const payload = { name, selectedLocations };
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories/${menuCategoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      console.log(await res.json());
      return alert("you can't update this mcat");
    }
    console.log(await res.json());
    dispatch(actions.fetchAppData(selectedLocationId as string));
  };

  const handleDeleteMenuCategory = async () => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories/${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      console.log(await res.json());
      return alert("you can't delete this mcat");
    }
    console.log(await res.json());
    // todo some
    router.push("/backoffice/menu-categories");
  };

  const handleChange = (e: SelectChangeEvent<number[]>) => {
    const newIds = e.target.value as number[];
    setMenuCat({
      ...menuCat,
      selectedLocations: locations.filter((location) =>
        newIds.find((newId) => newId === location.id)
      ),
    });
  };

  return (
    <Layout title="Edit Menu Category">
      <Box
        component={Paper}
        elevation={3}
        p={3}
        bgcolor={theme.second}
        display={"flex"}
        flexDirection={"column"}
        width={500}
        margin={"0 auto"}
        mt={3}
      >
        <FormLabel sx={{ mb: 3 }}>Edit Menu Category</FormLabel>

        <TextField
          value={menuCat.name}
          onChange={(e) => setMenuCat({ ...menuCat, name: e.target.value })}
          label="Name"
          type="text"
          variant="outlined"
          focused
          autoFocus
          sx={{ mb: 2 }}
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id="demo-multiple-chip-label">Locations</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            onChange={handleChange}
            value={menuCat.selectedLocations.map((sl) => sl.id)}
            input={
              <OutlinedInput id="select-multiple-chip" label="Locations" />
            }
            renderValue={(selectedIds) => {
              const selected = selectedIds.map((selectedId) =>
                locations.find((location) => location.id === selectedId)
              ) as location[];

              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((select) => (
                    <Chip key={select.id} label={select.name} />
                  ))}
                </Box>
              );
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                },
              },
            }}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name} {location.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handeleUpdateMenuCategory}>
          Update
        </Button>
        {/* <Button
          sx={{
            mt: 3,
          }}
          variant="outlined"
          onClick={handleDeleteMenuCategory}
        >
          Delete
        </Button> */}
      </Box>
      <ShowMenus menus={menus} menuCategory={menuCategory} />
    </Layout>
  );
};

export default MenuCategoryDetail;
