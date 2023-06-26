import React, { useState } from "react";
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

const OrderPage = () => {
  const { orderlines } = useOrder();
  const [items, setItems] = useState([
    { id: 1, name: "Product 1", price: 10, quantity: 1 },
    { id: 2, name: "Product 2", price: 15, quantity: 2 },
    { id: 3, name: "Product 3", price: 20, quantity: 3 },
  ]);

  const handleQuantityChange = (event: any, itemId: any) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: event.target.value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleRemoveItem = (itemId: any) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <Box component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderlines.map((orderline) => (
            <TableRow key={orderline.menu.id}>
              <TableCell>{orderline.menu.name}</TableCell>
              <TableCell>{orderline.menu.price}</TableCell>
              <TableCell>
                <TextField type="number" value={orderline.quantity} />
              </TableCell>
              <TableCell>
                <Button>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Card>
        <Typography variant="h5">Order Summary</Typography>
        <Typography>Total: 200</Typography>
        <Button variant="contained" color="primary">
          Confirm Order
        </Button>
      </Card>
    </Box>
  );
};

export default OrderPage;
