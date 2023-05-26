import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import { Location } from "@/typings/types";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

const Locations = () => {
  const { locations, selectedLocationId } = useApp();
  const { fetchData } = useAppUpdate();

  const [newLocation, setNewLocation] = useState({
    address: "",
    name: "",
  });

  const [updateLocations, setUpdateLocations] = useState<Location[]>(locations);

  useEffect(() => {
    setUpdateLocations(locations);
  }, [locations]);

  const selectedLocation = locations.find(
    (location) => String(location.id) === selectedLocationId
  );
  if (!selectedLocation)
    return (
      <h3>There is no selected location Please choose location from setting</h3>
    );

  // console.log("locations", locations, selectedLocation);

  const handleUpdateLocation = async (newLocation: Location) => {
    const locationId = newLocation.id;
    console.log(updateLocations, "ul");

    const oldLocation = locations.find(
      (location) => location.id === locationId
    );

    if (
      oldLocation?.name !== newLocation.name ||
      oldLocation.address !== newLocation.address
    ) {
      // todo --> update loction
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: newLocation.name,
          address: newLocation.address,
        }),
      });
      if (res.ok) {
        const dd = await res.json();
        fetchData();
        console.log(dd);
      }
      ///
    }
  };

  const handleCreateLocation = async () => {
    //todo -> create location

    const companyId = selectedLocation.company_id;
    const { name, address } = newLocation;

    if (!name || !address || !companyId) {
      return alert("put all field");
    }

    // const res = await fetch(`${config.apiBaseUrl}/locations`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     address,
    //     companyId,
    //   }),
    // });

    // if (res.ok) {
    //   fetchData();
    // }
  };

  const handleDeleteLocation = async (locationToDelete: Location) => {
    const loctionId = locationToDelete.id;

    if (!loctionId) {
      return alert("there is no location");
    }

    // const res = await fetch(`${config.apiBaseUrl}/locations/${loctionId}`, {
    //   method: "DELETE",

    // });
    // if (res.ok) {
    //   console.log(await res.json());
    //   return fetchData();
    // } else {
    //   alert(
    //     "You can't delete this location Please delete first menu form this location"
    //   );
    // }
  };

  return (
    <Layout title="Locations">
      <Box sx={{ px: 2, mt: 5 }}>
        {updateLocations.map((location, index) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 3 }}
              key={location.id}
            >
              <Typography variant="h5" sx={{ mr: 1 }}>
                {index + 1}.
              </Typography>
              <TextField
                value={location.name}
                label="name"
                onChange={(e) => {
                  const newLocations = updateLocations.map((updateLocation) => {
                    if (updateLocation.id === location.id) {
                      return { ...updateLocation, name: e.target.value };
                    }
                    return updateLocation;
                  });
                  setUpdateLocations(newLocations);
                }}
                sx={{ mr: 3 }}
              />

              <TextField
                value={location.address}
                sx={{ mr: 3 }}
                label="address"
                onChange={(e) => {
                  const newLocations = updateLocations.map((updateLocation) => {
                    if (updateLocation.id === location.id) {
                      return { ...updateLocation, address: e.target.value };
                    }
                    return updateLocation;
                  });
                  setUpdateLocations(newLocations);
                }}
              />
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                color="error"
                onClick={() => handleDeleteLocation(location)}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                onClick={() => handleUpdateLocation(location)}
              >
                Update
              </Button>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ px: 2, mt: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, ml: 3 }}>
          <TextField
            label="name"
            sx={{ mr: 3 }}
            value={newLocation.name}
            onChange={(e) => {
              setNewLocation({ ...newLocation, name: e.target.value });
            }}
          />

          <TextField
            sx={{ mr: 3 }}
            label="address"
            value={newLocation.address}
            onChange={(e) => {
              setNewLocation({ ...newLocation, address: e.target.value });
            }}
          />

          <Button variant="contained" onClick={handleCreateLocation}>
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Locations;
