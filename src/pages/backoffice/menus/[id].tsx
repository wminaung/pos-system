import {
  Box,
  Button,
  Chip,
  FormControl,
  ImageListItem,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import { Textarea } from "@mui/joy";
import FileDropZone from "@/components/FileDropZone";
import AspectRatio from "@mui/joy/AspectRatio";
import { Menu, MenuCategory } from "@/typings/types";
import { config } from "@/config/config";
import { Theme, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";

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

const MenuDetail = () => {
  // **************************************************
  // **************************************************
  // **************************************************
  const {
    menus,
    selectedLocationId,
    menuCategories,
    menusMenuCategoriesLocations,
  } = useApp();
  const { fetchData } = useAppUpdate();
  const [selectedMenuCatIds, setSelectedMenuCatIds] = useState<number[]>([]);
  const [oldSelectedMenuCatIds, setOldSelectedMenuCatIds] = useState<number[]>(
    []
  );

  const router = useRouter();
  const { id: menuIdStr } = router.query;
  const [menu, setMenu] = useState<Menu>();
  const [oldMenu, setOldMenu] = useState<Menu>();
  const [menuImage, setMenuImage] = useState<File>();
  const theme = useTheme();

  const menuId = parseInt(menuIdStr as string, 10);

  const hasMenu = menus.find((menu) => menu.id === menuId);

  useEffect(() => {
    if (menuCategories.length && menus.length && menuId) {
      setSelectedMenuCatIds(
        menusMenuCategoriesLocations
          .filter((menuMenuCat) => menuMenuCat.menu_id === menuId)
          .map((menuMenuCat) => menuMenuCat.menu_category_id)
      );
      setOldSelectedMenuCatIds(
        menusMenuCategoriesLocations
          .filter((menuMenuCat) => menuMenuCat.menu_id === menuId)
          .map((menuMenuCat) => menuMenuCat.menu_category_id)
      );
    }
  }, [menuCategories, menus]);

  useEffect(() => {
    if (hasMenu) {
      setMenu(hasMenu);
      setOldMenu(hasMenu);
    }
  }, [hasMenu]);

  if (!menu || !oldMenu) {
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="secondary" />
      </Stack>
    );
  }
  const {
    name,
    price,
    description,
    image_url,
    location_ids,
    addon_category_ids = [],
    menu_category_ids = [],
  } = menu;
  console.log({ menu }, "adsffffffffffffffffffff");
  // todo UPDATE
  const handleUpdateMenu = async () => {
    // console.log(menu, selectedMenuCatIds);
    const { name, price, description, location_ids, image_url } = menu;
    const {
      name: oldName,
      price: oldPrice,
      description: oldDescription,
      location_ids: oldLocationIds,
      image_url: oldImageUrl,
    } = oldMenu;

    let imageUrl: string | undefined = "";
    if (menuImage) {
      const formData = new FormData();
      formData.append("files", menuImage as Blob);
      const response = await fetch(`${config.backofficeApiBaseUrl}/assets`, {
        method: "POST",

        body: formData,
      });

      if (response.ok) {
        const imageRes = await response.json();
        imageUrl = imageRes.assetUrl as string;
      } else {
        imageUrl = oldImageUrl;
      }
    } else {
      imageUrl = oldImageUrl;
    }

    if (
      name === oldName &&
      price === oldPrice &&
      description === oldDescription &&
      String(location_ids) === String(oldLocationIds) &&
      String(selectedMenuCatIds) === String(oldSelectedMenuCatIds) &&
      imageUrl === oldImageUrl
    ) {
      return alert("you can't update");
    }

    const payload = {
      name,
      price,
      description,
      imageUrl,
      menuCategoryIds: selectedMenuCatIds,
      locationIds: [Number(selectedLocationId)],
    };

    const menuRes = await fetch(
      `${config.backofficeApiBaseUrl}/menus/${menuId}`,
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
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    console.log(value, "value");
    if (typeof value === "string") return;

    setSelectedMenuCatIds(value);
  };

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const getStyles = (
    menuCategoryId: number,
    theme: Theme
  ): React.CSSProperties | undefined => {
    const isSelected = selectedMenuCatIds.includes(menuCategoryId);
    return {
      fontWeight: isSelected
        ? theme.typography.fontWeightBold
        : theme.typography.fontWeightRegular,
      backgroundColor: isSelected ? "#666" : "#fff",
      color: isSelected ? "#fff" : "#000",
      borderBottom: "1px dashed  black",
    };
  };

  return (
    <Layout title="Edit Menu">
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={500}
        margin={"0 auto"}
        mt={5}
      >
        <AspectRatio
          variant="outlined"
          ratio="3/1"
          objectFit="scale-down"
          sx={{ mb: 2 }}
        >
          {image_url ? (
            <Image
              src={image_url}
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
          sx={{ mb: 2 }}
          disabled={false}
          minRows={2}
          placeholder="Description..."
          size="lg"
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id="demo-multiple-chip-label">Menu Category</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            onChange={handleChange}
            value={selectedMenuCatIds}
            input={
              <OutlinedInput id="select-multiple-chip" label="Menu Category" />
            }
            renderValue={(selected) => {
              const selectedCategories = selected.map((id) =>
                menuCategories.find((mcat) => mcat.id === id)
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
            {menuCategories.map((menuCategory) => (
              <MenuItem
                key={menuCategory.id}
                value={menuCategory.id}
                style={getStyles(menuCategory.id as number, theme)}
              >
                {menuCategory.name} {menuCategory.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
