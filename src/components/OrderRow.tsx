import {
  Box,
  Collapse,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Menu, Order } from "@/typings/types";
import { useOrder } from "@/contexts/OrderContext";
import { useBackoffice } from "@/contexts/BackofficeContext";
import MenuCard from "./MenuCard";
import { orderline } from "@prisma/client";
import OrderCard from "./OrderCard";

interface Props {
  order: Order;
}
const OrderRow = ({ order }: Props) => {
  const [open, setOpen] = useState(false);

  const { orderlines } = useBackoffice();

  const validOrderlines = order.orderline;

  const getValidMenusAndAddons = () => {
    const orderlineItemIds = [
      ...new Set(
        validOrderlines.map((orderline) => orderline.orderlineItem_id)
      ),
    ];
    const orderlineItems = orderlineItemIds.map((orderlineItemId) => {
      return validOrderlines.find(
        (orderline) => orderline.orderlineItem_id === orderlineItemId
      ) as orderline;
    });
    console.log("orderlineItems", orderlineItems);

    const validMenus = orderlineItems.map((orderlineItem) => {
      const orderlineItemId = orderlineItem.orderlineItem_id;
      const orderId = orderlineItem.order_id;
      const menuId = orderlineItem.menu_id;

      const addonIds = orderlines
        .filter((orderline) => orderline.orderlineItem_id === orderlineItemId)
        .map((orderline) => orderline.addon_id);

      return {
        id: orderlineItem.id,
        orderlineItemId,
        orderId,
        menuId,
        addonIds,
        status: orderlineItem.status,
        quantity: orderlineItem.quantity,
      };
    });

    return validMenus.sort((a, b) => a.id - b.id);
  };

  console.log(getValidMenusAndAddons(), "vvvvvvvvvasdfsafsfvvv");

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell align="right">{order.orderline.length}</TableCell>
        <TableCell align="right">{order.table_id}</TableCell>
        <TableCell align="right">{order.price}</TableCell>
        <TableCell align="right">{"sf"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              {/* //todo give order  <OrderCard /> /*/}
              {getValidMenusAndAddons().map((validMenu) => {
                return <OrderCard key={validMenu.id} validMenu={validMenu} />;
              })}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
