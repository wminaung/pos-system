import { theme } from "@/config/myTheme";

import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { menu } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  menu: menu;
  handleDeleteMenu: (menuId: number) => Promise<void>;
}
const MenuCard = ({ menu, handleDeleteMenu }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card
      sx={{
        zIndex: 1,
        color: theme.white,
      }}
    >
      <CardActionArea
        component={Link}
        href={`/backoffice/menus/${menu.id}`}
        passHref
      >
        <CardMedia
          component={"img"}
          height="120"
          image={`${menu.image_url}`}
          alt="green iguana"
        />

        <CardContent
          sx={{
            width: 140,
            height: 30,
            maxHeight: 500,
            bgcolor: theme.main,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {menu.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {menu.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ backgroundColor: theme.main, textAlign: "right" }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2">
            {menu.description.slice(0, 50)}
          </Typography>
        </Collapse>
      </Box>
      <CardActions
        onClick={() => menu.id && handleDeleteMenu(menu.id)}
        sx={{
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          backgroundColor: theme.thrid,
          color: theme.main,
          fontWeight: "bold",
          borderRadius: 1,
          cursor: "pointer",
        }}
      >
        Delete Dish {menu.id}
      </CardActions>
    </Card>
  );
};

export default MenuCard;
