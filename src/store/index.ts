// TODO --> store

import { configureStore } from "@reduxjs/toolkit";
import menusSlice from "@/store/slices/menusSlice";
import companySlice from "./slices/companySlice";
import menuCategoriesSlice from "./slices/menuCategoriesSlice";
import addonsSlice from "./slices/addonsSlice";
import appSlice from "./slices/appSlice";
import tablesSlice from "./slices/tablesSlice";
import locationsSlice from "./slices/locationsSlice";
import addonCategoriesSlice from "./slices/addonCategoriesSlice";
import orderlinesSlice from "./slices/orderlinesSlice";
import ordersSlice from "./slices/ordersSlice";
import menusMenuCategoriesLocationsSlice from "./slices/menusMenuCategoriesLocationsSlice";
import menusAddonCategoriesSlice from "./slices/menusAddonCategoriesSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    menus: menusSlice,
    company: companySlice,
    menuCategories: menuCategoriesSlice,
    addons: addonsSlice,
    tables: tablesSlice,
    locations: locationsSlice,
    addonCategories: addonCategoriesSlice,
    orderlines: orderlinesSlice,
    orders: ordersSlice,
    menusMenuCategoriesLocations: menusMenuCategoriesLocationsSlice,
    menusAddonCategories: menusAddonCategoriesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
