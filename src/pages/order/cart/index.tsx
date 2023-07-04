import { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useOrder } from "@/contexts/OrderContext";
import { config } from "@/config/config";
import { useRouter } from "next/router";

const OrderPage = () => {
  const { orderlineItems, updateData, fetchData } = useOrder();
  const data = useOrder();

  const router = useRouter();

  const query = router.query;

  if (!query.locationId || !query.tableId || !orderlineItems.length) {
    return null;
  }

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    orderlineId: string
  ) => {
    const updatedOrderlines = orderlineItems.map((orderline) => {
      if (orderline.id === orderlineId) {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity >= 1) {
          return { ...orderline, quantity: newQuantity };
        } else {
          return { ...orderline, quantity: 1 };
        }
      }
      return orderline;
    });

    updateData({ ...data, orderlineItems: updatedOrderlines });
  };

  const handleRemoveMenu = (orderlineId: string) => {
    const updateOrderline = orderlineItems.filter(
      (orderline) => orderline.id !== orderlineId
    );

    updateData({ ...data, orderlineItems: [...updateOrderline] });
  };

  const handleConfirmOrder = async () => {
    const payload = { orderlineItems };

    const res = await fetch(
      `${config.orderApiBaseUrl}/location/${query.locationId}/table/${query.tableId}`,
      {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (res.ok) {
      updateData({ ...data, orderlineItems: [] });

      await router.push({
        pathname: `/order/review`,
        query: { locationId: query.locationId, tableId: query.tableId },
      });
    } else {
      alert("some wierjjaf");
    }
  };

  return (
    <Box component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Menu</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderlineItems.map((orderline) => {
            const { id: orderlineId, menu, quantity, addons } = orderline;
            const addonPrice = !addons
              ? 0
              : addons.reduce(
                  (previousValue, currentAddon) =>
                    previousValue + currentAddon.price,
                  0
                );
            console.log("addonPrice", addonPrice);
            return (
              <TableRow key={orderline.id}>
                <TableCell>{menu.name}</TableCell>
                <TableCell>{(menu.price + addonPrice) * quantity} </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e, orderlineId)}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleRemoveMenu(orderlineId)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Card sx={{ p: 2 }}>
        <Button
          sx={{ float: "right" }}
          onClick={handleConfirmOrder}
          variant="contained"
          color="primary"
        >
          Confirm Order
        </Button>
      </Card>
    </Box>
  );
};

export default OrderPage;
