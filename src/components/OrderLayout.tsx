import { Box } from "@mui/material";
import { theme } from "@/config/myTheme";

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
