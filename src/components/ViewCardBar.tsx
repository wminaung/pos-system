import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { useClientSlice } from "@/store/slices/clientSlice";

const ViewCartBar = () => {
  const router = useRouter();
  const { locationId, tableId } = router.query;
  const {
    state: { orderlineItems },
  } = useClientSlice();
  const cartText = `You have ${orderlineItems.length} item in cart.`;
  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "lightblue",
          width: "100%",
          py: 2,
          cursor: "pointer",
        }}
      >
        <Box
          onClick={() =>
            router.push({
              pathname: "/order/cart",
              query: {
                locationId,
                tableId,
              },
            })
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
