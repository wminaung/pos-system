import React, { useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import useAppSlice from "@/store/hook/useAppSlice";
import All from "@/components/backoffice/All";
import BackofficeLayout from "@/components/backoffice/BackofficeLayout";

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

const MenusPage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const {
    state: { menus },
    actions,
  } = useAppSlice();

  return <BackofficeLayout></BackofficeLayout>;
};

export default MenusPage;
