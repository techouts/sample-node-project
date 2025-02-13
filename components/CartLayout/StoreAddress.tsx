import { Stack, Typography } from "@mui/material";
import React from "react";
import { isMobile } from "../../utility/commonUtility";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function StoreAddress({
  address,
  storeCords,
  userCords,
}: {
  address: string;
  storeCords: { lat: number; long: number } | undefined;
  userCords: {
    lat: number;
    long: number;
  };
}) {
  const redirectToGoogleMaps = async (
    StoreLat: string | undefined,
    StoreLng: string | undefined
  ) => {
    if (!storeCords) return;
    const origin =
      userCords?.lat && userCords?.long
        ? `${userCords?.lat},${userCords?.long}`
        : "";
    const storeLat = StoreLat || "";
    const storeLng = StoreLng || "";
    const destination = storeLat && storeLng ? `${storeLat},${storeLng}` : "";
    isMobile()
      ? window.location.assign(
          `${process.env.NEXT_PUBLIC_GOOGLE_MAP_URL}?api=1&origin=${origin}&destination=${destination}&travelmode=car`
        )
      : window.open(
          `${process.env.NEXT_PUBLIC_GOOGLE_MAP_URL}?api=1&origin=${origin}&destination=${destination}&travelmode=car`,
          "_blank"
        );
  };
  return (
    <Stack
      p={2}
      mb={1}
      sx={{ background: "#F8EDF1", width: "100%" }}
      flexDirection={"column"}
    >
      <Typography sx={{fontWeight:"bold"}}>{"Pay & Pick Up Store Address:"}</Typography>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography>{address}</Typography>
        <LocationOnIcon
          sx={{ color: "#DEA3B7" , cursor:"pointer"}}
          onClick={() => {
            redirectToGoogleMaps(
              storeCords?.lat.toString(),
              storeCords?.long.toString()
            );
          }}
        />
      </Stack>
    </Stack>
  );
}
