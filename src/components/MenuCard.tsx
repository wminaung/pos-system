import { theme } from "@/config/myTheme";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { menu } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { defaultMenuSrc } from "@/utils";
import { Url } from "next/dist/shared/lib/router/router";

interface Props {
  menu: menu;
  handleRemoveMenu?: (menuId: number) => void;
  href: Url;
}
const MenuCard = ({ menu, handleRemoveMenu, href }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bgCard = theme.second;

  return (
    <Card
      elevation={6}
      sx={{
        width: 180,
        // maxHeight: 800,
        mx: 2,
        my: 2,
        backgroundColor: "#000",
      }}
    >
      <CardActionArea component={Link} href={href} passHref>
        {isLoading && (
          <Skeleton
            sx={{ bgcolor: theme.third }}
            variant="rectangular"
            height={120}
          />
        )}
        <CardMedia
          component={"img"}
          height="120"
          image={`${menu.asset_url || defaultMenuSrc}`}
          alt="green iguana"
          sx={{
            transition: "all 0.2s",
            opacity: 0.8,
            ":hover": {
              transform: "scale(1.05)",
              opacity: 1,
            },
            display: isLoading ? "none" : "block",
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </CardActionArea>

      <CardContent
        sx={{
          height: 30,
          bgcolor: bgCard,
          color: theme.text,
          pb: 3,
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          component="div"
          title={menu.name}
        >
          {menu.name}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {menu.price}
        </Typography>
      </CardContent>

      {handleRemoveMenu && (
        <Box>
          <Divider orientation="horizontal" />
          <CardActions
            onClick={() => menu.id && handleRemoveMenu(menu.id)}
            sx={{
              zIndex: 999,
              display: "flex",
              justifyContent: "center",
              backgroundColor: theme.second,
              color: theme.text,
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "cursive",
              overflow: "hidden",
              transition: "all 0.4s ",
              ":hover": {
                color: "#B31312",
                background: theme.third,
              },
            }}
          >
            Remove Dish {menu.id}
          </CardActions>
        </Box>
      )}
    </Card>
  );
};

export default MenuCard;
