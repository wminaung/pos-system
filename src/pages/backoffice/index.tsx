import React, { use, useEffect } from "react";
import { Button, Grid, Paper, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { signIn, signOut, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import Layout from "@/components/Layout";
import { useBackoffice } from "@/contexts/BackofficeContext";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData, fetchAppData, useAppSlice } from "@/store/slices/appSlice";
import { setMenus } from "@/store/slices/menusSlice";
import { useRouter } from "next/router";
import { getSelectedLocationId } from "@/utils";

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

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const BackOfficePage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const { state, actions, dispatch } = useAppSlice();
  const { error, isLoading } = useAppSelector((state) => state.app);
  // const selectedLocationId = getSelectedLocationId() as string;
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
  //   dispatch(actions.fetchAppData(selectedLocationId));
  // }, []);

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
          <Button onClick={() => 3}>cljc</Button>
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
