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
          <Box sx={{ m: 2 }} key={addon.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                background: "#e1e1e1",
                boxShadow: 3,
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: 220 }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="subtitle1">
                    {addon.name}
                  </Typography>
                </CardContent>

                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => addon.id && handleDeleteAddon(addon.id)}
                  >
                    <DeleteForever sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <Link
                    href={`/backoffice/addons/${addon.id}`}
                    style={{ marginLeft: 8 }}
                  >
                    <IconButton aria-label="edit">
                      <EditNote sx={{ height: 38, width: 38 }} />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default Addons;
