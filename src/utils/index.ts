import { config } from "@/config/config";

export const getAccessToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("accessToken");
  return "";
};
export const getSelectedLocationId = () => {
  if (typeof window !== "undefined")
    return localStorage.getItem("selectedLocationId");
  return "";
};
export const setSelectedLocationId = (selectedLocationId: string) => {
  if (typeof window !== "undefined")
    return localStorage.setItem(
      "selectedLocationId",
      String(selectedLocationId)
    );
  return "";
};
export const selectMuiStyle = {
  ITEM_HEIGHT: 48,
  ITEM_PADDING_TOP: 8,
};

/**
 * return is number[] update from db
 * @param oldIds number[]
 * @param newIds number[]
 * @returns number[]
 *
 * @example
 * let oldIds = [3, 4, 5, 2];
 * let newIds = [3, 5, 6, 1];
 * idsToUpdate(oldIds, newIds) -> // updateIds 6,1
 */
export const idsToUpdate = (oldIds: number[], newIds: number[]): number[] => {
  return newIds.filter((newId) => !oldIds.includes(newId));
};

/**
 * return is number[] delete from db
 * @param oldIds number[]
 * @param newIds number[]
 * @returns number[]
 *
 * @example
 * let oldIds = [3, 4, 5, 2];
 * let newIds = [3, 5, 6, 1];
 * idsToDelete(oldIds, newIds) -> //  deleteIds 4,2
 */
export const idsToDelete = (oldIds: number[], newIds: number[]) => {
  return oldIds.filter((oldId) => !newIds.includes(oldId));
};
export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `${config.orderBaseRoute}/location/${locationId}/table/${tableId}`;
};
export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/happy-pos/qrcode/win-min-aung/locationId-${locationId}-tableId-${tableId}.png`;
};
export const defaultQRCodeSrc = "/defaultQRCode.png";
export const defaultMenuSrc = "/test.png";

export const orderByAacDesc = ({ order }: { order: "asc" | "desc" }) => {
  return {
    orderBy: {
      id: order,
    },
  };
};

export const getMenusByOrderId = () => {}; // -->menus
