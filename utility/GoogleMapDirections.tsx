import { GOOGLE_MAP_DIRECTIONS_API } from "./APIConstants";

export const GoogleMapDirections = async (
  userLat: string,
  userLng: string,
  StoreLat: string,
  StoreLng: string
) => {
  const origin = userLat && userLng ? `${userLat},${userLng}` : "";
  const storeLat = StoreLat || "";
  const storeLng = StoreLng || "";
  const destination = storeLat && storeLng ? `${storeLat},${storeLng}` : "";
  if (typeof window !== "undefined") {
    window.open(GOOGLE_MAP_DIRECTIONS_API(origin, destination), "_blank");
  }
};
