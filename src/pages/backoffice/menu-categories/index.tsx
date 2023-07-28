import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import DialogBox from "@/components/DialogBox";
import CreateMenuCat from "@/components/CreateMenuCat";
import { useAppSlice } from "@/store/slices/appSlice";
import ItemCard from "@/components/ItemCard";
import { CategoryIcon } from "@/components/icon";
import { theme } from "@/config/myTheme";

const MenuCategories = () => {
  const {
    state: {
      menuCategories,
      app: { selectedLocationId },
    },
    actions,
    dispatch,
  } = useAppSlice();

  const menuCategoriesByLocation = menuCategories.filter((menuCategory) =>
    menuCategory.menu_menu_category_location.find(
      (mcatl) => String(mcatl.location_id) === selectedLocationId
    )
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* {menuCategoriesByLocation.map((menuCategory) => (
              <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
            ))} */}
            {menuCategoriesByLocation.map((menuCategory) => (
              <ItemCard
                icon={
                  <CategoryIcon
                    sx={{ fontSize: 50, color: theme.text, p: 2 }}
                  />
                }
                title={menuCategory.name}
                href={`/backoffice/menu-categories/${menuCategory.id}`}
                key={menuCategory.id}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default MenuCategories;
