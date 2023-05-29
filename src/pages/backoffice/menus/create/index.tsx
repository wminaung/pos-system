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
import FileDropZone from "@/components/FileDropZone";
import { config } from "@/config/config";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { CreateMenuPayload, Menu } from "@/typings/types";
import Layout from "@/components/Layout";

const CreateMenu = () => {
  const [loading, setLoading] = useState(false);
  const [menuImage, setMenuImage] = useState<File>();
  const [menu, setMenu] = useState<Menu>({
    description: "",
    location_ids: [],
    name: "",
    price: 0,
    image_url: "",
  } as Menu);

  const { selectedLocationId } = useApp();

  useEffect(() => {
    setMenu({
      ...menu,
      location_ids: selectedLocationId ? [Number(selectedLocationId)] : [],
    });
  }, [selectedLocationId]);

  useEffect(() => {
    console.log("menu : ", menu);
  }, [menu]);

  const isDisabled =
    !menu.name || !menu.description || !menu.location_ids.length || !menuImage;
  console.log(isDisabled);

  const { fetchData } = useAppUpdate();
  const { locations } = useApp();

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const handleCreateMenu = async () => {
    if (!menu.name) return console.log("Please enter menu name");
    setLoading(true);
    // todo -- need to comment out for image upload
    try {
      const formData = new FormData();
      formData.append("files", menuImage as Blob);
      const response = await fetch(`${config.backofficeApiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const imageRes = await response.json();
        const imageUrl = imageRes.assetUrl as string;

        console.log("imageurl", imageUrl);
        const payload = { ...menu, imageUrl: imageUrl };

        console.log("payload", payload);

        const res = await fetch(`${config.backofficeApiBaseUrl}/menus`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("fail res.ok");
        console.log(await res.json());
        await fetchData();
        setLoading(false);
        //   createMenu(
        //     {
        //       description,
        //       locationIds: location_ids,
        //       name,
        //       price,
        //       imageUrl: imageUrl,
        //     },
        //     (error, data) => {
        //       setLoading(false);
        //       if (error) console.log({ error });
        //       console.log("menu created", data);
        //     }
        //   );
        // } else {
        //   setLoading(false);
      }
    } catch (error) {
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
  //   const response = await fetch(`${config.backofficeApiBaseUrl}/menus/${menuId}`, {
  //     method: "DELETE",
  //   });
  // };

  const handleChange = (event: SelectChangeEvent<any>) => {
    const changeValues = event.target.value as number[];

    setMenu({ ...menu, location_ids: changeValues });
  };

  return (
    <Layout title="Create Menus">
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
            value={menu.name}
            onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            sx={{ mb: 2 }}
            value={menu.price}
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
            value={menu.description}
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
              value={menu.location_ids}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(values) => {
                const locationNames = menu.location_ids.map(
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
                const isChecked = menu.location_ids.includes(
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
    </Layout>
  );
};

export default CreateMenu;
