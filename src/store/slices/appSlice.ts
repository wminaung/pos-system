import { config } from "@/config/config";
import { AppDataResponse } from "@/typings/types";
import { getSelectedLocationId } from "@/utils";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "..";
import { setMenus } from "./menusSlice";
import { setCompany } from "./companySlice";
import { setMenuCategories } from "./menuCategoriesSlice";
import { setAddons } from "./addonsSlice";

interface AppState {
  isLoading: boolean;
  error: Error | null;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
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

    dispatch(setMenus(menus));
    dispatch(setCompany(company));
    dispatch(setMenuCategories(menuCategories));
    thunkAPI.dispatch(setAppLoading(false));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setAppLoading } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;
export const selectMenus = (state: RootState) => state.menus.items;
export const selectCompany = (state: RootState) => state.company.item;
export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;
export const selectAddons = (state: RootState) => state.addons.items;

export const appData = createSelector(
  [selectApp, selectMenus, selectCompany, selectMenuCategories, selectAddons],
  (app, menus, company, menuCategories, addons) => {
    return { app, menus, company, menuCategories, addons };
  }
);

export default appSlice.reducer;

export const useAppSlice = () => {
  const state = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const actions = appSlice.actions;
  return {
    state,
    dispatch,
    actions: {
      ...actions,
      setMenus,
      setCompany,
      setMenuCategories,
      setAddons,
      fetchAppData,
    },
  };
};
