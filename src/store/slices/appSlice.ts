import { config } from "@/config/config";
import { AppDataResponse } from "@/typings/types";
import { getSelectedLocationId } from "@/utils";
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

interface AppState {
  isLoading: boolean;
  error: Error | null;
  selectedLocationId?: string | null;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  selectedLocationId: null,
};
export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
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

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAppSelectedLocationId: (
      state,
      action: PayloadAction<string | null | undefined>
    ) => {
      state.selectedLocationId = action.payload;
    },
  },
});
export const { setAppLoading, setAppSelectedLocationId } = appSlice.actions;

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

export const appData = createSelector(
  [
    selectApp,
    selectMenus,
    selectCompany,
    selectMenuCategories,
    selectAddons,
    selectAddonCategories,
    selectTables,
    selectLocations,
    selectOrderlines,
    selectOrders,
    selectMenusAddonCategories,
    selectMenusMenuCategoriesLocations,
  ],
  (
    app,
    menus,
    company,
    menuCategories,
    addons,
    addonCategories,
    tables,
    locations,
    orderlines,
    orders,
    menusAddonCategories,
    menusMenuCategoriesLocations
  ) => {
    return {
      app,
      menus,
      company,
      menuCategories,
      addons,
      addonCategories,
      tables,
      locations,
      orderlines,
      orders,
      menusAddonCategories,
      menusMenuCategoriesLocations,
    };
  }
);
export const appActions = appSlice.actions;
export default appSlice.reducer;

export const useAppSlice = () => {
  const state = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const actions = appSlice.actions;
  const fetchData = () => {
    dispatch(fetchAppData(state.app.selectedLocationId as string));
  };
  return {
    state,
    dispatch,
    fetchData,
    actions: {
      fetchAppData,
      app: { ...actions },

      menus: {
        setMenus,
      },
      company: {
        setCompany,
      },
      menuCategories: {
        setMenuCategories,
        addMenuCategory,
      },
      menusMenuCategoriesLocations: {
        setMenusMenuCategoriesLocations,
      },
      menusAddonCategories: {
        setMenusAddonCategories,
      },
      addons: {
        setAddons,
      },
      addonCategories: {
        setAddonCategories,
      },
      tables: {
        setTables,
      },
      locations: {
        setLocations,
      },
      orderlines: {
        setOrderlines,
      },
      orders: {
        setOrders,
      },
    },
  };
};
