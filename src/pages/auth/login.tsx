import React from "react";
import { Button, Grid, Paper, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { signIn, signOut, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import Layout from "@/components/Layout";

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const LoginPage = () => {
  const { data: session } = useSession();
  console.log("session : ", session);
  return (
    <Layout>
      <StyledGrid container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={StyledPaper}
          elevation={6}
          square
        >
          <StyledPaper>
            <Typography component="h1" variant="h5" gutterBottom>
              Sign in to Your Account
            </Typography>
            {session ? (
              <StyledButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => signOut()}
                startIcon={<GoogleIcon />}
              >
                Sign Out with Google
              </StyledButton>
            ) : (
              <StyledButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </StyledButton>
            )}
          </StyledPaper>
        </Grid>
      </StyledGrid>
    </Layout>
  );
};

export default LoginPage;
