import React, { useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useAppSlice from "@/store/hook/useAppSlice";
import MenusApp from "@/components/backoffice/MenusApp";
import Footer from "@/components/Footer";

const MenusPage = () => {
  return (
    <>
      <MenusApp />
    </>
  );
};

export default MenusPage;
