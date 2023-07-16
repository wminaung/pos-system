import React, { useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useAppSlice } from "@/store/slices/appSlice";
import { useRouter } from "next/router";
import { getSelectedLocationId, setSelectedLocationId } from "@/utils";

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
  const selectedLocationId = getSelectedLocationId() as string;
  useEffect(() => {
    if (status === "authenticated") {
      !isLoading && router.push("/backoffice/orders");
    } else if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else {
      console.log("is still ....");
    }
  }, [data, router, isLoading]);

  // useEffect(() => {
  //   if (defaultSelectedLocationId) {
  //     dispatch(actions.app.fetchAppData(defaultSelectedLocationId));
  //     setSelectedLocationId(defaultSelectedLocationId);
  //   }
  // }, [defaultSelectedLocationId]);

  return (
    <Layout>
      <StyledGrid container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={8}
          md={9}
          component={StyledPaper}
          elevation={6}
          square
        >
          <Button
            onClick={() => {
              console.log("first");
              // dispatch(actions.menus.setMenus([]));
            }}
          >
            cljc
          </Button>
          <StyledPaper>
            <Typography component="h1" variant="h5" gutterBottom>
              Welcome to happy pos backoffice
            </Typography>
          </StyledPaper>
        </Grid>
      </StyledGrid>
    </Layout>
  );
};

export default BackOfficePage;
