import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useOrder } from "@/contexts/OrderContext";

const ViewCartBar = () => {
  const router = useRouter();
  const { orderlines } = useOrder();
  const cartText = `You have ${orderlines.length} item in cart.`;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "lightblue",
          width: "100%",
          py: 2,
          cursor: "pointer",
        }}
      >
        <Box
          onClick={() =>
            router.push({ pathname: "/order/cart", query: router.query })
          }
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ShoppingCartCheckoutIcon sx={{ fontSize: "40px", color: "blue" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", color: "green" }}
          >
            {cartText}`
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewCartBar;
