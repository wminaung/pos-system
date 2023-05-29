import {
  Box,
  TextField,
  Checkbox,
  Button,
  Autocomplete,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  LinearProgress,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { useApp, useAppUpdate } from "@/contexts/AppContext";
import Alertor from "@/components/Alertor";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

const AddonDetail = () => {
  // ********************************

  const { addons, addonCategories } = useApp();
  const { fetchData } = useAppUpdate();

  const router = useRouter();

  const [selectedId, setSelectedId] = useState<number>(0);
  const [isChecked, setIsChecked] = useState(true);

  const { id: addonIdStr } = router.query;
  const addonId = parseInt(addonIdStr as string, 10);
  const nameRef = useRef<any>(null);
  const priceRef = useRef<any>(null);

  const handleUpdateAddon = async () => {
    const name = nameRef.current.value.trim();
    const price = parseInt(priceRef.current.value, 10);
    if (!name || price < 0) {
      return alert("name & price are needed");
    }

    // updateAddon(
    //   {
    //     addonId,
    //     payload: {
    //       name,
    //       price,
    //       required: isChecked,
    //       addonCategoryId: selectedId || null,
    //     },
    //   },
    //   (error, data) => {
    //     if (data) {
    //       alert("updated successfully");
    //     }
    //   }
    // );
  };

  const handleDeleteAddon = async (addonId: number) => {
    // deleteAddon(addonId, (error, data) => {
    //   console.log({ error, data });
    //   if (data) {
    //     alert("deleted successfully");
    //     navigate("/addons");
    //   }
    // });
  };

  const addon = addons.find((addon) => addon.id === addonId);

  const selectedAddonCategory = addonCategories.find(
    (ac) => ac.id === addon?.addon_category_id
  ) || { id: 0 };

  console.log({ selectedAddonCategory });

  useEffect(() => {
    if (addons.length > 0) {
      setIsChecked(addon?.required || isChecked);
      setSelectedId(addon?.addon_category_id || 0);
    }
  }, [addons]);

  if (!addon) {
    return <h3>There is no addon</h3>;
  }

  return (
    <Layout title="Edit Addon">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Edit a new Addon </h2>
        <TextField
          label="Name"
          inputRef={nameRef}
          defaultValue={addon.name}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          defaultValue={addon.price}
          inputRef={priceRef}
          variant="outlined"
          type="number"
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="addon cat"
            value={selectedId}
            onChange={(e) => {
              const selectedACatId = Number(e.target.value);
              console.log(selectedACatId, "sdifs");
              setSelectedId(selectedACatId);
            }}
          >
            <MenuItem value={0}>{"nothing"}</MenuItem>

            {addonCategories.map((ac) => (
              <MenuItem key={ac.id} value={ac.id}>
                {ac.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={addon.required}
              onChange={(e, checked) => setIsChecked(checked)}
            />
          }
          label="required"
          labelPlacement="end"
        />

        <Button variant="contained" onClick={handleUpdateAddon}>
          Update
        </Button>
        <Button
          onClick={() => addon.id && handleDeleteAddon(addon.id)}
          sx={{ mt: 1 }}
          variant="outlined"
        >
          Delete
        </Button>
      </Box>
    </Layout>
  );
};

export default AddonDetail;
