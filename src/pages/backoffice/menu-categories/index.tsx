import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { useState } from "react";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import MenuCategory from "@/components/menuCategory/MenuCategory";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

import type { MenuCategory as MenuCat, ShowCatOption } from "@/typings/types";

const MenuCategories = () => {
  const [menuCat, setMenuCat] = useState({
    name: "",
  } as MenuCat);

  const { menuCategories, menus, menusMenuCategoriesLocations } = useApp();
  const { selectedLocationId } = useApp();
  const { fetchData } = useAppUpdate();

  const [showCat, setShowCat] = useState<ShowCatOption>("all");

  const handleChange = (event: SelectChangeEvent) => {
    setShowCat(event.target.value as string as ShowCatOption);
  };

  const munusAtLocationIds = menusMenuCategoriesLocations
    .filter((ml) => ml.location_id === Number(selectedLocationId))
    .map((ml) => ml.menu_id);

  const filterMenuCategories = menuCategories.filter((mennuCategory) =>
    munusAtLocationIds.some((menuAtlocationId) =>
      menusMenuCategoriesLocations.some(
        (mmc) =>
          mmc.menu_id === menuAtlocationId &&
          mmc.menu_category_id === mennuCategory.id
      )
    )
  );
  const notAvailableMenuCategories = menuCategories.filter(
    (mennuCategory) =>
      !munusAtLocationIds.some((menuAtlocationId) =>
        menusMenuCategoriesLocations.some(
          (mmc) =>
            mmc.menu_id === menuAtlocationId &&
            mmc.menu_category_id === mennuCategory.id
        )
      )
  );

  const handleCreateMenuCategory = async () => {
    const { name } = menuCat;

    if (!name) {
      return alert("name & price are needed");
    }
    const payload = { name };

    const res = await fetch(`${config.backofficeApiBaseUrl}/menuCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.log(await res.json());
      return alert("menu-cat create fail");
    }
    const data = await res.json();
    console.log("create success", data);
    fetchData();
  };

  return (
    <Layout title="Menu Categories">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create a new menu Category</h2>
        <TextField
          value={menuCat.name}
          onChange={(e) => setMenuCat({ ...menuCat, name: e.target.value })}
          label="Name"
          variant="outlined"
          sx={{ mb: 2 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateMenuCategory();
            }
          }}
        />

        <Button variant="contained" onClick={handleCreateMenuCategory}>
          Create
        </Button>
      </Box>
      <Divider sx={{ m: 2 }} />
      <Box sx={{ width: 220, margin: "0 auto" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">show Cat</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={showCat}
            label="show Cat"
            onChange={handleChange}
          >
            <MenuItem value={"all" as ShowCatOption}>show all</MenuItem>
            <MenuItem value={"available" as ShowCatOption}>available</MenuItem>
            <MenuItem value={"notAvailable" as ShowCatOption}>
              not available
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {showCat === "available" ? (
          filterMenuCategories.map((menuCategory) => {
            return (
              <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
            );
          })
        ) : (
          <span></span>
        )}
        {showCat === "all" ? (
          menuCategories.map((menuCategory) => (
            <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
          ))
        ) : (
          <span></span>
        )}
        {showCat === "notAvailable" ? (
          notAvailableMenuCategories.map((menuCategory) => (
            <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
          ))
        ) : (
          <span></span>
        )}
      </Box>
    </Layout>
  );
};

export default MenuCategories;
