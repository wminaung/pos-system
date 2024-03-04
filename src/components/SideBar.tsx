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
import TableBarIcon from "@mui/icons-material/TableBar";
import useAppSlice from "@/store/hook/useAppSlice";

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
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/tables",
  },
  {
    id: 8,
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
  const textColor = theme.text;

  const {
    state: {
      app: { selectedLocationId },
      locations,
    },
  } = useAppSlice();

  const locationName =
    locations.find((locl) => String(locl.id) === selectedLocationId)?.name ||
    "?";

  return (
    <Box
      sx={{ width: 250, borderTopRightRadius: 1 }}
      role="presentation"
      bgcolor={theme.second}
      color={textColor}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* <Avatar src={profileImageUrl} alt="Your Profile" /> */}
              <Avatar
                sx={{ border: `5px solid ${theme.third}` }}
                src={profileImageUrl}
                alt="ok"
                property="true"
              ></Avatar>
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: textColor,
                fontStyle: "oblique",
                fontWeight: "bold !important",
              }}
            >
              {profileName}
              <br />
              {locationName}
            </ListItemText>
          </ListItemButton>
        </ListItem>
        {sidebarMenuItems.slice(0, sidebarMenuItems.length - 1).map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", color: textColor }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: textColor }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: textColor }} />
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
            style={{ textDecoration: "none", color: textColor }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: textColor }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={{ color: textColor }} primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
