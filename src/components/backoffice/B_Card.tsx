"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { CardActionArea } from "@mui/material";
import useAppSlice from "@/store/hook/useAppSlice";
import { FormAction } from "@/utils/enums";
import DialogBox from "../DialogBox";
import EditMenu from "./forms/EditMenu";
import { useState } from "react";

export interface B_CardType {
  name: string;
  url: string | null;
  id: number;
  description: string;
  price: number;
}

export default function B_Card({
  name,
  url,
  id,
  description,
  price,
}: B_CardType) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { actions, dispatch } = useAppSlice();

  const handleClick = () => {
    console.log(id, name);

    // todo open dialog box
    dispatch(actions.app.setFormAction(FormAction.edit));
    dispatch(actions.app.setSelectedMenuId(id));
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
              $ {price.toFixed(2)}
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
          title="Edit Menu"
        >
          <EditMenu />
        </DialogBox>
      </span>
    </Card>
  );
}
