"use client";
import { Box } from "@mui/material";
import GridLayout, { GridItemType } from "../GridLayout";
import { useEffect, useMemo, useState } from "react";
import { Menu, MenuCategory } from "@prisma/client";
import { config } from "@/config/config";
import useAppSlice from "@/store/hook/useAppSlice";
import MenuCategoryCard from "./MenuCategoryCard";

const gridItems: GridItemType[] = [
  {
    id: 1,
    node: <Box>Hello</Box>,
  },
  {
    id: 2,
    node: <Box>Hello</Box>,
  },
  {
    id: 3,
    node: <Box>Hello</Box>,
  },
  {
    id: 4,
    node: <Box>Hello</Box>,
  },
  {
    id: 5,
    node: <Box>Hello</Box>,
  },
];

const AllMenuCategories = () => {
  const { actions, dispatch, fetchData, state } = useAppSlice();

  const menuCategories = state.menuCategories;

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch(`${config.backofficeApiBaseUrl}/menus`);
    //   const data = (await res.json()) as Menu[];
    //   setProductAssets(data);
    // };
    // fetchData();
  }, []);

  const createGridItems = (menuCategories: MenuCategory[]): GridItemType[] => {
    return menuCategories.map((menuCategory) => ({
      id: menuCategory.id,
      node: <MenuCategoryCard {...menuCategory} />,
    }));
  };

  const getItems = useMemo(
    () => createGridItems(menuCategories),
    [menuCategories]
  );

  if (!menuCategories) {
    return null;
  }

  return (
    <>
      <GridLayout
        gridItems={getItems}
        // gridItems={createGridItems(menuCategories)}
        gridProps={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
        itemsProps={{ elevation: 0 }}
        containerProps={{ spacing: 2 }}
        itemSx={{ bgcolor: "#7abfb2f0" }}
        containerSx={{
          justifyContent: { xs: "center", sm: "normal" },
        }}
      />
    </>
  );
};

export default AllMenuCategories;
