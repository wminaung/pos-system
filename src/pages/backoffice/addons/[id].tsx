import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { config } from "@/config/config";
import { Addon, Payload } from "@/typings/types";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useAppSlice } from "@/store/slices/appSlice";

interface NewAddon {
  name: string;
  price: number;
  addon_category_id: string;
}
const CreateAddon = () => {
  //************************* */

  const {
    state: {
      app: { selectedLocationId },
      addonCategories,
      addons,
    },
    actions,
    dispatch,
  } = useAppSlice();

  const router = useRouter();

  const [newAddon, setNewAddon] = useState<Payload.Addon.Update>(
    {} as Payload.Addon.Update
  );
  const [oldAddon, setOldAddon] = useState<Payload.Addon.Update>(
    {} as Payload.Addon.Update
  );

  const idString = router.query.id as string;
  const id = Number(idString);

  const editAddon = addons.find((addon) => addon.id === id) as Addon;

  useEffect(() => {
    if (editAddon) {
      const { addon_category_id, name, price } = editAddon;

      setOldAddon({
        ...oldAddon,
        name,
        price,
        addonCategoryId: addon_category_id,
      });

      setNewAddon({
        ...newAddon,
        name,
        price,
        addonCategoryId: addon_category_id,
      });
    }
  }, [addons]);

  const isDisabled =
    newAddon.name === oldAddon.name &&
    newAddon.price === oldAddon.price &&
    newAddon.addonCategoryId === oldAddon.addonCategoryId;

  const handleUpdateAddon = async () => {
    const { name, price, addonCategoryId } = newAddon;

    if (!name || price < 0 || isDisabled) {
      return alert("name & price are needed ,  isDisabled = " + isDisabled);
    }

    const payload: Payload.Addon.Create = {
      name,
      price,
      addonCategoryId: addonCategoryId,
    };
    const res = await fetch(`${config.backofficeApiBaseUrl}/addons/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return alert("updated fail");
    }
    const data = await res.json();
    console.log("updated success", data);
    dispatch(actions.fetchAppData(selectedLocationId as string));
    // todo   fetchData();
  };
  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value;
    console.log(selectedId, "sid");
    setNewAddon({
      ...newAddon,
      addonCategoryId: selectedId ? Number(selectedId) : null,
    });
  };

  if (!newAddon.name || !oldAddon.name) {
    return null;
  }

  return (
    <Layout title="Edit Addon">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          m: "0 auto",
        }}
      >
        <TextField
          label="Name"
          value={newAddon.name}
          onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          value={newAddon.price}
          onChange={(e) =>
            setNewAddon({ ...newAddon, price: Number(e.target.value) })
          }
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">AddonCategory</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={
              newAddon.addonCategoryId ? String(newAddon.addonCategoryId) : ""
            }
            label="AddonCategory"
            onChange={handleChange}
          >
            <MenuItem value={""}>None</MenuItem>
            {addonCategories.map(({ id, name }) => (
              <MenuItem key={`${id}-${name}`} value={id}>
                {name} {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LoadingButton
          disabled={isDisabled}
          onClick={handleUpdateAddon}
          variant="contained"
        >
          Update
        </LoadingButton>
      </Box>
    </Layout>
  );
};

export default CreateAddon;
