import { Autocomplete, Box, Button, Checkbox, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { config } from "@/config/config";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CreateMenuCat {
  name: string;
}
const MenuCategoryDetail = () => {
  //********************* */
  const [menuCat, setMenuCat] = useState({
    name: "",
  } as CreateMenuCat);
  const [oldMenuCat, setOldMenuCat] = useState({
    name: "",
  } as CreateMenuCat);
  const { menuCategories, locations } = useBackoffice();
  const { fetchData } = useBackofficeUpdate();

  const router = useRouter();
  const { id: menuCategoryIdStr } = router.query;

  const menuCategoryId = parseInt(menuCategoryIdStr as string, 10);

  const menuCategory = menuCategories.find(
    (menuCategory) => menuCategory.id === menuCategoryId
  );

  useEffect(() => {
    if (menuCategory) {
      setMenuCat({
        ...menuCat,
        name: menuCategory.name,
      });
      setOldMenuCat({
        ...menuCat,
        name: menuCategory.name,
      });
    }
  }, [menuCategory]);
  console.log("mcat", menuCat);

  if (!menuCategory) return null;

  const handeleUpdateMenuCategory = async () => {
    const { name } = menuCat;

    if (!name) {
      return alert("put all feild");
    }

    const payload = { name };
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
    await fetchData();
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
    await fetchData();
    router.push("/backoffice/menu-categories");
  };

  return (
    <Layout title="Edit Menu Category">
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={500}
        margin={"0 auto"}
        mt={5}
      >
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
        {/* <Autocomplete
          sx={{ my: 2 }}
          multiple
          id="checkboxes-tags-demo"
          options={locationsOption}
          disableCloseOnSelect
          onChange={(e, values) => {
            const selectedIds = values.map((value) => value.id);
            setMenuCat({ ...menuCat, locationIds: selectedIds });
          }}
          value={locationsOption.filter((locationOption) =>
            menuCat.locationIds.find(
              (mCatLocatinId) => mCatLocatinId === locationOption.id
            )
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Locations" placeholder="Favorites" />
          )}
        /> */}
        <Button variant="contained" onClick={handeleUpdateMenuCategory}>
          Update
        </Button>
        <Button
          sx={{
            mt: 3,
          }}
          variant="outlined"
          onClick={handleDeleteMenuCategory}
        >
          Delete
        </Button>
      </Box>
    </Layout>
  );
};

export default MenuCategoryDetail;
