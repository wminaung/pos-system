import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const POS_MainPage = () => {
  const { data } = useSession();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflowY: "auto",
        flexDirection: "column",
      }}
    >
      hello world
    </Box>
  );
};

export default POS_MainPage;
