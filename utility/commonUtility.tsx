import {
  TIER0_LOGO,
  TIER1_LOGO,
  TIER2_LOGO,
  TIER3_LOGO,
  TIER4_LOGO,
  USER_TIER0_SHORT_TEXT,
  USER_TIER1_SHORT_TEXT,
  USER_TIER2_SHORT_TEXT,
  USER_TIER3_SHORT_TEXT,
  USER_TIER4_SHORT_TEXT,
} from "../components/Profile/constant";
import { Cookies } from "react-cookie";

import useStorage from "./useStoarge";
const { getItem, setItem } = useStorage();
const cookie = new Cookies();

export const getTierLogo = (tier: any) => {
  if (tier == "na") return "";
  switch (tier.toLowerCase()) {
    case "tier0":
      return TIER0_LOGO;
    case "tier1":
      return TIER1_LOGO;
    case "tier2":
      return TIER2_LOGO;
    case "tier3":
      return TIER3_LOGO;
    case "tier4":
      return TIER4_LOGO;
    default:
      return "";
  }
};

export const getTierTitle = (tier: any) => {
  if (tier == "na") return "";
  switch (tier.toLowerCase()) {
    case "tier0":
      return USER_TIER0_SHORT_TEXT;
    case "tier1":
      return USER_TIER1_SHORT_TEXT;
    case "tier2":
      return USER_TIER2_SHORT_TEXT;
    case "tier3":
      return USER_TIER3_SHORT_TEXT;
    case "tier4":
      return USER_TIER4_SHORT_TEXT;
    default:
      return "";
  }
};

export const access_token_flow = (accessToken: any) => {
  if (
    accessToken &&
    accessToken !== "unidentified" &&
    accessToken !== "unidenfied"
  ) {
    cookie.set("accessToken", accessToken, { path: "/", sameSite: true, secure: true });
    setItem("accessToken", accessToken, "local");
    return true;
  } else return false;
};

function getUniqItemsArr({ arr, track = new Set(), id }: { arr: string[], track?: unknown, id: string }) {
  return arr.filter((a) =>
    // @ts-ignore
    track.has(a[id]) ? false : track.add(a[id])
  );
}

function scrollIntoView({ elementID = "" }) {

  if (!!elementID === false) return;

  const config = { behavior: "smooth" };

  // @ts-ignore
  document.getElementById(elementID).scrollIntoView(config);
  const scrolledY = window.scrollY;
  if (scrolledY) {
    window.scroll(0, scrolledY - 130);
  }
}

function isMobile() {
  return (
    global?.window?.matchMedia &&
    global?.window?.matchMedia('(max-width: 480px)')?.matches
  );
}

function getSourceInfo() {
  return isMobile() ? 'MWeb' : 'web';
}

export { getUniqItemsArr, scrollIntoView, getSourceInfo, isMobile }
