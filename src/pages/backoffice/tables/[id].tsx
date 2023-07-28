/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { config } from "@/config/config";

import { useAppSlice } from "@/store/slices/appSlice";
import { defaultQRCodeSrc } from "@/utils";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditTable = () => {
  const router = useRouter();
  const tableId = router.query.id as string;

  const {
    state: {
      app: { selectedLocationId },
      tables,
    },
  } = useAppSlice();
  const table = tables.find((table) => table.id === Number(tableId));
  const [tableName, setTableName] = useState("");

  useEffect(() => {
    table && setTableName(table.name);
  }, [table]);

  if (!table) {
    return null;
  }

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
          value={tableName}
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

      <Box sx={{ my: 4 }}>
        <Link
          href={{
            pathname: `${config.orderBaseRoute}/location/[locationId]/table/[tableId]`,
            query: {
              locationId: selectedLocationId,
              tableId: table.id,
            },
          }}
        >
          <Typography>click to Go Link</Typography>
        </Link>
      </Box>
    </Layout>
  );
};

export default EditTable;
