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

const AddonCategories = () => {
  //*********************** */
  const nameRef = useRef<any>(null);
  const { addonCategories } = useBackoffice();
  const { fetchData } = useBackofficeUpdate();

  const handleCreateAddonCategory = async () => {
    const name = nameRef.current.value.trim();
    console.log({ name });
    if (!name) {
      return alert("name & price are needed");
    }

    // createAddonCategory({ name }, (error, data) => {
    //   console.log({ error, data });
    // });
  };

  const handleDelete = (id: number) => {
    // deleteAddonCategory(id, (error, data) => {
    //   console.log({ error, data });
    // });
  };
  return (
    <Layout title="Addon Categories">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
          mt: 8,
        }}
      >
        <h2 style={{ textAlign: "center" }}>{"Addon Categories"}</h2>
        <TextField
          inputRef={nameRef}
          label="Name"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleCreateAddonCategory}>
          Create
        </Button>
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
