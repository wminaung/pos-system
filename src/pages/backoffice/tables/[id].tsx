/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { config } from "@/config/config";
import { useBackoffice } from "@/contexts/BackofficeContext";
import { defaultQRCodeSrc } from "@/utils";

import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const EditTable = () => {
  const router = useRouter();
  const tableId = router.query.id as string;

  const { tables, selectedLocationId } = useBackoffice();
  const table = tables.find((table) => table.id === Number(tableId));
  const [tableName, setTableName] = useState(table?.name);

  const updateTable = async () => {
    await fetch(`${config.backofficeApiBaseUrl}/tables`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableId, name: tableName }),
    });
  };
  const assetUrl = table?.asset_url || defaultQRCodeSrc;
  return (
    <Layout title="Edit Table">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          defaultValue={tableName}
          sx={{ mb: 2 }}
          onChange={(evt) => setTableName(evt.target.value)}
        />

        <Box>
          <Image src={assetUrl} alt="qrcode" width={170} height={170} />
        </Box>
        <Button
          variant="contained"
          onClick={updateTable}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditTable;
