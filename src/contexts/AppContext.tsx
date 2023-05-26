import { createContext, useEffect } from "react";
import {
  Addon,
  AddonCategory,
  BaseProps,
  Callback,
  CreateMenuCategoryPayload,
  CreateMenuPayload,
  Location,
  Menu,
  MenuCategory,
  MenuLocation,
  MenuMenuCategory,
  UpdateMenuCategoryQuery,
  UpdateMenuQuery,
} from "../typings/types";
import { useContext, useState } from "react";
import { config } from "@/config/config";
import {
  AppUpdateContext,
  CreateAddonCategoryPayload,
  CreateAddonPayload,
  UpdateAddonCategoryQuery,
  UpdateAddonQuery,
  defaultAppUpdateContext,
} from "./AppUpdateContext";
import { getAccessToken, getSelectedLocationId } from "@/utils";
import { useSession } from "next-auth/react";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menusMenuCategories: MenuMenuCategory[];
  menusLocations: MenuLocation[];
  locations: Location[];
  accessToken: string | null;
  selectedLocationId?: string | null;
  isFetch: boolean;
}

export const defaultAppContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusMenuCategories: [],
  menusLocations: [],
  locations: [],
  accessToken: "",
  selectedLocationId: "",
  isFetch: false,
};

const AppContext = createContext(defaultAppContext);

export const useApp = () => {
  return useContext(AppContext);
};

export const useAppUpdate = () => {
  return useContext(AppUpdateContext);
};

// ******** <AppProvider />

interface Props extends BaseProps {}

