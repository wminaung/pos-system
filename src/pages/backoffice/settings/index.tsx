import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { Location } from "@/typings/types";
import { LoadingButton } from "@mui/lab";
import { config } from "@/config/config";
import Layout from "@/components/Layout";
import { getSelectedLocationId, setSelectedLocationId } from "@/utils";
import { theme } from "@/config/myTheme";
import { useAppSlice } from "@/store/slices/appSlice";

const Settings = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [newLocation, setNewLocation] = useState<Location>({} as Location);
  const {
    fetchData,
    state: {
      locations,
      app: { selectedLocationId },
    },
    dispatch,
    actions,
  } = useAppSlice();

  useEffect(() => {
    if (locations.length) {
      if (selectedLocationId) {
        const selectedLocation = locations.find(
          (location) => String(location.id) === selectedLocationId
        );
        setSelectedLocation(selectedLocation);
      } else {
        console.log(selectedLocationId, "///");
      }
    }
  }, [locations, selectedLocationId]);

  useEffect(() => {
    selectedLocation && setNewLocation(selectedLocation);
  }, [selectedLocation]);

  const handleOnChange = (event: SelectChangeEvent<number>) => {
    const selectedLocation = locations.find(
      (location) => location.id === event.target.value
    );

    setSelectedLocation(selectedLocation);
  };
  if (!selectedLocation) {
    return <h3>There is no selected Location</h3>;
  }

  const handleUpdate = async () => {
    if (!selectedLocation.id) return alert("need selectedLocationId");
    setSelectedLocationId(String(selectedLocation.id));
    dispatch(actions.app.setAppSelectedLocationId(getSelectedLocationId()));

    const isCanUpdate =
      selectedLocation.name !== newLocation.name ||
      selectedLocation.address !== newLocation.address ||
      String(selectedLocation.id) !== selectedLocationId;
    if (!isCanUpdate) {
      return alert("can't updated");
    }

    const res = await fetch(
      `${config.backofficeApiBaseUrl}/locations/${selectedLocation.id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newLocation),
      }
    );
    if (!res.ok) {
      console.log(await res.json());
      return alert("cant't fetch");
    }
    return fetchData();
  };
  const isDisabled =
    selectedLocation.name === newLocation.name &&
    selectedLocation.address === newLocation.address &&
    String(newLocation.id) === selectedLocationId;
  return (
    <Layout title="Settings">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
          color: theme.text,
          mt: 3,
          p: 8,
          backgroundColor: theme.second,
        }}
        component={Paper}
        elevation={3}
      >
        <Typography textAlign="center" variant="h6" sx={{ mb: 2 }}>
          Choose Your Location
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          value={newLocation.name || ""}
          sx={{ mb: 2 }}
          onChange={(evt) => {
            setNewLocation({ ...newLocation, name: evt.target.value });
          }}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={newLocation.address || ""}
          sx={{ mb: 2 }}
          onChange={(evt) => {
            setNewLocation({ ...newLocation, address: evt.target.value });
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocation ? selectedLocation.id : ""}
            label="Location"
            onChange={handleOnChange}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
        <LoadingButton
          sx={{ mt: 2 }}
          size="large"
          onClick={handleUpdate}
          variant="contained"
          disabled={isDisabled}
        >
          <span>Update</span>
        </LoadingButton>
      </Box>
    </Layout>
  );
};

export default Settings;
