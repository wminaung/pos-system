import {
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
import { Menu } from "@/typings/types";
import { config } from "@/config/config";
import { Theme, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/Layout";
import { menu } from "@prisma/client";
import { theme as myTheme } from "@/config/myTheme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

interface UpdateMenu extends menu {
  menuCatIds: number[];
  isRequired: boolean;
}

const MenuDetail = () => {
  // **************************************************

  const {
    menus,
    menusMenuCategoriesLocations,
    menuCategories,
    selectedLocationId,
  } = useBackoffice();
  const { fetchData } = useBackofficeUpdate();
  // const [selectedMenuCatIds, setSelectedMenuCatIds] = useState<number[]>([]);
  // const [oldSelectedMenuCatIds, setOldSelectedMenuCatIds] = useState<number[]>(
  //   []
  // );
  console.log("menus :::", menus);

  const router = useRouter();
  const { id: menuIdStr } = router.query;
  const [menu, setMenu] = useState<UpdateMenu>();
  const [oldMenu, setOldMenu] = useState<UpdateMenu>();
  const [menuImage, setMenuImage] = useState<File>();
  const theme = useTheme();

  const menuId = parseInt(menuIdStr as string, 10);
  const hasMenu = menus.find((menu) => menu.id === menuId);
  const isRequired = !!menusMenuCategoriesLocations.find(
    (m) =>
      menu &&
      m.menu_id === menu.id &&
      String(m.location_id) === selectedLocationId
  )?.is_available;

  useEffect(() => {
    if (hasMenu && selectedLocationId) {
      const menuCatIds = hasMenu.menu_menu_category_location
        .filter((menuCat) => menuCat.location_id === Number(selectedLocationId))
        .map((menuCat) => menuCat.menu_category_id) as number[];

      setMenu({
        ...hasMenu,
        menuCatIds: menuCatIds,
        isRequired,
      });
      setOldMenu({
        ...hasMenu,
        menuCatIds: menuCatIds,
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

  const menuCategoriesByLocation = menuCategories.filter((mcat) =>
    mcat.menu_menu_category_location.find(
      (mmcl) => String(mmcl.location_id) === selectedLocationId
    )
  );

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    console.log(value, "value");
    if (typeof value === "string") return;

    setMenu({ ...menu, menuCatIds: value });
  };
  // todo UPDATE
  const handleUpdateMenu = async () => {
    // console.log(menu, selectedMenuCatIds);
    const {
      name: oldName,
      price: oldPrice,
      description: oldDescription,
      menuCatIds: oldMenuCatIds,
      asset_url: oldAssetUrl,
      isRequired: oldIsRequired,
    } = oldMenu;

    const { name, price, description, menuCatIds, isRequired, asset_url } =
      menu;
    console.log({ menuCatIds });
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
      String(menuCatIds) === String(oldMenuCatIds) &&
      assetUrl === oldAssetUrl
    ) {
      return alert("you can't update");
    }

    const payload = {
      name,
      price,
      description,
      asset_url: assetUrl,
      menuCatIds,
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

  const getStyles = (
    menuCategoryId: number,
    theme: Theme
  ): React.CSSProperties | undefined => {
    const isSelected = menu.menuCatIds.includes(menuCategoryId);
    return {
      fontWeight: isSelected
        ? theme.typography.fontWeightBold
        : theme.typography.fontWeightRegular,
      backgroundColor: isSelected ? "#666" : "#fff",
      color: isSelected ? "#fff" : "#000",
      borderBottom: "1px dashed  black",
    };
  };
  const { name, price, description, asset_url } = menu;
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
        />{" "}
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
              <MenuItem
                key={menuCategory.id}
                value={menuCategory.id}
                style={getStyles(menuCategory.id as number, theme)}
              >
                {menuCategory.name} {menuCategory.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
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
