import { useClientSlice } from "@/store/slices/clientSlice";
import { Box, Button, Slide, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        mt: "250px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Box>
          <Typography
            sx={{
              maxWidth: 700,
              mb: 4,
              fontSize: { xs: "16px", md: "25px" },
            }}
          >
            Manage your menu catelog easily with Foodie POS and entice your
            customers with QR code ordering system.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                mr: 2,
                width: "fit-content",
                backgroundColor: "#4C4C6D",
              }}
              onClick={() => router.push("/order/app")}
            >
              Order App
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                width: "fit-content",
                backgroundColor: "#4C4C6D",
              }}
              onClick={() => router.push("/backoffice")}
            >
              Backoffice App
            </Button>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default Hero;
