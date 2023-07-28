/* eslint-disable @next/next/no-img-element */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { theme } from "@/config/myTheme";
import { config } from "@/config/config";
import { useAppSlice } from "@/store/slices/appSlice";

interface Props {
  title?: string;
}

const NavBar = ({ title }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.second, color: theme.text }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <img
              width={280}
              height={280}
              src={`/logo_transparent.png`}
              alt="happy_pos_logo"
              style={{ width: "80px", height: "80px" }}
            />
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
            size="large"
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
    </Box>
  );
};

export default NavBar;
