import { Box, Button, TextField } from "@mui/material";
import React, { useRef } from "react";

import { useApp, useAppUpdate } from "@/contexts/AppContext";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { config } from "@/config/config";

const MenuCategoryDetail = () => {
  //********************* */
  const { menuCategories } = useApp();
  const { fetchData } = useAppUpdate();

  const router = useRouter();
  const { id: menuCategoryIdStr } = router.query;
  const nameRef = useRef<HTMLInputElement>(null);

  const menuCategoryId = parseInt(menuCategoryIdStr as string, 10);

  const menuCategory = menuCategories.find(
    (menuCategory) => menuCategory.id === menuCategoryId
  );

  if (!menuCategory) return null;

  const { id, name } = menuCategory;

  console.log({ id, name });

  const handeleUpdateMenuCategory = async () => {
    const nametoUpdate = nameRef.current?.value || "";

    const payload = { name: nametoUpdate };
    const res = await fetch(
      `${config.apiBaseUrl}/menuCategories/${menuCategoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      console.log(await res.json());
      return alert("you can't update this mcat");
    }
    console.log(await res.json());
    await fetchData();
    // updateMenuCategory({ menuCategoryId, payload }, (error, data) => {
    //   console.log({ error, data }, "updatemcat");
    // });
  };

  const handleDeleteMenuCategory = async () => {
    const res = await fetch(
      `${config.apiBaseUrl}/menuCategories/${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      console.log(await res.json());
      return alert("you can't delete this mcat");
    }
    console.log(await res.json());
    await fetchData();
    router.push("/backoffice/menu-categories");
  };
  return (
    <Layout title="Edit Menu Category">
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={500}
        margin={"0 auto"}
        mt={5}
      >
        <TextField
          defaultValue={name}
          inputRef={nameRef}
          label="Name"
          type="text"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handeleUpdateMenuCategory}>
          Update
        </Button>
        <Button
          sx={{
            mt: 3,
          }}
          variant="outlined"
          onClick={handleDeleteMenuCategory}
        >
          Delete
        </Button>
      </Box>
    </Layout>
  );
};

export default MenuCategoryDetail;
