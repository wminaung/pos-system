import { config } from "@/config/config";
import { AppDataResponse, OrderDataResponse } from "@/typings/types";

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
import { locationActions } from "./locationSlice";
import { orderlineItemsActions } from "./orderlineItemsSlice";

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

interface ClientState {
  isLoading: boolean;
  error: Error | null;
  locationId?: string | null;
}

const initialState: ClientState = {
  isLoading: false,
  error: null,
  locationId: null,
};
export const fetchClientData = createAsyncThunk(
  "client/fetchClientData",
  async (locationId: string, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(clientActions.setClientLoading(true));
    const response = await fetch(
      `${config.orderApiBaseUrl}?locationId=${locationId}`
    );

    const responseJson = await response.json();

    const {
      menuCategories,
      menus,
      addonCategories,
      addons,
      location,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      orderlineItems,
    } = responseJson as OrderDataResponse;

    dispatch(clientActions.setLocationId(String(locationId)));

    dispatch(menusActions.setMenus(menus));
    dispatch(menuCategoriesActions.setMenuCategories(menuCategories));
    dispatch(locationActions.setLocation(location));
    dispatch(addonsActions.setAddons(addons));
    dispatch(addonCategoriesActions.setAddonCategories(addonCategories));
    dispatch(
      menusAddonCategoriesActions.setMenusAddonCategories(menusAddonCategories)
    );
    dispatch(
      menusMenuCategoriesLocationsActions.setMenusMenuCategoriesLocations(
        menusMenuCategoriesLocations
      )
    );

    /* final */
    dispatch(clientActions.setClientLoading(false));
  }
);

// *** Slice ***
export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLocationId: (state, action: PayloadAction<string>) => {
      state.locationId = action.payload;
    },
  },
});
export const clientActions = clientSlice.actions;
export default clientSlice.reducer;

export const selectMenus = (state: RootState) => state.menus.items;

export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;
export const selectAddons = (state: RootState) => state.addons.items;
export const selectAddonCategories = (state: RootState) =>
  state.addonCategories.items;
export const selectLocation = (state: RootState) => state.location.item;
export const selectMenusAddonCategories = (state: RootState) =>
  state.menusAddonCategories.items;
export const selectMenusMenuCategoriesLocations = (state: RootState) =>
  state.menusMenuCategoriesLocations.items;

export const selectOrderlineItems = (state: RootState) =>
  state.orderlineItems.items;
//   fetchData: () => void;
// }
/*
cart: Order | null;
//   orderlineItems: OrderlineItem[];
*/

export const clientData = createSelector(
  [
    selectMenuCategories,
    selectMenus,
    selectAddonCategories,
    selectAddons,
    selectLocation,
    selectMenusAddonCategories,
    selectMenusMenuCategoriesLocations,
    selectOrderlineItems,
  ],
  (
    menuCategories,
    menus,
    addonCategories,
    addons,
    location,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    orderlineItems
  ) => {
    return {
      menuCategories,
      menus,
      addonCategories,
      addons,
      location,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      orderlineItems,
    };
  }
);

export const useClientSlice = () => {
  const state = useAppSelector(clientData);
  const dispatch = useAppDispatch();

  const fetchData = (selectedLocationId: string) => {
    dispatch(fetchClientData(selectedLocationId));
  };

  return {
    state,
    dispatch,
    fetchData,
    actions: {
      fetchClientData: fetchClientData,
      ...clientActions,
      ...menusActions,
      ...menuCategoriesActions,
      ...addonsActions,
      ...addonCategoriesActions,
      ...locationActions,
      ...menusAddonCategoriesActions,
      ...menusMenuCategoriesLocationsActions,
      ...orderlineItemsActions,
    },
  };
};
