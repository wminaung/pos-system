import { theme } from "@/config/myTheme";
import { useOrder } from "@/contexts/OrderContext";
import { AddonCategory } from "@/typings/types";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const OrderMenu = () => {
  const router = useRouter();
  const query = router.query;
  const menuId = Number(query.menuId);
  const { addonCategories, menus } = useOrder();

  const [selectedAddonIds, setSelectedAddonIds] = useState<Array<number>>([]);

  console.warn("selectedAddonIds :", selectedAddonIds);

  const validAddonCats = addonCategories.filter((addonCat) =>
    addonCat.menu_addon_category.find((mac) => mac.menu_id === menuId)
  );

  const showSelection = (addonCat: AddonCategory) => {
    if (addonCat.is_required) {
      return (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e, value) => {
            const allIds = addonCat.addon.map((addon) => addon.id);
            const selectedId = Number(value);
            const nonSelectedId = allIds.filter(
              (allId) => allId !== selectedId
            )[0];

            let isSelected = selectedAddonIds.find((addonId) =>
              allIds.find((allId) => allId === addonId)
            );
            if (isSelected) {
              const newValue = selectedAddonIds.filter(
                (addonId) => nonSelectedId !== addonId
              );
              setSelectedAddonIds([...newValue, selectedId]);
            } else {
              setSelectedAddonIds([...selectedAddonIds, selectedId]);
            }
          }}
        >
          {addonCat.addon.map((addon) => {
            return (
              <FormControlLabel
                key={addon.id}
                value={addon.id}
                control={<Radio />}
                label={addon.name}
              />
            );
          })}
        </RadioGroup>
      ); // Radio end
    } else {
      return (
        <FormGroup>
          {addonCat.addon.map((addon) => {
            return (
              <FormControlLabel
                key={addon.id}
                value={addon.id}
                onChange={(e, checked) => {
                  const { value } = e.target as any;
                  const selectedId = Number(value as string);
                  console.log("checkedbox : ", value, checked);
                  if (checked) {
                    setSelectedAddonIds([...selectedAddonIds, selectedId]);
                  } else {
                    const newValues = selectedAddonIds.filter(
                      (addonId) => addonId !== selectedId
                    );
                    setSelectedAddonIds(newValues);
                  }
                }}
                control={<Checkbox />}
                label={addon.name}
                labelPlacement="end"
              />
            );
          })}
        </FormGroup>
      ); // CheckBox end
    }
  };

  return (
    <Box component={Paper} elevation={3}>
      {validAddonCats.map((addonCat) => {
        return (
          <Box p={2} mb={1} key={addonCat.id}>
            <FormControl fullWidth>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel
                  sx={{ typography: "h4" }}
                  id="demo-radio-buttons-group-label"
                >
                  {addonCat.name}
                </FormLabel>
                <Typography variant="subtitle1" sx={{ color: "red" }}>
                  {addonCat.is_required ? "Required" : "Optional"}{" "}
                </Typography>
              </Box>

              {showSelection(addonCat)}
            </FormControl>

            <Divider />
          </Box>
        );
      })}
      <Button sx={{ m: 2 }} variant="contained">
        Go Next Page
      </Button>
    </Box>
  );
};

export default OrderMenu;
