import { theme } from "@/config/myTheme";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
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
  profileImageUrl: string;
  profileName: string;
}
const SideBar = ({ profileImageUrl, profileName }: Props) => {
  return (
    <Box
      sx={{ width: 250, borderTopRightRadius: 1 }}
      role="presentation"
      bgcolor={theme.main}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* <Avatar src={profileImageUrl} alt="Your Profile" /> */}
              <Avatar
                sx={{ border: `5px solid ${theme.thrid}` }}
                src={profileImageUrl}
                alt="ok"
              ></Avatar>
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: theme.second,
                fontStyle: "oblique",
                fontWeight: "bold !important",
              }}
            >
              {profileName}
            </ListItemText>
          </ListItemButton>
        </ListItem>
        {sidebarMenuItems.slice(0, sidebarMenuItems.length - 1).map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", color: theme.thrid }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: theme.thrid }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ color: theme.thrid }}
                />
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
            style={{ textDecoration: "none", color: theme.thrid }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: theme.thrid }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{ color: theme.thrid }}
                  primary={item.label}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
