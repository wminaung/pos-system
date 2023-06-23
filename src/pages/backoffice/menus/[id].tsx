import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { use, useEffect, useState } from "react";
import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import { Textarea } from "@mui/joy";
import FileDropZone from "@/components/FileDropZone";
import AspectRatio from "@mui/joy/AspectRatio";
import { Menu, Payload } from "@/typings/types";
import { config } from "@/config/config";
import { Theme, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/Layout";
import { menu } from "@prisma/client";
import { theme as myTheme } from "@/config/myTheme";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MenuDetail = () => {
  // **************************************************

  const {
    menus,
    menusMenuCategoriesLocations,
    menuCategories,
    addonCategories,
    selectedLocationId,
  } = useBackoffice();
  const { fetchData } = useBackofficeUpdate();

  console.log("menus :::", menus);

  const router = useRouter();
  const { id: menuIdStr } = router.query;
  const [menu, setMenu] = useState<Payload.Menu.Update>();
  const [oldMenu, setOldMenu] = useState<Payload.Menu.Update>();
  const [menuImage, setMenuImage] = useState<File>();
  const theme = useTheme();

  const menuId = parseInt(menuIdStr as string, 10);
  const hasMenu = menus.find((menu) => menu.id === menuId && !menu.is_archived);
  const isRequired = !!menusMenuCategoriesLocations.find(
    (m) =>
      menu &&
      m.menu_id === menuId &&
      String(m.location_id) === selectedLocationId
  )?.is_available;
  useEffect(() => {
    if (hasMenu && selectedLocationId) {
      const isRequired = !!menusMenuCategoriesLocations.find(
        (m) =>
          menu &&
          m.menu_id === menuId &&
          String(m.location_id) === selectedLocationId
      )?.is_available
        ? true
        : false;

      const addonCatIds = hasMenu.menu_addon_category.map(
        (addonCat) => addonCat.addon_category_id
      );

      setMenu({
        ...hasMenu,
        addonCatIds: addonCatIds,
        isRequired,
      });
      setOldMenu({
        ...hasMenu,
        addonCatIds: addonCatIds,
        isRequired,
      });
    }
  }, [hasMenu]);

  if (!menu || !oldMenu) {
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="secondary" />
      </Stack>
    );
  }
  console.log({ c: oldMenu.isRequired, g: menu.isRequired, oldMenu });
  // todo UPDATE
  const handleUpdateMenu = async () => {
    // console.log(menu, selectedMenuCatIds);
    const {
      name: oldName,
      price: oldPrice,
      description: oldDescription,
      addonCatIds: oldAddonCatIds,
      asset_url: oldAssetUrl,
      isRequired: oldIsRequired,
    } = oldMenu;

    const { name, price, description, addonCatIds, isRequired, asset_url } =
      menu;

    let assetUrl: string | null = "";
    if (menuImage) {
      const formData = new FormData();
      formData.append("files", menuImage as Blob);
      const response = await fetch(`${config.backofficeApiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const imageRes = await response.json();
        assetUrl = imageRes.assetUrl as string;
      } else {
        assetUrl = oldAssetUrl;
      }
    } else {
      assetUrl = oldAssetUrl;
    }
    if (
      name === oldName &&
      price === oldPrice &&
      isRequired === oldIsRequired &&
      description === oldDescription &&
      String(addonCatIds) === String(oldAddonCatIds) &&
      assetUrl === oldAssetUrl
    ) {
      return alert("you can't update");
    }

    const payload = {
      name,
      price,
      description,
      asset_url: assetUrl,
      addonCatIds,
      isRequired,
    };

    const menuRes = await fetch(
      `${config.backofficeApiBaseUrl}/menus/${menuId}?locationId=${selectedLocationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!menuRes.ok) {
      console.log(await menuRes.json());
      return alert("Menu Update Fail");
    }
    fetchData();
    console.log(await menuRes.json());
    alert("updated success");
  };

  const handleDeleteMenu = async () => {
    const isConfirm = window.confirm("Are you sure want to delete");
    if (!isConfirm) return;
    const res = await fetch(`${config.backofficeApiBaseUrl}/menus/${menuId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.log(await res.json());
      return alert("Fail to Delete");
    }
    const resData = await res.json();
    console.log(resData, "resData");
    await fetchData();
    await router.push("/backoffice/menus");
  };

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const { name, price, description, addonCatIds, asset_url } = menu;
  return (
    <Layout title="Edit Menu">
      <Box
        component={Card}
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          margin: "0 auto",
          bgcolor: myTheme.second,
          p: 3,
        }}
        mt={2}
      >
        <AspectRatio
          variant="outlined"
          ratio="4/1"
          objectFit="scale-down"
          sx={{ mb: 2 }}
        >
          {asset_url ? (
            <Image
              src={asset_url}
              alt={name}
              width={300}
              height={300}
              priority={true}
            />
          ) : (
            <h3>There is no image </h3>
          )}
        </AspectRatio>
        <TextField
          label="Name"
          value={name}
          type="text"
          onChange={(e) => setMenu({ ...menu, name: e.target.value })}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) => setMenu({ ...menu, price: Number(e.target.value) })}
          value={price}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Textarea
          color="neutral"
          value={description}
          onChange={(e) => setMenu({ ...menu, description: e.target.value })}
          sx={{ mb: 2, bgcolor: "inherit", borderColor: "#888" }}
          disabled={false}
          minRows={2}
          placeholder="Description..."
          size="lg"
        />
        <FormControl fullWidth>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={addonCategories}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            value={addonCategories.filter((ac) =>
              addonCatIds.find((acid) => ac.id === acid)
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
        <Box sx={{ mb: 2 }}>
          <FileDropZone onFileSelected={onFileSelected} />
        </Box>
        <Button variant="contained" onClick={handleUpdateMenu}>
          Update
        </Button>
        <Button
          sx={{
            mt: 3,
          }}
          variant="outlined"
          onClick={handleDeleteMenu}
        >
          Delete
        </Button>
      </Box>
    </Layout>
  );
};

export default MenuDetail;
