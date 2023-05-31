import { useEffect, useState } from "react";
import { useBackoffice } from "../contexts/BackofficeContext";
import NavBar from "./NavBar";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { theme } from "@/config/myTheme";

const sidebarMenuItems = [
  {
    id: 1,
    label: "Order",
    icon: <FastfoodIcon />,
    route: "/backoffice/orders",
  },
  {
    id: 2,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 3,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 4,
    label: "Addons",
    icon: <LunchDiningIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 5,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 6,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 7,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];
interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  const data = useBackoffice();
  const { data: session, status } = useSession();
  const profileImageUrl = session?.user?.image || "/test.png";

  const profleName = session?.user?.name || "no-name";
  return (
    <Box>
      <NavBar title={props.title} />
      <Box sx={{ display: "flex" }}>
        {session && (
          <Box sx={{ width: 250 }} role="presentation" bgcolor={theme.main}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {/* <Avatar src={profileImageUrl} alt="Your Profile" /> */}
                    <Avatar src={profileImageUrl} alt="ok"></Avatar>
                  </ListItemIcon>
                  <ListItemText primary={profleName} />
                </ListItemButton>
              </ListItem>
              {sidebarMenuItems
                .slice(0, sidebarMenuItems.length - 1)
                .map((item) => (
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
        )}
        <Box
          sx={{
            p: 3,
            width: "100%",
            overflowY: "auto",
            height: "100vh",
            "&::-webkit-scrollbar": {
              width: "0.4em", // Adjust the width as needed
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent",
            },
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
