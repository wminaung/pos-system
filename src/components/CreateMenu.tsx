import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useEffect, useState } from "react";
import FileDropZone from "./FileDropZone";
import { config } from "../config/config";
import { useApp, useAppUpdate } from "../contexts/AppContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { CreateMenuPayload, Menu } from "../typings/types";

const CreateMenu = () => {
  const [loading, setLoading] = useState(false);
  const [menuImage, setMenuImage] = useState<File>();
  const [menu, setMenu] = useState<Menu>({} as Menu);
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);

  useEffect(() => {
    const selectedLocationId = Number(localStorage.getItem("selectedLocation"));
    setSelectedLocationIds([selectedLocationId]);
    setMenu({ ...menu, location_ids: [selectedLocationId] });
  }, []);

  useEffect(() => {
    console.log("menu : ", menu);
  }, [menu]);

  const isDisabled =
    !menu.name || !menu.description || !menu.location_ids.length || !menuImage;
  console.log(isDisabled);

  const accessToken = localStorage.getItem("accessToken");

  const { fetchData } = useAppUpdate();
  const { locations } = useApp();

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const handleCreateMenu = async () => {
    if (!menu.name) return console.log("Please enter menu name");
    setLoading(true);

    const formData = new FormData();
    formData.append("files", menuImage as Blob);
    const response = await fetch(`${config.backofficeApiBaseUrl}/assets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      const imageRes = await response.json();
      const imageUrl = imageRes.assetUrl as string;
      const { location_ids, name, price, description } = menu;
      // createMenu(
      //   {
      //     description,
      //     locationIds: location_ids,
      //     name,
      //     price,
      //     imageUrl: imageUrl,
      //   },
      //   (error, data) => {
      //     setLoading(false);
      //     if (error) console.log({ error });
      //     console.log("menu created", data);
      //   }
      // );
    } else {
      setLoading(false);
    }
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  // const deleteMenu = async (menuId?: number) => {
  //   if (!menuId) return;
  //   const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
  //     method: "DELETE",
  //   });
  // };

  const handleChange = (event: SelectChangeEvent<any>) => {
    const changeValues = event.target.value as number[];

    setSelectedLocationIds(changeValues);
    setMenu({ ...menu, location_ids: changeValues });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 350,
          margin: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
        <TextField
          label="Name"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setMenu({ ...menu, price: parseInt(evt.target.value, 10) })
          }
        />
        <Textarea
          color="neutral"
          sx={{ mb: 2 }}
          disabled={false}
          minRows={2}
          placeholder="Description..."
          size="lg"
          onChange={(evt) =>
            setMenu({ ...menu, description: evt.target.value })
          }
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedLocationIds}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(values) => {
              const locationNames = selectedLocationIds.map(
                (selectedLocationId) =>
                  locations.find(
                    (location) => location.id === selectedLocationId
                  )?.name as string
              );

              return locationNames.join(", ");
            }}
            MenuProps={MenuProps}
          >
            {locations.map((location) => {
              const isChecked = selectedLocationIds.includes(
                location.id as number
              );

              return (
                <MenuItem key={location.id} value={location.id as number}>
                  <Checkbox checked={isChecked} />
                  <ListItemText primary={location.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FileDropZone onFileSelected={onFileSelected} />

        <LoadingButton
          sx={{ mt: 2 }}
          color="secondary"
          size="large"
          onClick={handleCreateMenu}
          loading={loading}
          variant="contained"
          disabled={isDisabled}
        >
          <span>create</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CreateMenu;
