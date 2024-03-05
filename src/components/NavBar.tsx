"use client";
/* eslint-disable @next/next/no-img-element */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { theme } from "@/config/myTheme";

interface Props {
  title?: string;
}

const NavBar = ({ title }: Props) => {
  // const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Box minHeight={75}>
      <AppBar
        // position="fixed"
        position="static"
        elevation={0}
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
            variant="outlined"
            size="large"
            onClick={() => {
              // status === "authenticated"
              //   ? router.push("/auth/logout")
              //   : router.push("/auth/login");
            }}
          >
            {/* {status === "authenticated" ? "Logout" : "Login"} */}
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
