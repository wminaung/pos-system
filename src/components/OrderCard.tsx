import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useState } from "react";
import { OrderStatus } from "@prisma/client";
import { useBackoffice } from "@/contexts/BackofficeContext";
import { Addon, AddonCategory } from "@/typings/types";

interface Props {
  validMenu: {
    orderId: number;
    menuId: number;
    addonIds: (number | null)[];
    status: OrderStatus;
    quantity: number;
  };
}

const OrderCard = ({ validMenu }: Props) => {
  const [status, setStatus] = useState<OrderStatus>("PENDING");
  const { menus, addons, addonCategories } = useBackoffice();

  const handleStatusChange = () => {};
  console.log("validMenussssssssss", validMenu);

  const menu = menus.find((menu) => menu.id === validMenu.menuId);
  const addonCatIds = validMenu.addonIds.map((addonId) => {
    const addon = addons.find((addon) => addon.id === addonId) as Addon;
    return addon.addon_category_id;
  });
  console.log("addonCatIds", addonCatIds);
  const validAddonCatIds = [...new Set(addonCatIds)];

  const validAddonsByAddonCat = validAddonCatIds.map((addonCatId) => {
    const validAddons = addons.filter((addon) =>
      validMenu.addonIds.includes(addon.id)
    );
    const validAddonCat = addonCategories.find(
      (addonCat) => addonCat.id === addonCatId
    ) as AddonCategory;

    const addonsByAddonCat = validAddons.filter(
      (addon) => addon.addon_category_id === addonCatId
    );

    return {
      addonCat: validAddonCat,
      addons: addonsByAddonCat,
    };
  });
  console.log("validAddonsByAddonCat", validAddonsByAddonCat);

  const card = (
    <>
      <Card elevation={6} sx={{ width: 325, m: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" color="text.main" gutterBottom>
              {menu?.name}
            </Typography>{" "}
            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#1B9C85",
                borderRadius: "50%",
                width: 30,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              {validMenu.quantity}
            </Typography>
          </Box>
          <Divider />
          <Box
            component={Paper}
            elevation={0}
            sx={{
              px: 1,
              height: 120,
              overflowY: "auto",
              backgroundColor: "whitesmoke",
            }}
          >
            {validAddonsByAddonCat.map((item) => {
              return (
                <>
                  <Typography variant="subtitle1" fontWeight={"bolder"}>
                    {item.addonCat.name}
                  </Typography>
                  {item.addons.map((addon) => (
                    <>
                      <Typography sx={{ pl: 3 }} variant="subtitle2">
                        {addon.name}
                      </Typography>
                    </>
                  ))}
                </>
              );
            })}
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Age"
                onChange={handleStatusChange}
              >
                {Object.values(OrderStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </>
  );
  return <Box>{card}</Box>;
};

export default OrderCard;
