// TODO --> store

import { configureStore } from "@reduxjs/toolkit";
import menusReducer from "@/store/slices/menusSlice";
import menuCategoriesReducer from "./slices/menuCategoriesSlice";
import appReducer from "./slices/appSlice";
import tablesReducer from "./slices/tablesSlice";
import menusMenuCategoriesReducer from "./slices/menusMenuCategories";

export const store = configureStore({
  reducer: {
    app: appReducer,
    menus: menusReducer,
    menuCategories: menuCategoriesReducer,
    menusMenuCategories: menusMenuCategoriesReducer,
    tables: tablesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
