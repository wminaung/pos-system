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
import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import { DeleteForever, EditNote } from "@mui/icons-material";
import Link from "next/link";
import Layout from "@/components/Layout";
import DialogBox from "@/components/DialogBox";
import CreateAddonCategory from "@/components/addonCategory/CreateAddonCategory";
import { config } from "@/config/config";

const AddonCategories = () => {
  //*********************** */

  const { addonCategories } = useBackoffice();

  const { fetchData } = useBackofficeUpdate();

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
          <Box sx={{ m: 2 }} key={addonCategory.id}>
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
                    {addonCategory.name}
                  </Typography>
                </CardContent>

                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      addonCategory.id && handleDelete(addonCategory.id)
                    }
                  >
                    <DeleteForever sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <Link
                    href={`/backoffice/addon-categories/${addonCategory.id}`}
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

export default AddonCategories;
