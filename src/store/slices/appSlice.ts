import { config } from "@/config/config";

import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { menusActions } from "./menusSlice";
import { menuCategoriesActions } from "./menuCategoriesSlice";
import { tablesActions } from "./tablesSlice";
import { Api } from "@/typings/Api";
import { menusMenuCategoriesActions } from "./menusMenuCategories";
import { FormAction } from "@/utils/enums";

interface AppState {
  isLoading: boolean;
  error: Error | null;
  selectedLocationId?: string | null;
  init: boolean;
  formAction: FormAction;
  selectedMenuId: number;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  selectedLocationId: null,
  init: false,
  formAction: FormAction.create,
  selectedMenuId: 0,
};
export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (locationId: string | undefined, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(appActions.setInit(true));
    dispatch(appActions.setAppLoading(true));
    const response = await fetch(`${config.backofficeApiBaseUrl}/app`);
    if (!response.ok) {
      dispatch(appActions.setAppLoading(false));
      console.log("connection time out");
      return;
    }
    const responseJson = await response.json();
    const { menus, menuCategories, menusMenuCategories, tables } =
      responseJson as Api.Response.App.Get;
    console.log("responseJson", responseJson);
    dispatch(menusActions.setMenus(menus));
    dispatch(menuCategoriesActions.setMenuCategories(menuCategories));
    dispatch(
      menusMenuCategoriesActions.setMenusMenuCategories(menusMenuCategories)
    );
    dispatch(tablesActions.setTables(tables));
    dispatch(appActions.setInit(true));
    // dispatch(companyActions.setCompany(company));
    // dispatch(locationsActions.setLocations(locations));
    // dispatch(addonsActions.setAddons(addons));
    // dispatch(addonCategoriesActions.setAddonCategories(addonCategories));

    // dispatch(orderlinesActions.setOrderlines(orderlines));
    // dispatch(ordersActions.setOrders(orders));
    // dispatch(
    //   menusAddonCategoriesActions.setMenusAddonCategories(menusAddonCategories)
    // );

    // dispatch(
    //   setAppSelectedLocationId(
    //     selectedLocationId ? String(selectedLocationId) : null
    //   )
    // );
    // dispatch(
    //   menusMenuCategoriesLocationsActions.setMenusMenuCategoriesLocations(
    //     menusMenuCategoriesLocations
    //   )
    // );

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
    setFormAction: (state, action: PayloadAction<FormAction>) => {
      state.formAction = action.payload;
    },
    setSelectedMenuId: (state, action: PayloadAction<number>) => {
      state.selectedMenuId = action.payload;
    },
  },
});
export const { setAppLoading } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;
export const selectMenus = (state: RootState) => state.menus.items;
export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;
export const selectTables = (state: RootState) => state.tables.items;
export const selectMenusMenuCategories = (state: RootState) =>
  state.menusMenuCategories.items;

export const appData = createSelector(
  [
    selectApp,
    selectMenus,
    selectMenuCategories,
    selectMenusMenuCategories,
    selectTables,
  ],
  (app, menus, menuCategories, menusMenuCategories, tables) => {
    return {
      app,
      menus,
      menuCategories,
      menusMenuCategories,
      tables,
    };
  }
);
export const appActions = appSlice.actions;
export default appSlice.reducer;

// export const selectCompany = (state: RootState) => state.company.item;

// export const selectAddons = (state: RootState) => state.addons.items;
// export const selectAddonCategories = (state: RootState) =>
//   state.addonCategories.items;
// export const selectLocations = (state: RootState) => state.locations.items;
// export const selectOrderlines = (state: RootState) => state.orderlines.items;
// export const selectOrders = (state: RootState) => state.orders.items;
// export const selectMenusAddonCategories = (state: RootState) =>
// state.menusAddonCategories.items;
