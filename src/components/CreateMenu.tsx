import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useEffect, useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import { config } from "@/config/config";
import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { Menu, MenuCreatePayload } from "@/typings/types";
import Layout from "@/components/Layout";

const defaultMenu: MenuCreatePayload = {
  description: "",
  name: "",
  price: 0,
  image_url: "",
  isRequired: true,
  menuCatIds: [],
};

const CreateMenu = () => {
  const [loading, setLoading] = useState(false);
  const [menuImage, setMenuImage] = useState<File>();
  const [menu, setMenu] = useState<MenuCreatePayload>(defaultMenu);

  const { selectedLocationId, locations, menus, menuCategories } =
    useBackoffice();

  const { fetchData } = useBackofficeUpdate();

  const isDisabled = !menu.name || !menu.description || !menuImage;
  console.log(isDisabled);

  const menuCategoriesByLocation = menuCategories.filter((mcat) =>
    mcat.menu_menu_category_location.find(
      (mmcl) => String(mmcl.location_id) === selectedLocationId
    )
  );

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
        const payload = { ...menu, image_url: imageUrl } as MenuCreatePayload;

        console.log("payload", payload);

        const res = await fetch(
          `${config.backofficeApiBaseUrl}/menus?locationId=${selectedLocationId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error("fail res.ok");
        console.log(await res.json());
        await fetchData();
        setLoading(false);
        setMenu({ ...defaultMenu });
        setMenuImage(undefined);
      }
    } catch (error) {
      setLoading(false);
      alert("fail");
    }
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    console.log(value, "value");
    if (typeof value === "string") return;

    setMenu({ ...menu, menuCatIds: value });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 450,
          margin: "0 auto",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          focused
          autoFocus
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
          <InputLabel id="demo-multiple-chip-label">Menu Category</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            onChange={handleChange}
            value={menu.menuCatIds}
            input={
              <OutlinedInput id="select-multiple-chip" label="Menu Category" />
            }
            renderValue={(selected) => {
              const selectedCategories = selected.map((id) =>
                menuCategoriesByLocation.find((mcat) => mcat.id === id)
              );
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selectedCategories.map((item, idx) => {
                    return <Chip key={item?.id} label={item?.name} />;
                  })}
                </Box>
              );
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                },
              },
            }}
          >
            {menuCategoriesByLocation.map((menuCategory) => (
              <MenuItem key={menuCategory.id} value={menuCategory.id}>
                {menuCategory.name} {menuCategory.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          sx={{ mb: 2 }}
          control={
            <Switch
              checked={menu.isRequired}
              onChange={(e, checked) =>
                setMenu({ ...menu, isRequired: checked })
              }
            />
          }
          label="required"
        />
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
