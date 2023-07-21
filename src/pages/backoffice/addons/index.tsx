import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";

import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import { DeleteForever, EditNote } from "@mui/icons-material";
import Link from "next/link";
import { config } from "@/config/config";
import Layout from "@/components/Layout";
import DialogBox from "@/components/DialogBox";
import CreateAddon from "@/components/addon/CreateAddon";
import { useAppSlice } from "@/store/slices/appSlice";
import ItemCard from "@/components/ItemCard";
import { EggIcon } from "@/components/icon";
import { theme } from "@/config/myTheme";

const Addons = () => {
  // ********************************
  const {
    state: {
      app: { selectedLocationId },
      addons,
      addonCategories,
    },
    actions,
    dispatch,
  } = useAppSlice();

  const handleDeleteAddon = async (addonId: number) => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/addons/${addonId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      return alert("not ok");
    }
    dispatch(actions.fetchAppData(selectedLocationId as string));
    //todo await fetchData();
  };

  return (
    <Layout title="Addons">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ m: 2, alignSelf: "flex-end" }}>
          <DialogBox btnText="create addon" title="create addon" width="187px">
            <CreateAddon />
          </DialogBox>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {addons.map((addon) => (
          <ItemCard
            icon={<EggIcon sx={{ fontSize: 50, color: theme.text, p: 2 }} />}
            title={addon.name}
            href={`/backoffice/addons/${addon.id}`}
            key={addon.id}
          />
        ))}
      </Box>
    </Layout>
  );
};

export default Addons;
