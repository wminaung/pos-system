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
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { theme } from "@/config/myTheme";
import Image from "next/image";
import SideBar from "./SideBar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = (props: Props) => {
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            p: 3,
            width: "100%",
            overflowY: "auto",
            height: "100vh",
            background: theme.main,
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

export default OrderLayout;
