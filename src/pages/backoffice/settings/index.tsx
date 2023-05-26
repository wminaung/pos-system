import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import { Location } from "@/typings/types";
import { LoadingButton } from "@mui/lab";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

const Settings = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [newLocation, setNewLocation] = useState<Location>({} as Location);
  const allData = useApp();
  const { locations } = allData;
  const { fetchData } = useAppUpdate();

  useEffect(() => {
    if (locations.length) {
      const selectedLocationId = localStorage.getItem("selectedLocation");
      if (!selectedLocationId) {
        localStorage.setItem("selectedLocation", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (location) => String(location.id) === selectedLocationId
        );
        setSelectedLocation(selectedLocation);
      }
    }
  }, [locations]);

  const isDisabled = !newLocation.name || !newLocation.address;

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
    const selectedLocationId = selectedLocation.id;
    if (!selectedLocationId) return alert("need selectedLocationId");

    localStorage.setItem("selectedLocation", String(selectedLocation.id));
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(
      `${config.apiBaseUrl}/locations/${selectedLocationId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(newLocation),
      }
    );
    if (res.ok) return fetchData();
  };

  return (
    <Layout title="Settings">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
          mt: 3,
        }}
      >
        <h3>
          {selectedLocation.id} : {selectedLocation.name}
        </h3>
        <TextField
          label="Name"
          variant="outlined"
          value={newLocation.name ?? ""}
          sx={{ mb: 2 }}
          onChange={(evt) => {
            setNewLocation({ ...newLocation, name: evt.target.value });
          }}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={newLocation.address ?? ""}
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
            label="Chooose Location"
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
          color="secondary"
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
