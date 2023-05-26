import { Box, Button, TextField } from "@mui/material";
import React, { useRef } from "react";

import { useApp, useAppUpdate } from "@/contexts/AppContext";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

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

  const handeleUpdateMenuCategory = () => {
    const nametoUpdate = nameRef.current?.value || "";

    const payload = { name: nametoUpdate };

    // updateMenuCategory({ menuCategoryId, payload }, (error, data) => {
    //   console.log({ error, data }, "updatemcat");
    // });
  };
  const handleDeleteMenuCategory = () => {
    // deleteMenuCategory(menuCategoryId, (error, data) => {
    //   console.log({ error, data }, "deletemcat");
    //   if (data) {
    //     router.push("/backoffice/menu-categories");
    //   }
    // });
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
