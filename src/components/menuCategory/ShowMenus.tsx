import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuCard from "../MenuCard";
import { Menu, MenuCategory } from "@/typings/types";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import { config } from "@/config/config";
import { fetchData } from "next-auth/client/_utils";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  menus: Menu[];
  menuCategory: MenuCategory;
}
const ShowMenus = ({ menus, menuCategory }: Props) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  // location 1, menucat 1 ,
  const { selectedLocationId } = useBackoffice();
  const { fetchData } = useBackofficeUpdate();

  const validMenuIds = menuCategory.menu_menu_category_location
    .filter((mmcl) => String(mmcl.location_id) === selectedLocationId)
    .map((mmcl) => mmcl.menu_id);

  const validMenus = menus.filter((menu) =>
    menu.menu_menu_category_location.find(
      (mmcl) =>
        validMenuIds.includes(mmcl.menu_id) &&
        String(mmcl.location_id) === selectedLocationId
    )
  );

  const addMenuToMenuCategory = async () => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories/addMenu`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuCategoryId: menuCategory.id,
          menuId: selectedMenu && selectedMenu.id,
          locationId: Number(selectedLocationId),
        }),
      }
    );
    if (res.ok) {
      console.log(await res.json());
    } else {
      alert("nope ");
    }
    fetchData();
    setSelectedMenu(null);
  };
  const handleRemoveMenu = async (menuId: number) => {
    if (!menuId || !Number(selectedLocationId) || !menuCategory.id) {
      return alert("Someting wrong");
    }

    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories/removeMenu`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          menuId,
          locationId: Number(selectedLocationId),
          menuCategoryId: menuCategory.id,
        }),
      }
    );
    if (res.ok) {
      fetchData();
      console.log(await res.json());
    } else {
      alert("check err");
    }
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Autocomplete
          sx={{ minWidth: 300, mr: 3 }}
          value={selectedMenu}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(evt, value) => {
            setSelectedMenu(value);
          }}
          clearOnBlur
          options={menus
            .filter((menu) => !validMenuIds.includes(menu.id))
            .map((menu) => menu)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add menu to this category"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Button variant="contained" onClick={addMenuToMenuCategory}>
          Add
        </Button>
      </Box>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {validMenus.map((menu) => {
          return (
            <MenuCard
              menu={menu}
              href={`/backoffice/menus/${menu.id}`}
              key={menu.id}
              handleRemoveMenu={handleRemoveMenu}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ShowMenus;

// export const getMenusByMenuCategoryId = (
//     menus: Menu[],
//     menuCategoryId: string,
//     menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
//   ) => {
//     const selectedLocationId = getselectedLocationId() as string;
//     const validMenuIds = menusMenuCategoriesLocations
//       .filter(
//         (item) =>
//           item.menus_id &&
//           item.menu_categories_id === Number(menuCategoryId) &&
//           item.locations_id === Number(selectedLocationId)
//       )
//       .map((item) => item.menus_id);
//     return menus.filter((item) => validMenuIds.includes(item.id));
//   };
