import NavBar from "./NavBar";

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { theme } from "@/config/myTheme";
import SideBar from "./SideBar";
import Loading from "./Loading";
import { useAppSlice } from "@/store/slices/appSlice";

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
    <Box>
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
          {isLoading ? <Loading /> : props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
