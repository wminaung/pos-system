import { Box } from "@mui/material";

import Layout from "@/components/Layout";
import DialogBox from "@/components/DialogBox";
import CreateMenu from "@/components/CreateMenu";
import MenuCard from "@/components/MenuCard";
import { useAppSlice } from "@/store/slices/appSlice";

const MenusPage = () => {
  // ******************** ;data.status === "loading"

  const {
    state: {
      app: { selectedLocationId },
      menus,
    },
    actions,
    dispatch,
  } = useAppSlice();

  const validMenus = menus.filter((menu) =>
    menu.menu_menu_category_location.find(
      (menuMenuCatLocation) =>
        String(menuMenuCatLocation.location_id) === selectedLocationId
    )
  );

  return (
    <Layout title="Menus">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ m: 2, alignSelf: "flex-end" }}>
          <DialogBox btnText="create menu" title="create menu" width="137px">
            <CreateMenu />
          </DialogBox>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {validMenus
            .filter((menu) => !menu.is_archived)
            .map((menu) => {
              return (
                <MenuCard
                  key={menu.id}
                  href={`/backoffice/menus/${menu.id}`}
                  menu={menu}
                />
              );
            })}
        </Box>
      </Box>
    </Layout>
  );
};

export default MenusPage;
