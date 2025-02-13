import { useEffect } from "react";
import getLocation from "../../utility/getLatLong";
const LocationIntelligence = () => {
  const returnLatLong = async () => {
    const res: any = await getLocation();
    // Permission granted
    if (res && res.locationAccess && res.latLong) {
      const { lat, lng } = res.latLong;
      localStorage.setItem("geoLat", lat);
      localStorage.setItem("geoLong", lng);
    } else {
    }
  };
  useEffect(() => {
   
    returnLatLong();
  }, []);

  return <></>;
};

export default LocationIntelligence;
