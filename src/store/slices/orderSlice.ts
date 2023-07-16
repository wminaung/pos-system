import { config } from "@/config/config";
import { AppDataResponse } from "@/typings/types";

import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "..";
import { setMenus } from "./menusSlice";
import { setCompany } from "./companySlice";
import { addMenuCategory, setMenuCategories } from "./menuCategoriesSlice";
import { setAddons } from "./addonsSlice";
import { setLocations } from "./locationsSlice";
import { setAddonCategories } from "./addonCategoriesSlice";
import { setTables } from "./tablesSlice";
import { setOrderlines } from "./orderlinesSlice";
import { setOrders } from "./ordersSlice";
import { setMenusAddonCategories } from "./menusAddonCategoriesSlice";
import { setMenusMenuCategoriesLocations } from "./menusMenuCategoriesLocationsSlice";

// interface OrderContextType {
//   menus: Menu[];
//   menuCategories: MenuCategory[];
//   addons: Addon[];
//   addonCategories: AddonCategory[];
//   menusAddonCategories: MenuAddonCategory[];
//   location: Location | null;
//   menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
//   isLoading: boolean;
//   cart: Order | null;
//   orderlineItems: OrderlineItem[];
//   updateData: Dispatch<SetStateAction<OrderContextType>>;

//   fetchData: () => void;
// }

interface OrderState {
  isLoading: boolean;
  error: Error | null;
}

const initialState: OrderState = {
  isLoading: false,
  error: null,
};
export const fetchAppData = createAsyncThunk(
  "order/fetchOrderData",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/app?locationId=${locationId}`
    );

    const responseJson = await response.json();
    const {
      company,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusMenuCategoriesLocations,
      locations,
      tables,
      menusAddonCategories,
      selectedLocationId,
      orderlines,
      orders,
    } = responseJson as AppDataResponse;

    const dispatch = thunkAPI.dispatch;

    dispatch(
      setAppSelectedLocationId(
        selectedLocationId ? String(selectedLocationId) : null
      )
    );
    dispatch(setMenus(menus));
    dispatch(setCompany(company));
    dispatch(setMenuCategories(menuCategories));
    dispatch(setLocations(locations));
    dispatch(setAddons(addons));
    dispatch(setAddonCategories(addonCategories));
    dispatch(setTables(tables));
    dispatch(setOrderlines(orderlines));
    dispatch(setOrders(orders));
    dispatch(setMenusAddonCategories(menusAddonCategories));
    dispatch(setMenusMenuCategoriesLocations(menusMenuCategoriesLocations));

    /* final */
    dispatch(setAppLoading(false));
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderLoading: (state, action: PayloadAction<any>) => {
      state.isLoading = action.payload;
    },
  },
});
export const orderActions = orderSlice.actions;

export const selectApp = (state: RootState) => state.app;
export const selectMenus = (state: RootState) => state.menus.items;
export const selectCompany = (state: RootState) => state.company.item;
export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;
export const selectAddons = (state: RootState) => state.addons.items;
export const selectAddonCategories = (state: RootState) =>
  state.addonCategories.items;
export const selectTables = (state: RootState) => state.tables.items;
export const selectLocations = (state: RootState) => state.locations.items;
export const selectOrderlines = (state: RootState) => state.orderlines.items;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectMenusAddonCategories = (state: RootState) =>
  state.menusAddonCategories.items;
export const selectMenusMenuCategoriesLocations = (state: RootState) =>
  state.menusMenuCategoriesLocations.items;

// interface OrderContextType {
//   menus: Menu[];
//   menuCategories: MenuCategory[];
//   addons: Addon[];
//   addonCategories: AddonCategory[];
//   menusAddonCategories: MenuAddonCategory[];
//   location: Location | null;
//   menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
//   isLoading: boolean;
//   cart: Order | null;
//   orderlineItems: OrderlineItem[];
//   updateData: Dispatch<SetStateAction<OrderContextType>>;

//   fetchData: () => void;
// }
/*
cart: Order | null;
//   orderlineItems: OrderlineItem[];
*/
export const orderData = createSelector(
  [
    selectMenus,
    selectMenuCategories,
    selectAddons,
    selectAddonCategories,
    selectMenusAddonCategories,
    selectLocations,
    selectOrderlines,
    selectOrders,
    selectMenusMenuCategoriesLocations,
  ],
  (
    menus,
    menuCategories,
    addons,
    addonCategories,
    menusAddonCategories,
    locations,
    orderlines,
    orders,
    menusMenuCategoriesLocations
  ) => {
    return {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusAddonCategories,
      locations,
      orderlines,
      orders,
      menusMenuCategoriesLocations,
    };
  }
);
export const appActions = appSlice.actions;
export default appSlice.reducer;

export const useOrderSlice = () => {
  //   const state = useAppSelector(orderData);
  //   const dispatch = useAppDispatch();
  //   const actions = appSlice.actions;
  //   return {
  //     state,
  //     dispatch,
  //     fetchData,
  //     actions: {
  //       fetchAppData,
  //       app: { ...actions },
  //       menus: {
  //         setMenus,
  //       },
  //       company: {
  //         setCompany,
  //       },
  //       menuCategories: {
  //         setMenuCategories,
  //         addMenuCategory,
  //       },
  //       menusMenuCategoriesLocations: {
  //         setMenusMenuCategoriesLocations,
  //       },
  //       menusAddonCategories: {
  //         setMenusAddonCategories,
  //       },
  //       addons: {
  //         setAddons,
  //       },
  //       addonCategories: {
  //         setAddonCategories,
  //       },
  //       tables: {
  //         setTables,
  //       },
  //       locations: {
  //         setLocations,
  //       },
  //       orderlines: {
  //         setOrderlines,
  //       },
  //       orders: {
  //         setOrders,
  //       },
  //     },
  //   };
};
