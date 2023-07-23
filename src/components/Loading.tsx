import CircularProgress from "@mui/material/CircularProgress";

import Layout from "./Layout";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "80%",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
export default Loading;
