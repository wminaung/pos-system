import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { MenuCategory } from "@/typings/types";
import { config } from "@/config/config";
import { LoadingButton } from "@mui/lab";
import { location } from "@prisma/client";
import { useAppSlice } from "@/store/slices/appSlice";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const defaultMenuCat = { name: "" } as MenuCategory;

////***** */
const CreateMenuCat = () => {
  ////***** */
  const [menuCat, setMenuCat] = useState<MenuCategory>(defaultMenuCat);
  const [selectedLocations, setSelectedLocations] = useState<location[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    state: {
      locations,
      app: { selectedLocationId },
    },
    actions,
    dispatch,
  } = useAppSlice();

  useEffect(() => {
    selectedLocationId &&
      setSelectedLocations([
        locations.find(
          (location) => selectedLocationId === String(location.id)
        ) as location,
      ]);
  }, [selectedLocationId]);

  if (!selectedLocationId) {
    return <span>Selected Location Id is missing</span>;
  }
  const handleCreateMenuCategory = async () => {
    const { name } = menuCat;
    setLoading(true);
    if (!name) {
      setLoading(false);
      return alert("name  are needed");
    }

    const payload = { name, selectedLocations };

    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories?locationId=${selectedLocationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.log(await res.json());
      setLoading(false);
      return alert("menu-cat create fail");
    }
    const data = (await res.json()) as MenuCategory;

    dispatch(actions.fetchAppData(selectedLocationId as string));

    setLoading(false);
    setMenuCat({ ...defaultMenuCat });
  };
  const isDisabled = !menuCat.name;

  const handleChange = (e: SelectChangeEvent<number[]>) => {
    const newIds = e.target.value as number[];
    const newSelectedLocations = locations.filter((location) =>
      newIds.find((newId) => newId === location.id)
    ) as location[];
    setSelectedLocations(newSelectedLocations);
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          m: "0 auto",
        }}
      >
        <TextField
          type="text"
          value={menuCat.name}
          onChange={(e) => setMenuCat({ ...menuCat, name: e.target.value })}
          label="Name"
          variant="outlined"
          sx={{ mb: 2 }}
          autoFocus
          focused
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateMenuCategory();
            }
          }}
        />{" "}
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id="demo-multiple-chip-label">Menu Category</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            onChange={handleChange}
            value={selectedLocations.map((sl) => sl.id)}
            input={
              <OutlinedInput id="select-multiple-chip" label="Locations" />
            }
            renderValue={(selectedIds) => {
              const selected = selectedIds.map((selectedId) =>
                locations.find((location) => location.id === selectedId)
              ) as location[];

              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((select) => (
                    <Chip key={select.id} label={select.name} />
                  ))}
                </Box>
              );
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                },
              },
            }}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name} {location.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoadingButton
          sx={{ mt: 2 }}
          autoFocus
          color="secondary"
          size="large"
          onClick={handleCreateMenuCategory}
          loading={loading}
          variant="contained"
          disabled={isDisabled}
        >
          <span>create</span>
        </LoadingButton>
      </Box>
    </div>
  );
};

export default CreateMenuCat;
