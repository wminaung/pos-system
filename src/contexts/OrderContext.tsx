import { Dispatch, SetStateAction, createContext, useEffect } from "react";
import {
  Addon,
  AddonCategory,
  BaseProps,
  Company,
  Location,
  Menu,
  MenuAddonCategory,
  MenuCategory,
  MenuMenuCategoryLocation,
  Order,
  Orderline,
  OrderlineItem,
} from "../typings/types";
import { useContext, useState } from "react";
import { config } from "@/config/config";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

interface OrderContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menusAddonCategories: MenuAddonCategory[];
  location: Location | null;
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  isLoading: boolean;
  cart: Order | null;
  orderlineItems: OrderlineItem[];
  updateData: Dispatch<SetStateAction<OrderContextType>>;

  fetchData: () => void;
}

export const defaultOrderContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusAddonCategories: [],
  location: null,
  menusMenuCategoriesLocations: [],
  isLoading: false,
  cart: null,
  orderlineItems: [],
  updateData: () => {},
  fetchData: () => {},
};

const OrderContext = createContext(defaultOrderContext);

export const useOrder = () => {
  return useContext(OrderContext);
};

interface Props extends BaseProps {}

export const OrderContextProvider = ({ children }: Props) => {
  // **********************************
  const [data, updateData] = useState(defaultOrderContext);

  const router = useRouter();
  const query = router.query;

  const locationIdStr = query.locationId as string;
  const locationId = locationIdStr ? Number(locationIdStr) : null;

  useEffect(() => {
    locationId && fetchData();
  }, [locationId]);

  // ? fetch all data
  const fetchData = async () => {
    if (!locationId) return;
    updateData({ ...data, isLoading: true });
    const response = await fetch(
      `${config.orderApiBaseUrl}?locationId=${locationId}`
    );

    const responseJson = await response.json();

    const { menuCategories, menus, addonCategories, addons, location } =
      responseJson as OrderContextType;
    console.log("fetch....................");
    updateData({
      ...data,
      ...responseJson,
      isLoading: false,
    });
  };

  return (
    <OrderContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </OrderContext.Provider>
  );
};
