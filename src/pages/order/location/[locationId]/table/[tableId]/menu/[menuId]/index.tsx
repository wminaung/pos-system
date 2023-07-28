import QuantitySelector from "@/components/QuantitySelector";
import ViewCartBar from "@/components/ViewCardBar";
import { theme } from "@/config/myTheme";

import { useClientSlice } from "@/store/slices/clientSlice";
import { AddonCategory } from "@/typings/types";
import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import React, { useEffect, useState } from "react";

enum CounterType {
  INCREASE,
  DECREASE,
}

const OrderMenu = () => {
  const [selectedAddonIds, setSelectedAddonIds] = useState<Array<number>>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [menuCount, setMenuCount] = useState(1);

  const router = useRouter();
  const query = router.query;
  const menuId = Number(query.menuId);

  const {
    state: { addonCategories, menus, addons, orderlineItems },
    dispatch,
    actions,
  } = useClientSlice();

  console.warn("selectedAddonIds :", selectedAddonIds);

  const validAddonCats = addonCategories.filter((addonCat) =>
    addonCat.menu_addon_category.find((mac) => mac.menu_id === menuId)
  );
  const menu = menus.find((menu) => menu.id === menuId);
  useEffect(() => {
    if (validAddonCats && selectedAddonIds.length) {
      const requiredAddonCat = validAddonCats.filter(
        (addonCat) => addonCat.is_required
      );

      const requiredAddonsIds = requiredAddonCat.map((addonCat) =>
        addonCat.addon.map((addon) => addon.id)
      );
      console.log("req id", requiredAddonsIds);

      const shouldDisabled = !requiredAddonsIds.every((requriedAddonIds) => {
        const shouldDisabled = requriedAddonIds.find((addonId) =>
          selectedAddonIds.some((selectAddonId) => selectAddonId === addonId)
        );

        return shouldDisabled;
      });
      setIsDisabled(shouldDisabled);
    } else {
      const requiredAddonCat = validAddonCats.filter(
        (addonCat) => addonCat.is_required
      );
      if (!requiredAddonCat.length) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [selectedAddonIds, validAddonCats]);

  const showSelection = (addonCat: AddonCategory) => {
    if (addonCat.is_required) {
      return (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e, value) => {
            const allIds = addonCat.addon.map((addon) => addon.id);
            const selectedId = Number(value);
            const newValues = selectedAddonIds.filter(
              (selectId) => !allIds.find((allId) => allId === selectId)
            );
            console.log(newValues, "newValue");
            setSelectedAddonIds([...newValues, selectedId]);
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
  console.warn(isDisabled, { query });

  const handleIncreaseDecrease = (type: CounterType) => {
    if (type === CounterType.DECREASE) {
      if (menuCount - 1 < 1) {
        setMenuCount(1);
        return;
      }
      setMenuCount(menuCount - 1);
    } else if (type === CounterType.INCREASE) {
      setMenuCount(menuCount + 1);
    } else {
      console.warn("please insert counter type");
    }
  };
  console.log(menuCount, "menu count");

  if (!menu) {
    return null;
  }
  console.log({ orderlineItems });
  // TODO - addToCart
  const addToCart = async () => {
    const orderlineItemToAdd = {
      id: String(Date.now()),
      menu,
      quantity: menuCount,
      addons: addons.filter((addon) => selectedAddonIds.includes(addon.id)),
    };
    dispatch(actions.addOrderLineItem(orderlineItemToAdd));

    await router.push({
      pathname: "/order/location/[locationId]/table/[tableId]",
      query: {
        locationId: query.locationId,
        tableId: query.tableId,
      },
    });
  };
  return (
    <Box component={Paper} elevation={3}>
      <Typography textAlign={"center"} py={1} variant="h3">
        {menu.name}
      </Typography>
      <Divider />

      {validAddonCats.map((addonCat) => {
        return (
          <Box p={2} py={1} key={addonCat.id}>
            <FormControl fullWidth>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel
                  sx={{ typography: "h4" }}
                  id="demo-radio-buttons-group-label"
                >
                  {addonCat.name}
                </FormLabel>
                <Box sx={{ color: "red" }}>
                  <Chip
                    label={addonCat.is_required ? "Required" : "Optional"}
                    color={addonCat.is_required ? "error" : "default"}
                    size="small"
                  />
                </Box>
              </Box>

              {showSelection(addonCat)}
            </FormControl>

            <Divider />
          </Box>
        );
      })}

      <QuantitySelector
        onDecrease={() => handleIncreaseDecrease(CounterType.DECREASE)}
        onIncrease={() => handleIncreaseDecrease(CounterType.INCREASE)}
        value={menuCount}
      />
      <Button
        disabled={isDisabled}
        sx={{ m: 2 }}
        onClick={addToCart}
        variant="contained"
      >
        Add To Cart
      </Button>
      <ViewCartBar />
    </Box>
  );
};

export default OrderMenu;
