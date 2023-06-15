import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useState } from "react";
import { useBackoffice } from "@/contexts/BackofficeContext";
import MenuCategory from "@/components/menuCategory/MenuCategory";

import Layout from "@/components/Layout";

import type { ShowCatOption } from "@/typings/types";
import DialogBox from "@/components/DialogBox";
import CreateMenuCat from "@/components/CreateMenuCat";

const MenuCategories = () => {
  const { menuCategories, selectedLocationId, locations } = useBackoffice();

  const [showCat, setShowCat] = useState<ShowCatOption>("all");

  const handleChange = (event: SelectChangeEvent) => {
    setShowCat(event.target.value as string as ShowCatOption);
  };
  const menuCategoriesByLocation = menuCategories.filter((menuCategory) =>
    menuCategory.menu_menu_category_location.find(
      (mcatl) => String(mcatl.location_id) === selectedLocationId
    )
  );
  const filterMenuCategoriesWithMenu = menuCategoriesByLocation.filter((mcat) =>
    mcat.menu_menu_category_location.find((mcatl) => mcatl.menu_id !== null)
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ m: 2, alignSelf: "flex-end" }}>
          <DialogBox
            btnText="create menu category"
            title="create menu category"
            width="230px"
          >
            <CreateMenuCat />
          </DialogBox>
        </Box>
        <Box>
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
                <MenuItem value={"available" as ShowCatOption}>
                  available
                </MenuItem>
                <MenuItem value={"notAvailable" as ShowCatOption}>
                  not available
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {showCat === "all"
              ? menuCategoriesByLocation.map((menuCategory) => (
                  <MenuCategory
                    key={menuCategory.id}
                    menuCategory={menuCategory}
                  />
                ))
              : filterMenuCategoriesWithMenu.map((menuCategory) => (
                  <MenuCategory
                    key={menuCategory.id}
                    menuCategory={menuCategory}
                  />
                ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default MenuCategories;
