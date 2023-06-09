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
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { OrderStatus } from "@prisma/client";
import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import { Addon, AddonCategory } from "@/typings/types";
import { config } from "@/config/config";
import { ChangeStatusPayload } from "@/pages/api/backoffice/order/changeStatus";

interface Props {
  validMenu: {
    id: number;
    orderlineItemId: string;
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
  const { fetchData } = useBackofficeUpdate();

  const handleStatusChange = async (e: SelectChangeEvent<OrderStatus>) => {
    const value = e.target.value as OrderStatus;
    setStatus(value);
    /// orderId menuId orderlineItemId>string
    const orderlineItemId = validMenu.orderlineItemId;
    const orderId = validMenu.orderId;
    const menuId = validMenu.menuId;
    const status = value;

    const isValid = orderlineItemId && orderId && menuId && status;

    if (!isValid) {
      return alert("Something wroung Please check ");
    }

    const payload: ChangeStatusPayload = {
      orderlineItemId,
      menuId,
      orderId,
      status,
    };
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/order/changeStatus`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      console.log(await res.json());
      return await fetchData();
    } else {
      return alert("fetch fail");
    }
  };

  useEffect(() => {
    if (validMenu.status) {
      setStatus(validMenu.status);
    }
  }, [validMenu.status]);

  const menu = menus.find((menu) => menu.id === validMenu.menuId);

  if (!menu) {
    return null;
  }

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
                <Box key={item.addonCat.id}>
                  <Typography variant="subtitle1" fontWeight={"bolder"}>
                    {item.addonCat.name}
                  </Typography>
                  {item.addons.map((addon) => (
                    <Box key={addon.id}>
                      <Typography sx={{ pl: 3 }} variant="subtitle2">
                        {addon.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
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
                onChange={(e) => handleStatusChange(e)}
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
