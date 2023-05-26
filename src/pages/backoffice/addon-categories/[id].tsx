import { Box, Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useApp, useAppUpdate } from "@/contexts/AppContext";
import { useRouter } from "next/router";
import Link from "next/link";

const AddonCategoryDetail = (props: any) => {
  const { addonCategories } = useApp();
  const { fetchData } = useAppUpdate();

  console.log("Props", props);
  const router = useRouter();
  const addonCategoryIdStr = router.query.id as string;

  const nameRef = useRef<HTMLInputElement>(null);

  const addonCategoryId = parseInt(addonCategoryIdStr as string, 10);

  const addonCategory = addonCategories.find(
    (addonCategory) => addonCategory.id === addonCategoryId
  );

  if (!addonCategory)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Link href={"/auth/login"}>
          {" "}
          <h3>Got To Login Page</h3>{" "}
        </Link>
      </Box>
    );

  const { id, name } = addonCategory;

  console.log({ id, name });

  const handeleUpdateAddonCategory = async () => {
    const nametoUpdate = nameRef.current?.value || "";

    const payload = { name: nametoUpdate };

    // updateAddonCategory({ addonCategoryId, payload }, (error, data) => {
    //   if (data) {
    //     alert("updated successfully");
    //   }
    // });
  };

  const handleDeleteAddonCategory = () => {
    // deleteAddonCategory(addonCategoryId, (error, data) => {
    //   console.log({ error, data }, "deleteacat");
    //   if (data) {
    //     alert("deleted successfully");
    //     navigate("/addon-categories");
    //   }
    // });
  };

  return (
    <>
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

        <Button variant="contained" onClick={handeleUpdateAddonCategory}>
          Update
        </Button>
        <Button
          sx={{
            mt: 3,
          }}
          variant="outlined"
          onClick={handleDeleteAddonCategory}
        >
          Delete
        </Button>
      </Box>
    </>
  );
};

export default AddonCategoryDetail;
