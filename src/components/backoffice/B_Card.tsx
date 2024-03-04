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
              textAlign={{ xs: "center", sm: "left" }}
            >
              {name}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              component="div"
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
    </Card>
  );
}
