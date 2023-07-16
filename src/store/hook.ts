import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { appActions, appData, fetchAppData } from "./slices/appSlice";
import { setAddonCategories } from "./slices/addonCategoriesSlice";
import { setAddons } from "./slices/addonsSlice";
import { setCompany } from "./slices/companySlice";
import { setLocations } from "./slices/locationsSlice";
import { setMenuCategories } from "./slices/menuCategoriesSlice";
import { setMenus } from "./slices/menusSlice";
import { setOrderlines } from "./slices/orderlinesSlice";
import { setTables } from "./slices/tablesSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useAppSlice = () => {
//   const state = useAppSelector(appData);
//   const dispatch = useAppDispatch();
//   const actions = appActions;
//   return {
//     state,
//     dispatch,
//     actions: {
//       ...actions,
//       app: { fetchAppData },

//       menus: {
//         setMenus,
//       },
//       company: {
//         setCompany,
//       },
//       menuCategories: {
//         setMenuCategories,
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
//     },
//   };
// };
