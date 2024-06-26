import {
  Autocomplete,
  Box,
  FormControl,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useEffect, useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import { config } from "@/config/config";

import LoadingButton from "@mui/lab/LoadingButton";
import { Payload } from "@/typings/types";
import { theme } from "@/config/myTheme";
import { selectMuiStyle } from "@/utils";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useAppSlice } from "@/store/slices/appSlice";
import { Prisma } from "@prisma/client";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const defaultMenu: Payload.Menu.Create = {
  description: "",
  name: "",
  price: 0,
  asset_url: "",
  isRequired: true,
  addonCatIds: [],
  menuCatIds: [],
};
const CreateMenu = () => {
  const [loading, setLoading] = useState(false);
  const [menuImage, setMenuImage] = useState<File>();
  const [showPreviewImage, setShowPreviewImage] = useState<
    string | null | undefined
  >(null);
  const [menu, setMenu] = useState<Payload.Menu.Create>(defaultMenu);

  const {
    state: {
      addonCategories,
      menuCategories,
      app: { selectedLocationId },
    },
    actions,
    dispatch,
  } = useAppSlice();

  const isDisabled = !menu.name || !menu.description || !menuImage;
  console.log(isDisabled);

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
    setShowPreviewImage(URL.createObjectURL(files[0]));
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
        const assetUrl = imageRes.assetUrl as string;
        console.log("assetUrl", assetUrl);
        const payload = { ...menu, asset_url: assetUrl } as Payload.Menu.Create;
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
        if (!res.ok) {
          const {
            error: { details },
          } = await res.json();
          console.error(details[0].message);
          throw new Error(details[0].message);
        }
        console.log(await res.json());
        // await fetchData();
        dispatch(actions.fetchAppData(selectedLocationId as string));
        setLoading(false);
        setMenu({ ...defaultMenu });
        setMenuImage(undefined);
        setShowPreviewImage(null);
      }
    } catch (error: any) {
      setLoading(false);
      alert(String(error));
    }
  };

  console.warn(selectedLocationId as string);
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={addonCategories}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={addonCategories.filter((addonCat) =>
              menu.addonCatIds.includes(addonCat.id)
            )}
            onChange={(e, value) => {
              setMenu({ ...menu, addonCatIds: value.map((item) => item.id) });
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Addon Category"
                placeholder="Favorites"
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={menuCategories}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={menuCategories.filter((menuCat) =>
              menu.menuCatIds.includes(menuCat.id)
            )}
            onChange={(e, value) => {
              setMenu({ ...menu, menuCatIds: value.map((item) => item.id) });
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Menu Category"
                placeholder="Favorites"
              />
            )}
          />
        </FormControl>

        <FileDropZone
          onFileSelected={onFileSelected}
          showPreviewImage={showPreviewImage}
        />
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
