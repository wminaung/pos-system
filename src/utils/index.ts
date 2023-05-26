export const getAccessToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("accessToken");
  return "";
};
export const getSelectedLocationId = () => {
  if (typeof window !== "undefined")
    return localStorage.getItem("selectedLocation");
  return "";
};
