import React, { useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import useAppSlice from "@/store/hook/useAppSlice";

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const BackOfficePage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const { state } = useAppSlice();
  const { isLoading, selectedLocationId: defaultSelectedLocationId } =
    state.app;

  useEffect(() => {
    if (status === "authenticated") {
      // !isLoading && router.push("/backoffice/orders");
    } else if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else {
      console.log("is still ....");
    }
  }, [data, isLoading]);
  return (
    <StyledGrid container>
      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Back Office Page
        </Typography>
        (
        <Grid item xs={12}>
          {/* Your existing code */}
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </Grid>
        )
      </StyledPaper>
    </StyledGrid>
  );
};

export default BackOfficePage;
