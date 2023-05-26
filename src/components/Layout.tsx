import { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import NavBar from "./NavBar";
import {
  Backdrop,
  CircularProgress,
  LinearProgress,
  Stack,
} from "@mui/material";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  const data = useApp();

  return (
    <div>
      <NavBar title={props.title} />
      {props.children}
    </div>
  );
};

export default Layout;
