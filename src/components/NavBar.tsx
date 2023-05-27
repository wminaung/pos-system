import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { getAccessToken, getSelectedLocationId } from "@/utils";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const sidebarMenuItems = [
  {
    id: 1,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 2,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 3,
    label: "Addons",
    icon: <LunchDiningIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 4,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 5,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 6,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];

interface Props {
  title?: string;
}

const NavBar = ({ title }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { locations } = useApp();
  const { data: session, status } = useSession();
  const router = useRouter();

  const profileImageUrl = session?.user?.image ?? "";
  const profleName = session?.user?.name ?? "no-name";

  // if (!selectedLocationId || !getAccessToken()) return <h1>ahhaha</h1>;
  const selectedLocationName = "win@local";
  // const selectedLocation = locations.find(
  //   (location) => String(location.id) === selectedLocationId
  // );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const drawerContent = () => {
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar src={profileImageUrl} alt="Your Profile" />
              </ListItemIcon>
              <ListItemText primary={profleName} />
            </ListItemButton>
          </ListItem>
          {sidebarMenuItems.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarMenuItems.slice(-1).map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box>
      <AppBar position="static" color="secondary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              {selectedLocationName ?? ""}
            </Typography>
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {/* <Link
            href={`${status === "authenticated" ? "/logout" : "/login"}`}
            style={{ color: "white" }}
          >  </Link> */}
          <Button
            color="inherit"
            onClick={() => {
              status === "authenticated"
                ? router.push("/auth/logout")
                : router.push("/auth/login");
            }}
          >
            {status === "authenticated" ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {drawerContent()}
      </Drawer>
    </Box>
  );
};

export default NavBar;
