import { Cookies } from "react-cookie";

import useStorage from "./useStoarge";
const { getItem } = useStorage();
const cookie = new Cookies();

export const chatBotUtility = () => {
    return {
          uniqueHash: cookie.get("accessToken")
            ? process.env.NEXT_PUBLIC_OD_MESSANGER_AUTH_UNIQUE_HASH
            : process.env.NEXT_PUBLIC_OD_MESSANGER_UNIQUE_HASH,
          flowInitialAttributes: {
            prechat_Name: cookie.get("accessToken")
              ? getItem("customer_Name", "local")
              : "",
            prechat_PrimaryEmail: cookie.get("accessToken")
              ? getItem("customerEmailID", "local")
              : "",
            prechat_PrimaryMobile: cookie.get("accessToken")
              ? getItem("mobileNumber", "local")
              : "",
            prechat_ApiKey: `${process.env.NEXT_PUBLIC_OD_MESSANGER_PRE_CHAT_APIKEY}`,
            CI_13658: cookie.get("accessToken") ? cookie.get("accessToken") : "",
          },
        };
  };