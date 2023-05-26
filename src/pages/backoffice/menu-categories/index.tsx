import { Box, Button, Divider, FormControl, TextField } from "@mui/material";
import { useRef } from "react";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import MenuCategory from "@/components/menuCategory/MenuCategory";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

// const menuCategories = [
//   { id: 1, name: "hot dish" },
//   { id: 2, name: "cold dish" },
//   { id: 3, name: "most popular" },
// ];

const MenuCategories = () => {
  // const [selectedMenuCat, setSelectedMenuCat] = useState<number>(1);

  const nameRef = useRef<any>(null);

  const { menuCategories, menus, menusLocations, menusMenuCategories } =
    useApp();
  const { accessToken, selectedLocationId } = useApp();
  const { fetchData } = useAppUpdate();

  console.log("menu-cat", {
    menuCategories,
    menus,
    menusLocations,
    menusMenuCategories,
    selectedLocationId,
  });

  const munusAtLocation = menusLocations
    .filter((ml) => ml.location_id === Number(selectedLocationId))
    .map((ml) => ml.menu_id);

  const filterMenuCategories = menuCategories.filter((mennuCategory) =>
    munusAtLocation.some((ml) =>
      menusMenuCategories.some(
        (mmc) => mmc.menu_id === ml && mmc.menu_category_id === mennuCategory.id
      )
    )
  );
  console.log("filter menu cat", filterMenuCategories);

  const handleCreateMenuCategory = async () => {
    const name = nameRef.current.value.trim();

    if (!name) {
      return alert("name & price are needed");
    }
    const payload = { name };

    const res = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

    // createMenuCategory({ name }, (error, data) => {
    //   console.log({ error, data });
    // });
  };

  // const menuCategoryItems = menuCategories.map((mcat) => (
  //   <MenuItem key={mcat.id} value={mcat.id}>
  //     {mcat.name}
  //   </MenuItem>
  // ));

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
          inputRef={nameRef}
          label="Name"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleCreateMenuCategory}>
          Create
        </Button>
      </Box>
      <Divider sx={{ m: 2 }} />
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {filterMenuCategories.map((menuCategory) => {
          return (
            <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
          );
        })}
      </Box>
    </Layout>
  );
};

export default MenuCategories;
