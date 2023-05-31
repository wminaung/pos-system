import { createContext } from "react";

export interface BackofficeUpdateContextType {
  updateData: (data: any) => void;
  fetchData: () => Promise<void>;
}

export const defaultBackofficeUpdateContext: BackofficeUpdateContextType =
  {} as BackofficeUpdateContextType;

export const BackofficeUpdateContext = createContext(
  {} as BackofficeUpdateContextType
);

// export const defaultBackofficeUpdateContext: BackofficeUpdateContextType = {
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
