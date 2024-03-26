import React, { useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useAppSlice from "@/store/hook/useAppSlice";
import Footer from "@/components/Footer";
import MenuCategoriesApp from "@/components/backoffice/MenuCategiriesApp";

const MenuCategoriesPage = () => {
  return (
    <>
      <MenuCategoriesApp />
      <Footer />
    </>
  );
};

export default MenuCategoriesPage;
