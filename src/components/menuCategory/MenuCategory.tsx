import { DeleteForever } from "@mui/icons-material";
import {
  Card,
  Box,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { useBackofficeUpdate } from "../../contexts/BackofficeContext";
import { MenuCategory as MenuCategoryType } from "../../typings/types";
import Link from "next/link";
import { config } from "@/config/config";

interface Props {
  menuCategory: MenuCategoryType;
}
const MenuCategory = ({ menuCategory }: Props) => {
  // ************************

  const { fetchData } = useBackofficeUpdate();

  const handleDeleteMenuCategory = async (menuCategoryId: number) => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories/${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      console.log(await res.json());
      return alert("you can't delete this mcat");
    }
    console.log(await res.json());
    await fetchData();
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "#e1e1e1",
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: 230 }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="overline">
                {menuCategory.name}
              </Typography>
            </CardContent>

            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton
                aria-label="deleteMenuCat"
                onClick={() =>
                  menuCategory.id && handleDeleteMenuCategory(menuCategory.id)
                }
              >
                <DeleteForever sx={{ height: 38, width: 38 }} />
              </IconButton>
              <Link href={`/backoffice/menu-categories/${menuCategory.id}`}>
                Edit
              </Link>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default MenuCategory;
