"use client";
/* eslint-disable @next/next/no-img-element */
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { theme } from "@/config/myTheme";
import { drawerWidth } from "./BackofficeLayout";
import { IconButton, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Footer from "./Footer";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  position?:
    | "fixed"
    | "absolute"
    | "sticky"
    | "static"
    | "relative"
    | undefined;
  open?: boolean | undefined;
  handleDrawerOpen: () => void;
}

const NavBar = ({ open, position, handleDrawerOpen }: Props) => {
  // const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <AppBar elevation={0} position="fixed" open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Stack>
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
          {/* {title} */}
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
  );
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
            {/* {title} */}
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
