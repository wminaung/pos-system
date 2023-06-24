import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import Link from "next/link";
import { getAccessToken, getSelectedLocationId } from "@/utils";
import { useEffect, useState } from "react";
import { config } from "@/config/config";
import Layout from "@/components/Layout";
import DialogBox from "@/components/DialogBox";
import CreateMenu from "@/components/CreateMenu";
import { theme } from "@/config/myTheme";
import MenuCard from "@/components/MenuCard";

const MenusPage = () => {
  // ******************** ;data.status === "loading"

  const { menus, selectedLocationId } = useBackoffice();
  const { fetchData } = useBackofficeUpdate();

  const validMenus = menus.filter((menu) =>
    menu.menu_menu_category_location.find(
      (menuMenuCatLocation) =>
        String(menuMenuCatLocation.location_id) === selectedLocationId
    )
  );

  return (
    <Layout title="Menus">
      {/* <Box>
        <Button onClick={deleteTest}>Delete</Button>
      </Box> */}
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
