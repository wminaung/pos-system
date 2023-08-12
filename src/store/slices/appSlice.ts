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
import { menusActions } from "./menusSlice";
import { companyActions } from "./companySlice";
import { menuCategoriesActions } from "./menuCategoriesSlice";
import { addonsActions } from "./addonsSlice";
import { locationsActions } from "./locationsSlice";
import { addonCategoriesActions } from "./addonCategoriesSlice";
import { tablesActions } from "./tablesSlice";
import { orderlinesActions } from "./orderlinesSlice";
import { ordersActions } from "./ordersSlice";
import { menusAddonCategoriesActions } from "./menusAddonCategoriesSlice";
import { menusMenuCategoriesLocationsActions } from "./menusMenuCategoriesLocationsSlice";

interface AppState {
  isLoading: boolean;
  error: Error | null;
  selectedLocationId?: string | null;
  init: boolean;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  selectedLocationId: null,
  init: false,
};
export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (locationId: string | undefined, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(appActions.setInit(true));
    dispatch(appActions.setAppLoading(true));
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/app?locationId=${locationId}`
    );
    if (!response.ok) {
      dispatch(appActions.setAppLoading(false));

      console.log("connection time out");
      return;
    }
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

    dispatch(
      setAppSelectedLocationId(
        selectedLocationId ? String(selectedLocationId) : null
      )
    );

    dispatch(menusActions.setMenus(menus));
    dispatch(companyActions.setCompany(company));
    dispatch(menuCategoriesActions.setMenuCategories(menuCategories));
    dispatch(locationsActions.setLocations(locations));
    dispatch(addonsActions.setAddons(addons));
    dispatch(addonCategoriesActions.setAddonCategories(addonCategories));
    dispatch(tablesActions.setTables(tables));
    dispatch(orderlinesActions.setOrderlines(orderlines));
    dispatch(ordersActions.setOrders(orders));
    dispatch(
      menusAddonCategoriesActions.setMenusAddonCategories(menusAddonCategories)
    );
    dispatch(
      menusMenuCategoriesLocationsActions.setMenusMenuCategoriesLocations(
        menusMenuCategoriesLocations
      )
    );

    /* final */
    dispatch(appActions.setAppLoading(false));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
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

  const fetchData = (locationId?: string) => {
    dispatch(
      fetchAppData(
        locationId ? locationId : (state.app.selectedLocationId as string)
      )
    );
  };
  return {
    state,
    dispatch,
    fetchData,
    actions: {
      fetchAppData,
      app: { ...appActions },

      menus: {
        ...menusActions,
      },
      company: {
        ...companyActions,
      },
      menuCategories: {
        ...menuCategoriesActions,
      },
      menusMenuCategoriesLocations: {
        ...menusMenuCategoriesLocationsActions,
      },
      menusAddonCategories: {
        ...menusAddonCategoriesActions,
      },
      addons: {
        ...addonsActions,
      },
      addonCategories: {
        ...addonCategoriesActions,
      },
      tables: {
        ...tablesActions,
      },
      locations: {
        ...locationsActions,
      },
      orderlines: {
        ...orderlinesActions,
      },
      orders: {
        ...ordersActions,
      },
    },
  };
};
