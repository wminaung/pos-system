import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import MenuCard from "@/components/MenuCard";
import { useRouter } from "next/router";

const OrderingPage = () => {
  const [value, setValue] = useState("1");
  const { menuCategories, menus } = useOrder();
  const router = useRouter();
  const pathname = router.pathname;
  const query = router.query;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {menuCategories.map((menuCat) => (
              <Tab
                key={menuCat.id}
                label={menuCat.name}
                value={String(menuCat.id)}
              />
            ))}
          </TabList>
        </Box>

        {menuCategories.map((menuCat) => {
          const menuCatId = menuCat.id;
          const validMenus = menus.filter((menu) =>
            menu.menu_menu_category_location.find(
              (mmcl) => mmcl.menu_category_id === menuCatId
            )
          );
          return (
            <TabPanel key={menuCatId} value={String(menuCatId)}>
              <Box sx={{ display: "flex" }}>
                {validMenus.map((menu) => (
                  <MenuCard
                    href={{
                      pathname: `${pathname}/menu/[menuId]`,
                      query: { ...query, menuId: menu.id },
                    }}
                    menu={menu}
                    key={menu.id}
                  />
                ))}
              </Box>
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
};

export default OrderingPage;
