// TODO --> store

import { configureStore } from "@reduxjs/toolkit";
import menusSlice from "@/store/slices/menusSlice";
import companySlice from "./slices/companySlice";
import menuCategoriesSlice from "./slices/menuCategoriesSlice";
import addonsSlice from "./slices/addonsSlice";
import appSlice from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    menus: menusSlice,
    company: companySlice,
    menuCategories: menuCategoriesSlice,
    addons: addonsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
