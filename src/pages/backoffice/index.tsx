import React from "react";
import { Button, Grid, Paper, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { signIn, signOut, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";

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

const BackOffice = () => {
  const { data: session } = useSession();
  console.log("session : ", session);
  const data = useApp();

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

export default BackOffice;
