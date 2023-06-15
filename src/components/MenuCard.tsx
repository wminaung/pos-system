import { theme } from "@/config/myTheme";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { menu } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

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
  handleDeleteMenu?: (menuId: number) => Promise<void>;
  handleRemoveMenu?: (menuId: number) => void;
}
const MenuCard = ({ menu, handleDeleteMenu, handleRemoveMenu }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.warn(menu.asset_url);
  const bgCard = theme.second;
  return (
    <Card
      sx={{
        zIndex: 0,
        position: "relative",
        boxShadow: "none",
        overflow: "",
        width: 180,
      }}
      style={{ overflow: "hidden" }}
    >
      <CardActionArea
        component={Link}
        href={`/backoffice/menus/${menu.id}`}
        passHref
        sx={{
          zIndex: 0,
          position: "relative",
        }}
      >
        <CardMedia
          component={"img"}
          height="120"
          image={`${menu.asset_url}`}
          alt="green iguana"
          sx={{
            transition: "0.3s",
            ":hover": {
              transform: "scale(1.03)",
            },
          }}
        />

        <CardContent
          sx={{
            height: 30,
            maxHeight: 500,
            bgcolor: bgCard,
            color: theme.text,
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
      </CardActionArea>

      <Box
        sx={{
          backgroundColor: bgCard,
          width: "auto",
        }}
      >
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography sx={{ textJustify: "auto" }} variant="caption">
            {menu.description}
          </Typography>
        </Collapse>
      </Box>
      <Divider orientation="horizontal" />
      {handleDeleteMenu && (
        <CardActions
          onClick={() => menu.id && handleDeleteMenu(menu.id)}
          sx={{
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.second,
            color: theme.text,
            fontWeight: "bold",
            cursor: "pointer",
            fontFamily: "cursive",
          }}
        >
          Delete Dish {menu.id}
        </CardActions>
      )}
      {handleRemoveMenu && (
        <CardActions
          onClick={() => menu.id && handleRemoveMenu(menu.id)}
          sx={{
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.third,
            color: theme.text,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Remove Dish {menu.id}
        </CardActions>
      )}
    </Card>
  );
};

export default MenuCard;
