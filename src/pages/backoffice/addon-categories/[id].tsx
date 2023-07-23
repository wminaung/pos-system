import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  useBackoffice,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { Payload } from "@/typings/types";
import { config } from "@/config/config";
import { LoadingButton } from "@mui/lab";
import Layout from "@/components/Layout";
import { useAppSlice } from "@/store/slices/appSlice";

const AddonCategoryDetail = (props: any) => {
  const {
    state: {
      app: { selectedLocationId },
      addonCategories,
    },
    fetchData,
  } = useAppSlice();

  const router = useRouter();
  const addonCategoryIdStr = router.query.id as string;

  const [newAddonCat, setNewAddonCat] = useState({
    name: "",
    isRequired: false,
  } as Payload.AddonCategory.Update);

  const addonCategoryId = parseInt(addonCategoryIdStr as string, 10);

  const addonCategory = addonCategories.find(
    (addonCategory) => addonCategory.id === addonCategoryId
  );

  useEffect(() => {
    console.log("sdfijsdifjsijdfsdfiffffffffffffffffffffffff");
    if (addonCategory) {
      setNewAddonCat({
        ...newAddonCat,
        name: addonCategory.name,
        isRequired: addonCategory.is_required,
      });
    }
  }, [addonCategory]);

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

  const handeleUpdateAddonCategory = async () => {
    const { name, isRequired } = newAddonCat;
    console.log(newAddonCat);
    if (
      name === addonCategory.name &&
      isRequired === addonCategory.is_required
    ) {
      return alert("can't updated");
    }

    const payload: Payload.AddonCategory.Update = { name, isRequired };
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/addonCategories/${addonCategoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      return alert("update fail");
    }
    console.log(await res.json());
    fetchData();
  };

  const handleDeleteAddonCategory = async () => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/addonCategories/${addonCategoryId}`,
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
    <Layout title="Edit Addon Category">
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={500}
        margin={"0 auto"}
        mt={5}
      >
        <TextField
          value={newAddonCat.name}
          label="Name"
          type="text"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(e) =>
            setNewAddonCat({ ...newAddonCat, name: e.target.value })
          }
        />
        <FormControlLabel
          value="Required"
          checked={newAddonCat.isRequired}
          control={<Switch color="primary" />}
          onChange={(e, checked) => {
            setNewAddonCat({ ...newAddonCat, isRequired: checked });
          }}
          label="Required"
          labelPlacement="end"
        />
        <LoadingButton variant="contained" onClick={handeleUpdateAddonCategory}>
          Update
        </LoadingButton>
        <LoadingButton
          sx={{
            mt: 3,
          }}
          variant="outlined"
          onClick={handleDeleteAddonCategory}
        >
          Delete
        </LoadingButton>
      </Box>
    </Layout>
  );
};

export default AddonCategoryDetail;
