import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { config } from "@/config/config";
import { addon } from "@prisma/client";
import { Payload } from "@/typings/types";
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
    },
    actions,
    dispatch,
  } = useAppSlice();
  const [newAddon, setNewAddon] = useState<NewAddon>({
    name: "",
    price: 0,
    addon_category_id: "",
  });

  const handleCreateAddon = async () => {
    const { name, price, addon_category_id } = newAddon;
    if (!name || price < 0) {
      return alert("name & price are needed");
    }
    const payload: Payload.Addon.Create = {
      name,
      price,
      addonCategoryId: addon_category_id ? Number(addon_category_id) : null,
    };
    const res = await fetch(`${config.backofficeApiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return alert("created fail");
    }
    const data = await res.json();
    console.log("created success", data);
    dispatch(actions.fetchAppData(selectedLocationId as string));
  };
  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value;
    console.log(selectedId, "sid");
    setNewAddon({
      ...newAddon,
      addon_category_id: selectedId,
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        m: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Create a new Addon </h2>
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
          value={String(newAddon.addon_category_id)}
          label="AddonCategory"
          onChange={handleChange}
        >
          {" "}
          <MenuItem value={""}>None</MenuItem>
          {addonCategories.map(({ id, name }) => (
            <MenuItem key={`${id}-${name}`} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={(e, checked) => setIsChecked(checked)}
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
          />
        }
        label="required"
        labelPlacement="end"
      /> */}

      <Button variant="contained" onClick={handleCreateAddon}>
        Create
      </Button>
    </Box>
  );
};

export default CreateAddon;
