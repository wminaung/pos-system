import { createContext, useEffect } from "react";
import {
  Addon,
  AddonCategory,
  BaseProps,
  Company,
  Location,
  Menu,
  MenuCategory,
  MenuMenuCategoryLocation,
} from "../typings/types";
import { useContext, useState } from "react";
import { config } from "@/config/config";
import {
  BackofficeUpdateContextType,
  BackofficeUpdateContext,
  defaultBackofficeUpdateContext,
} from "./BackofficeUpdateContext";
import { getSelectedLocationId, setSelectedLocationId } from "@/utils";
import { useSession } from "next-auth/react";

interface BackofficeContextType {
  company: Company | null;
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  locations: Location[];
  selectedLocationId?: string | null;
}

export const defaultBackofficeContext: BackofficeContextType = {
  company: null,
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusMenuCategoriesLocations: [],
  locations: [],
  selectedLocationId: "",
};

const BackofficeContext = createContext(defaultBackofficeContext);

export const useBackoffice = () => {
  return useContext(BackofficeContext);
};

export const useBackofficeUpdate = () => {
  return useContext(BackofficeUpdateContext);
};

// ******** <BackofficeProvider />

interface Props extends BaseProps {}

export const BackofficeProvider = ({ children }: Props) => {
  // **********************************
  const [data, updateData] = useState(defaultBackofficeContext);

  const { selectedLocationId } = data;

  const { data: session } = useSession();
  console.log("session", session);
  console.log("AllData", { data });

  useEffect(() => {
    console.log(selectedLocationId);
    selectedLocationId && setSelectedLocationId(selectedLocationId);
    session && fetchData();
  }, [session, selectedLocationId]);

  // ? fetch all data
  const fetchData = async (callback?: (error?: any, data?: any) => void) => {
    const res = await fetch(
      `${config.backofficeApiBaseUrl}?location=${getSelectedLocationId()}`
    );

    if (!res.ok) return; // console.log(res.status, res.statusText);

    const resData = await res.json();
    const {
      company,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusMenuCategoriesLocations,
      locations,
      selectedLocationId,
    } = resData;

    /*
    todo test
    */
    if (!getSelectedLocationId()) {
      setSelectedLocationId(String(selectedLocationId));
    }
    updateData({
      ...data,
      company,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusMenuCategoriesLocations,
      locations,
      selectedLocationId: getSelectedLocationId(),
    });

    callback && callback(undefined, resData);
  };

  return (
    <BackofficeContext.Provider value={{ ...data }}>
      <BackofficeUpdateContext.Provider
        value={{
          ...defaultBackofficeUpdateContext,
          updateData,
          fetchData,
        }}
      >
        {children}
      </BackofficeUpdateContext.Provider>
    </BackofficeContext.Provider>
  );
};
/*
{
  //! ---------------------- menus ----------------------

  // ? create -> Menu
  const headersObj = {
    Authorization: `Bearer ${accessToken}`,
  };
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

*/
