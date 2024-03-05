"use client";
import { Box } from "@mui/material";
import GridLayout, { GridItemType } from "../GridLayout";
import { useEffect, useMemo, useState } from "react";
import B_Card from "./MenuCard";
import { Menu } from "@prisma/client";
import { config } from "@/config/config";
import useAppSlice from "@/store/hook/useAppSlice";
import MenuCard from "./MenuCard";

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

const AllMenus = () => {
  const { actions, dispatch, fetchData, state } = useAppSlice();

  const menus = state.menus;

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch(`${config.backofficeApiBaseUrl}/menus`);
    //   const data = (await res.json()) as Menu[];
    //   setProductAssets(data);
    // };
    // fetchData();
  }, []);

  if (!menus) {
    return null;
  }

  const createGridItems = (menus: Menu[]): GridItemType[] => {
    return menus.map((menu) => ({
      id: menu.id,
      node: (
        <MenuCard
          id={menu.id}
          description={menu.description}
          name={menu.name}
          price={menu.price}
          url={menu.asset_url}
        />
      ),
    }));
  };

  const getItemsCallBack = () => createGridItems(menus);

  const getItems = useMemo(getItemsCallBack, [menus]);

  return (
    <>
      <GridLayout
        gridItems={createGridItems(menus)}
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

export default AllMenus;
