import Layout from "@/components/Layout";
import {
  defaultBackofficeContext,
  useBackofficeUpdate,
} from "@/contexts/BackofficeContext";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  const { updateData } = useBackofficeUpdate();

  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      localStorage.removeItem("accessToken");
      updateData(defaultBackofficeContext);
      signOut({ callbackUrl: "/auth/login" });
    }
  }, [session]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Typography variant="h3">You are logged out.</Typography>
    </Box>
  );
};

export default Logout;
