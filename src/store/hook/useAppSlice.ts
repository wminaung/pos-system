import { useAppDispatch, useAppSelector } from "./hook";
import { appActions, appData, fetchAppData } from "../slices/appSlice";
import { menusActions } from "../slices/menusSlice";
import { menuCategoriesActions } from "../slices/menuCategoriesSlice";
import { tablesActions } from "../slices/tablesSlice";
import { menusMenuCategoriesActions } from "../slices/menusMenuCategories";

const useAppSlice = () => {
  const state = useAppSelector(appData);
  const dispatch = useAppDispatch();

  const fetchData = (locationId?: string) => {
    dispatch(fetchAppData(locationId));
  };

  return {
    state,
    dispatch,
    fetchData,
    actions: {
      // fetchAppData,
      app: { ...appActions },
      menus: {
        ...menusActions,
      },
      menuCategories: {
        ...menuCategoriesActions,
      },
      menusMenuCategories: {
        ...menusMenuCategoriesActions,
      },
      tables: {
        ...tablesActions,
      },
    },
  };
};

export default useAppSlice;
