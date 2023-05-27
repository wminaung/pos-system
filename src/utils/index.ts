export const getAccessToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("accessToken");
  return "";
};
export const getSelectedLocationId = () => {
  if (typeof window !== "undefined")
    return localStorage.getItem("selectedLocation");
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
