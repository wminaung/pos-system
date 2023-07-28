import { config } from "@/config/config";
import { useAppSlice } from "@/store/slices/appSlice";
import { Payload } from "@/typings/types";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { RefObject, useRef, useState } from "react";

const CreateAddonCategory = () => {
  //********************* */
  const [addonCategory, setAddonCategory] = useState({
    name: "",
    isRequired: false,
  });

  const { fetchData } = useAppSlice();
  const handleCreateAddonCategory = async () => {
    const { name, isRequired } = addonCategory;
    if (!name || typeof isRequired !== "boolean") {
      return alert("name is needed");
    }
    const payload: Payload.AddonCategory.Create = { name, isRequired };
    const res = await fetch(`${config.backofficeApiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      alert("something wrong");
    } else {
      console.log(await res.json());
    }
    fetchData();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        width: 300,
      }}
    >
      <TextField
        value={addonCategory.name}
        label="Name"
        variant="outlined"
        onChange={(e) =>
          setAddonCategory({ ...addonCategory, name: e.target.value })
        }
        sx={{ mb: 3 }}
      />
      <FormControlLabel
        value="Required"
        checked={addonCategory.isRequired}
        control={<Switch color="primary" />}
        onChange={(e, checked) => {
          setAddonCategory({ ...addonCategory, isRequired: checked });
        }}
        label="Required"
        labelPlacement="end"
      />
      <Button variant="contained" onClick={handleCreateAddonCategory}>
        Create
      </Button>
    </Box>
  );
};

export default CreateAddonCategory;
