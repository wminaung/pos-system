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
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import Link from "next/link";
import { getAccessToken, getSelectedLocationId } from "@/utils";
import { useEffect, useState } from "react";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

const MenusPage = () => {
  // ******************** ;data.status === "loading"

  const { menus, menusLocations, selectedLocationId, isFetch } = useApp();
  const { fetchData } = useAppUpdate();

  console.log({ menus });
  console.log({ menusLocations, selectedLocationId });
  const validMenusLocations = menusLocations
    .filter(
      (menuLocation) => String(menuLocation.location_id) === selectedLocationId
    )
    .map((menuLocation) => menuLocation.menu_id);
  console.log(
    menusLocations.filter((menuLocation) => {
      console.log(String(menuLocation.location_id), String(selectedLocationId));
      return String(menuLocation.location_id) === String(selectedLocationId);
    })
  );
  const filteredMenu = menus.filter((menu) =>
    validMenusLocations.includes(menu.id as number)
  );

  const handleDeleteMenu = async (menuId: number) => {
    const res = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
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

  if (isFetch) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetch}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Layout title="Menus">
      <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} padding={6}>
        <Link
          href={"/backoffice/menus/create"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box
            sx={{
              my: 1,
              mx: 3,
              width: 245,
              border: "2px dotted  lightgrey",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              userSelect: "none",
              opacity: 1,
              height: "245px",

              ":hover": {
                opacity: 0.8,
              },
              ":active": {
                opacity: 1,
              },
            }}
          >
            <AddIcon fontSize="large" />
            <Typography>Add new dish</Typography>
          </Box>
        </Link>
        {!filteredMenu.length ? (
          <h3>There is no Menu</h3>
        ) : (
          filteredMenu.map((menu) => (
            <Box sx={{ mx: 3, my: 1 }} key={menu.id}>
              <Card sx={{ width: 245, zIndex: 1, bgcolor: "#c490e272" }}>
                <CardActionArea
                  component={Link}
                  href={`/backoffice/menus/${menu.id}`}
                  passHref
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${menu.image_url ?? "/paella.jpg"}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {menu.name} / {menu.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {menu.description.slice(0, 50)}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions
                  onClick={() => menu.id && handleDeleteMenu(menu.id)}
                  sx={{
                    zIndex: 999,
                    display: "flex",
                    justifyContent: "center",
                    bgcolor: "#a85cd376",
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                >
                  Delete Dish
                </CardActions>
              </Card>
            </Box>
          ))
        )}
      </Box>
    </Layout>
  );
};

export default MenusPage;
