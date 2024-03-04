"use client";

import * as React from "react";
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

  const { actions, dispatch } = useAppSlice();

  const handleClick = () => {
    console.log(id, name);
    dispatch(actions.app.setFormAction(FormAction.edit));
    dispatch(actions.app.setSelectedMenuId(id));
  };

  return (
    <Card elevation={0}>
      <CardActionArea
        sx={{ display: "flex", justifyContent: "space-between" }}
        onClick={handleClick}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5" textAlign={"left"}>
              {name}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              component="div"
              textAlign={"left"}
            >
              $ {price.toFixed(2)}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: { xs: 100, sm: 110, md: 130, lg: 135 } }}
          image="/defaultQRCode.png"
          alt="Live from space album cover"
        />
      </CardActionArea>
    </Card>
  );
}
