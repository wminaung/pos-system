import NavBar from "./NavBar";

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { theme } from "@/config/myTheme";
import SideBar from "./SideBar";
import Loading from "./Loading";
import useAppSlice from "@/store/hook/useAppSlice";
import Footer from "./Footer";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  const { data: session, status } = useSession();
  const { state } = useAppSlice();

  const profileImageUrl = session?.user?.image || "/test.png";

  const profileName = session?.user?.name || "no-name";
  const isLoading =
    !session ||
    status !== "authenticated" ||
    state.app.isLoading ||
    !state.app.selectedLocationId;
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        top: 0,
        left: 0,
        // "&::-webkit-scrollbar": {
        //   width: "0.4em", // Adjust the width as needed
        // },
        // "&::-webkit-scrollbar-track": {
        //   background: "transparent",
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   background: "transparent",
        // },
      }}
    >
      <NavBar title={props.title} />
      <Box sx={{ display: "flex" }}>
        {session && (
          <SideBar
            profileImageUrl={profileImageUrl}
            profileName={profileName}
          />
        )}
        <Box
          sx={{
            width: "100%",
            p: 0,
            m: 0,
            overflowY: "scroll",
            height: "89vh",
            position: "sticky",
            background: theme.main,
          }}
        >
          {props.children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