export const AppProvider = ({ children }: Props) => {
  // **********************************
  const [data, updateData] = useState(defaultAppContext);

  const { accessToken, selectedLocationId } = data;

  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("AllData", data);

  useEffect(() => {
    // session && fetchData();
    session && fetchData();
  }, [session?.user]);

  const headersObj = {
    Authorization: `Bearer ${accessToken}`,
  };

  // ? fetch all data
  const fetchData = async (callback?: (error?: any, data?: any) => void) => {
    updateData({ ...data, isFetch: true });
    const res = await fetch(`${config.apiBaseUrl}/app`);

    // if (res.status === 401) return (window.location.href = "/logout");
    if (!res.ok) return; // console.log(res.status, res.statusText);

    const resData = await res.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusMenuCategories,
      menusLocations,
      locations,
      selectedLocationId,
    } = resData;

    /*
    todo test
    */

    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusMenuCategories,
      menusLocations,
      locations,
      isFetch: false,
      selectedLocationId: getSelectedLocationId() ?? String(selectedLocationId),
    });

    callback && callback(undefined, resData);
  };

  {
    //! ---------------------- menus ----------------------

    // ? create -> Menu

    const createMenu = async (
      payload: CreateMenuPayload,
      callback?: (error?: any, data?: any) => void
    ) => {
      const { ...menu } = payload;

      const res = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headersObj,
        },
        body: JSON.stringify(menu),
      });
      const data = await res.json();
      if (!data) {
        callback && callback("fail to create");
        return;
      }
      await fetchData();
      callback && callback(undefined, data);
    };

    // ? delete -> Menu
    const deleteMenu = async (
      menuId: number,
      callback?: (error?: any, data?: any) => void
    ) => {
      const res = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
        method: "DELETE",
        headers: {
          ...headersObj,
        },
      });
      const data = await res.json();
      if (!data) {
        callback && callback("fail to create");
        return;
      }
      await fetchData();
      callback && callback(undefined, data);
    };

    // ? update -> Menu
    const updateMenu = async (
      { menuId, payload }: UpdateMenuQuery,
      callback?: (error?: any, data?: any) => void
    ) => {
      try {
        const mRes = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...headersObj,
          },
          body: JSON.stringify(payload),
        });
        const mData = await mRes.json();
        if (mData) {
          await fetchData();
          callback && callback(undefined, { mData });
        }
      } catch (error) {
        callback && callback(error);
      }

      return;
    };

    // ! ---------------------- menu_categories ----------------------

    // ? create
    const createMenuCategory = async (
      payload: CreateMenuCategoryPayload,
      callback?: Callback<any, any>
    ) => {
      const res = await fetch(`${config.apiBaseUrl}/menuCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headersObj,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data) {
        callback && callback("fail to create");
        return;
      }
      await fetchData();
      callback && callback(undefined, data);
    };

    // ? delete
    const deleteMenuCategory = async (
      menuCategoryId: number,
      callback?: (error?: any, data?: any) => void
    ) => {
      const res = await fetch(
        `${config.apiBaseUrl}/menuCategories/${menuCategoryId}`,
        {
          method: "DELETE",
          headers: {
            ...headersObj,
          },
        }
      );
      const data = await res.json();
      if (!data) {
        callback && callback("fail to delete");
        return;
      }
      await fetchData();
      callback && callback(undefined, data);
    };

    // ? update -> Menu
    const updateMenuCategory = async (
      query: UpdateMenuCategoryQuery,
      callback?: (error?: any, data?: any) => void
    ) => {
      const { menuCategoryId, payload } = query;
      try {
        const menuCategoryRes = await fetch(
          `${config.apiBaseUrl}/menuCategories/${menuCategoryId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...headersObj,
            },
            body: JSON.stringify(payload),
          }
        );
        const menuCategoryData = await menuCategoryRes.json();
        if (menuCategoryData) {
          await fetchData();
          callback && callback(undefined, { menuCategoryData });
        }
      } catch (error) {
        callback && callback(error);
      }
      return;
    };

    // ! ---------------------- addon_categories ----------------------

    // ? create

    const createAddonCategory = async (
      payload: CreateAddonCategoryPayload,
      callback?: Callback<any, any>
    ) => {
      const res = await fetch(`${config.apiBaseUrl}/addonCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headersObj,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data) {
        callback && callback("fail to create");
        return;
      }
      await fetchData();
      callback && callback(undefined, data);
    };

    // ? delete
    const deleteAddonCategory = async (
      addonCategoryId: number,
      callback?: (error?: any, data?: any) => void
    ) => {
      const res = await fetch(
        `${config.apiBaseUrl}/addonCategories/${addonCategoryId}`,
        {
          method: "DELETE",
          headers: {
            ...headersObj,
          },
        }
      );
      const data = await res.json();
      if (!data) {
        callback && callback("fail to delete");
        return;
      }
      await fetchData();
      callback && callback(undefined, data);
    };

    // ? update
    const updateAddonCategory = async (
      query: UpdateAddonCategoryQuery,
      callback?: (error?: any, data?: any) => void
    ) => {
      const { addonCategoryId, payload } = query;

      try {
        const addonCategoryRes = await fetch(
          `${config.apiBaseUrl}/addonCategories/${addonCategoryId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...headersObj,
            },
            body: JSON.stringify(payload),
          }
        );
        const addonCategoryData = await addonCategoryRes.json();
        if (addonCategoryData) {
          await fetchData();
          callback && callback(undefined, { addonCategoryData });
        }
      } catch (error) {
        callback && callback(error);
      }
      return;
    };

    // ! ---------------------- addon ----------------------

    // ? create
    const createAddon = async (
      payload: CreateAddonPayload,
      callback?: Callback<any, any>
    ) => {
      const res = await fetch(`${config.apiBaseUrl}/addons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headersObj,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data) {
        callback && callback("fail to create");
        return;
      }
      await fetchData();
      callback && callback(undefined, data);
    };

    // ? delete
    const deleteAddon = async (
      addonId: number,
      callback?: (error?: any, data?: any) => void
    ) => {
      const res = await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
        method: "DELETE",
        headers: {
          ...headersObj,
        },
      });
      const data = await res.json();
      if (!data) {
        callback && callback("fail to delete");
        return;
      }
      await fetchData();
      callback && callback(undefined, data);
    };

    // ? update
    const updateAddon = async (
      query: UpdateAddonQuery,
      callback?: (error?: any, data?: any) => void
    ) => {
      const { addonId, payload } = query;
      try {
        const addonRes = await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...headersObj,
          },
          body: JSON.stringify(payload),
        });
        const addonData = await addonRes.json();
        if (addonData) {
          await fetchData();
          callback && callback(undefined, { addonData });
        }
      } catch (error) {
        callback && callback(error);
      }
      return;
    };
  }
  // console.log(
  //   data.accessToken,
  //   ":: ac ::",
  //   data.selectedLocationId,
  //   ":: ld ::",
  //   data.menus
  // );

  return (
    <AppContext.Provider value={{ ...data }}>
      <AppUpdateContext.Provider
        value={{
          ...defaultAppUpdateContext,
          updateData,
          fetchData,
        }}
      >
        {children}
      </AppUpdateContext.Provider>
    </AppContext.Provider>
  );
};
