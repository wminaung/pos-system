import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import type { MenuCategory, ShowCatOption } from "@/typings/types";
import { config } from "@/config/config";
import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import { LoadingButton } from "@mui/lab";

const defaultMenuCat = { name: "" } as MenuCategory;
const CreateMenuCat = () => {
  const [menuCat, setMenuCat] = useState<MenuCategory>(defaultMenuCat);
  const [loading, setLoading] = useState(false);
  const { fetchData } = useBackofficeUpdate();
  const { selectedLocationId } = useBackoffice();

  const handleCreateMenuCategory = async () => {
    const { name } = menuCat;
    setLoading(true);
    if (!name) {
      setLoading(false);
      return alert("name  are needed");
    }

    const payload = { name };

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
    const data = await res.json();
    console.log("create success", data);
    setLoading(false);
    setMenuCat({ ...defaultMenuCat });
    fetchData();
  };
  const isDisabled = !menuCat.name;

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
        />

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
