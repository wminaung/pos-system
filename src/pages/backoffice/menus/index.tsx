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

  const filteredMenu = menus.filter((menu) =>
    menu.menu_menu_category_location.find(
      (menuMenuCatLocation) =>
        String(menuMenuCatLocation.location_id) === selectedLocationId
    )
  );

  const handleDeleteMenu = async (menuId: number) => {
    if (!window.confirm("Are you sure want to delete!")) return;

    const res = await fetch(`${config.backofficeApiBaseUrl}/menus/${menuId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.log(await res.json());
      return alert("Fail to Delete");
    }
    const resData = await res.json();
    console.log(resData, "resData");
    await fetchData();
  };

  return (
    <Layout title="Menus">
      <Box display={"flex"}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {!filteredMenu.length ? (
            <h3>There is no Menu</h3>
          ) : (
            filteredMenu.map((menu) => (
              <Box
                component={Paper}
                elevation={2}
                sx={{ mx: 2, my: 1 }}
                key={menu.id}
              >
                <MenuCard handleDeleteMenu={handleDeleteMenu} menu={menu} />
              </Box>
            ))
          )}
        </Box>
        <Box>
          <DialogBox btnText="create menu" title="create menu">
            <CreateMenu />
          </DialogBox>
        </Box>
      </Box>
    </Layout>
  );
};

export default MenusPage;
