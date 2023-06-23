import { config } from "@/config/config";
import { useBackofficeUpdate } from "@/contexts/BackofficeContext";
import { Payload } from "@/typings/types";
import { Box, Button, TextField } from "@mui/material";
import { RefObject, useRef } from "react";

const CreateAddonCategory = () => {
  //********************* */
  const nameRef = useRef<HTMLInputElement>(null);
  const { fetchData } = useBackofficeUpdate();
  const handleCreateAddonCategory = async () => {
    const name = nameRef.current ? nameRef.current.value.trim() : "";

    if (!name) {
      return alert("name is needed");
    }

    const payload: Payload.AddonCategory.Create = { name };
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
        inputRef={nameRef}
        label="Name"
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <Button variant="contained" onClick={handleCreateAddonCategory}>
        Create
      </Button>
    </Box>
  );
};

export default CreateAddonCategory;
