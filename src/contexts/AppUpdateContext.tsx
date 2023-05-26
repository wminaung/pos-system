import { createContext } from "react";
import {
  Callback,
  CreateMenuCategoryPayload,
  CreateMenuPayload,
  UpdateMenuCategoryPayload,
  UpdateMenuCategoryQuery,
  UpdateMenuQuery,
} from "../typings/types";

export interface CreateAddonCategoryPayload {
  name: string;
}
export interface UpdateAddonCategoryQuery {
  addonCategoryId: number;
  payload: CreateAddonCategoryPayload;
}

export interface CreateAddonPayload {
  name: string;
  price: number;
  required: boolean;
  addonCategoryId: number | null;
}
export interface UpdateAddonQuery {
  addonId: number;
  payload: CreateAddonPayload;
}

interface MenusCRUD {
  createMenu: (
    payload: CreateMenuPayload,
    callback?: (error?: any, data?: any) => void
  ) => void;
  deleteMenu: (
    menuId: number,
    callback?: (error?: any, data?: any) => void
  ) => void;
  updateMenu: (
    query: UpdateMenuQuery,
    callback?: (error?: any, data?: any) => void
  ) => void;
}

interface MenuCategoriesCRUD {
  createMenuCategory: (
    payload: CreateMenuCategoryPayload,
    callback: Callback<any, any>
  ) => void;
  deleteMenuCategory: (
    menuCategoryId: number,
    callback?: Callback<any, any>
  ) => void;
  updateMenuCategory: (
    query: UpdateMenuCategoryQuery,
    callback?: (error?: any, data?: any) => void
  ) => void;
}

export interface AddonCategoryCRUD {
  createAddonCategory: (
    payload: CreateAddonCategoryPayload,
    callback?: Callback<any, any>
  ) => void;
  deleteAddonCategory: (
    addonCategoryId: number,
    callback?: Callback<any, any>
  ) => void;
  updateAddonCategory: (
    query: UpdateAddonCategoryQuery,
    callback?: Callback<any, any>
  ) => void;
}

export interface AddonCRUD {
  createAddon: (
    payload: CreateAddonPayload,
    callback?: Callback<any, any>
  ) => void;
  deleteAddon: (addonId: number, callback?: Callback<any, any>) => void;
  updateAddon: (query: UpdateAddonQuery, callback?: Callback<any, any>) => void;
}

export interface AppUpdateContextType {
  updateData: (data: any) => void;

  fetchData: () => Promise<void>;
}

export const defaultAppUpdateContext: AppUpdateContextType =
  {} as AppUpdateContextType;

export const AppUpdateContext = createContext({} as AppUpdateContextType);

// export const defaultAppUpdateContext: AppUpdateContextType = {
//   updateData: () => {},
//   fetchData: () => {},
//   createMenu: () => {},
//   deleteMenu: () => {},
//   updateMenu: () => {},
//   createMenuCategory: () => {},
//   deleteMenuCategory: () => {},
//   updateMenuCategory: () => {},
//   createAddon: () => {},
//   deleteAddon: () => {},
//   updateAddon: () => {},
// };
