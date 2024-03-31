"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import useAppSlice from "@/store/hook/useAppSlice";
import { FormAction } from "@/utils/enums";
import DialogBox from "../DialogBox";
import EditMenu from "./forms/EditMenu";
import { useState } from "react";
import { MenuCategory } from "@prisma/client";
import EditMenuCategory from "./forms/EditMenuCategory";

export interface Props extends MenuCategory {}

export default function MenuCategoryCard({ id, is_archived, name }: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { actions, dispatch } = useAppSlice();

  const handleClick = () => {
    console.log(id, name);

    // todo open dialog box
    dispatch(actions.app.setFormAction(FormAction.edit));
    dispatch(actions.app.setSelectedMenuCategoryId(id));
    setOpen(true);
  };

  return (
    <Card elevation={0} sx={{}}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: { sm: "column-reverse", md: "row" },
          justifyContent: "space-between",
        }}
        onClick={handleClick}
      >
        <Box sx={{}}>
          <CardContent sx={{}}>
            <Typography
              component="div"
              variant="h5"
              fontSize={{ xs: "1rem", sm: theme.typography.h5.fontSize }}
              textAlign={{ xs: "center", sm: "left" }}
            >
              {name}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              component="div"
              fontSize={{ xs: "1rem", sm: theme.typography.h6.fontSize }}
              textAlign={{ xs: "center", sm: "left" }}
            >
              "it can add description"
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: { xs: 140, sm: "100%", md: 140 } }}
          image="/seafood.png"
          alt="Live from space album cover"
        />
      </CardActionArea>
      <span>
        <DialogBox
          open={open}
          setOpen={setOpen}
          btnText="no"
          width="100"
          title="Edit Menu Category"
        >
          {
            // ! need to fix it
          }
          <EditMenuCategory />
        </DialogBox>
      </span>
    </Card>
  );
}
