import { Box, Slide, Typography } from "@mui/material";
import Image from "next/image";
import headerImg from "../assets/wave.svg";
import PandaCooking from "../assets/panda-cooking.png";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 300,
        position: "fixed",
        top: 0,
        zIndex: 5,
      }}
    >
      <Image
        src={headerImg}
        style={{
          width: "100%",
          height: "auto",
          padding: 0,
          margin: 0,
          objectFit: "cover",
        }}
        alt="header-image"
      />
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Box
          sx={{
            position: "absolute",
            right: 0,
            width: { xs: "80%", md: "50%", lg: "30%" },
            display: { xs: "none", md: "block" },
          }}
        >
          <Image
            src={PandaCooking}
            alt="header-image"
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </Box>
      </Slide>
      <Typography
        variant="h2"
        sx={{
          position: "absolute",
          fontWeight: "bold",
          color: "#4C4C6D",
          mt: 4,
        }}
      >
        Foodie POS
      </Typography>
    </Box>
  );
};

export default Header;
