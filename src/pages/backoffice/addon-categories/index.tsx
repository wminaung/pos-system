import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { useRef, useState } from "react";

import { DeleteForever, EditNote } from "@mui/icons-material";
import Link from "next/link";
import Layout from "@/components/Layout";
import DialogBox from "@/components/DialogBox";
import CreateAddonCategory from "@/components/addonCategory/CreateAddonCategory";
import { config } from "@/config/config";
import { useAppSlice } from "@/store/slices/appSlice";
import ItemCard from "@/components/ItemCard";
import { BookIcon, QueueIcon } from "@/components/icon";
import { theme } from "@/config/myTheme";

const AddonCategories = () => {
  //*********************** */

  const {
    state: {
      app: { selectedLocationId },
      addonCategories,
    },

    fetchData,
  } = useAppSlice();

  const handleDelete = async (id: number) => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/addonCategories/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      return alert("delete fail");
    }
    console.log(await res.json());
    fetchData();
  };
  return (
    <Layout title="Addon Categories">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ m: 2, alignSelf: "flex-end" }}>
          <DialogBox
            btnText="create addon category"
            title="create addon category"
            width="237px"
          >
            <CreateAddonCategory />
          </DialogBox>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {addonCategories.map((addonCategory) => (
          <ItemCard
            icon={
              <BookIcon sx={{ fontSize: 50, color: theme.iconColor, p: 2 }} />
            }
            title={addonCategory.name}
            href={`/backoffice/addon-categories/${addonCategory.id}`}
            key={addonCategory.id}
          />
        ))}
      </Box>
    </Layout>
  );
};

export default AddonCategories;
