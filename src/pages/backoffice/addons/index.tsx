import {
  Box,
  TextField,
  Checkbox,
  Button,
  Autocomplete,
  FormControl,
  FormLabel,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useRef, useState } from "react";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import { DeleteForever, EditNote } from "@mui/icons-material";
import Alertor from "@/components/Alertor";
import Link from "next/link";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

const Addons = () => {
  // ********************************

  const [createdAlert, setCreatedAlert] = useState(false);
  const [deletedAlert, setDeletedAlert] = useState(false);

  const { addons, addonCategories, accessToken } = useApp();
  const { fetchData } = useAppUpdate();

  const [selectedId, setSelectedId] = useState<number>();
  const [isChecked, setIsChecked] = useState(false);

  const nameRef = useRef<any>(null);
  const priceRef = useRef<any>(null);

  const handleCreateAddon = async () => {
    const name = nameRef.current.value.trim();
    const price = parseInt(priceRef.current.value, 10);
    if (!name || price < 0) {
      return alert("name & price are needed");
    }
    const payload = {
      name,
      price,
      required: isChecked,
      addonCategoryId: selectedId ?? null,
    };
    const res = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return alert("created fail");
    }
    const data = await res.json();
    console.log("created success", data);
    fetchData();
    // createAddon(
    //   { name, price, required: isChecked, addonCategoryId: selectedId ?? null },
    //   (err, data) => {
    //     if (data) setCreatedAlert(true);
    //   }
    // );
  };

  const Alert = (
    <Alertor
      open={deletedAlert || createdAlert}
      setOpen={deletedAlert ? setDeletedAlert : setCreatedAlert}
      message={deletedAlert ? "deleted successfully" : "created successfully"}
      status={deletedAlert ? "info" : "success"}
      autoHideDuratiion={2000}
    />
  );

  const handleDeleteAddon = async (addonId: number) => {
    const res = await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      return alert("not ok");
    }
    await fetchData();
    // deleteAddon(addonId, (error, data) => {
    //   if (data) {
    //     setDeletedAlert(true);
    //   }
    // });
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value;
    console.log(selectedId, "sid");
    setSelectedId(selectedId ? Number(selectedId) : undefined);
  };

  return (
    <Layout title="Addons">
      <div>{Alert}</div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create a new Addon </h2>
        <TextField
          label="Name"
          inputRef={nameRef}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          inputRef={priceRef}
          variant="outlined"
          type="number"
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">AddonCategory</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={String(selectedId)}
            label="AddonCategory"
            onChange={handleChange}
          >
            <MenuItem value={undefined}>None</MenuItem>
            {addonCategories.map(({ id, name }) => (
              <MenuItem key={`${id}-${name}`} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
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
        />

        <Button variant="contained" onClick={handleCreateAddon}>
          Create
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {addons.map((addon) => (
          <Box sx={{ m: 2 }} key={addon.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                background: "#e1e1e1",
                boxShadow: 3,
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: 220 }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="subtitle1">
                    {addon.name}
                  </Typography>
                </CardContent>

                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => addon.id && handleDeleteAddon(addon.id)}
                  >
                    <DeleteForever sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <Link
                    href={`/backoffice/addons/${addon.id}`}
                    style={{ marginLeft: 8 }}
                  >
                    <IconButton aria-label="edit">
                      <EditNote sx={{ height: 38, width: 38 }} />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default Addons;
