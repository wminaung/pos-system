import { createContext, useEffect } from "react";
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
} from "../typings/types";
import { useContext, useState } from "react";
import { config } from "@/config/config";
import { useSession } from "next-auth/react";
import { table } from "@prisma/client";

interface OrderContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menusAddonCategories: MenuAddonCategory[];
  locations: Location[];
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  updateData: (value: any) => void;
  fetchData: () => void;
  isLoading: boolean;
  cart: Order | null;
}

export const defaultOrderContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusAddonCategories: [],
  locations: [],
  menusMenuCategoriesLocations: [],
  updateData: () => {},
  fetchData: () => {},
  isLoading: false,
  cart: null,
};

const OrderContext = createContext(defaultOrderContext);

export const useOrder = () => {
  return useContext(OrderContext);
};

interface Props extends BaseProps {}

export const OrderContextProvider = ({ children }: Props) => {
  // **********************************
  const [data, updateData] = useState(defaultOrderContext);

  // ? fetch all data

  return (
    <OrderContext.Provider value={{ ...data }}>
      {children}
    </OrderContext.Provider>
  );
};
