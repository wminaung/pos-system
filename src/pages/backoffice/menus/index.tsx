import { Box, Button } from "@mui/material";
import { useBackofficeUpdate } from "@/contexts/BackofficeContext";
import { getAccessToken, getSelectedLocationId } from "@/utils";
import Layout from "@/components/Layout";
import DialogBox from "@/components/DialogBox";
import CreateMenu from "@/components/CreateMenu";
import MenuCard from "@/components/MenuCard";
import { useAppSlice } from "@/store/slices/appSlice";
import { config } from "@/config/config";

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

  const fetchMenu = async () => {
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menus?locationId=${1}`
    );
    const data = await response.json();
    console.log(data, "Data");
  };
  return (
    <Layout title="Menus">
      <Button onClick={fetchMenu}>fetchmenus</Button>
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
