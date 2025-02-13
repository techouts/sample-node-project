import { Cookies } from "react-cookie";
import triggerGAEvent from "./GaEvents";

export const callOpenScreenEvent = (details: any) => {
 const cookie = new Cookies();
  triggerGAEvent(
    {
      event_type: "open_screen",
      user_phone_number: `+91${localStorage.getItem("mobileNumber")}`,
      user_mail_id: details?.userEmail || "na",
      user_pin_code: details?.pincode,
      user_state: details?.state,
      user_city: details?.city,
      user_birth_date: details?.dob || "na",
      user_last_name: details?.customerName?.split(" ")?.[1] || "na",
      user_first_name: details?.customerName?.split(" ")?.[0] || "na",
      fc_status: details?.primaryCardNumber == "na" ? "Not Activated" : "Activated",
      fc_points: "na",
      fc_card_number: details?.primaryCardNumber || "na",
      fc_card_validity: localStorage.getItem("fcValidDate") || "na",
      user_type: cookie.get("accessToken") ? "Registerd" : "Guest",
      wallet_status: details?.walletNumber == "na" ?"Not Activated" : "Activated" ,
      wallet_amount: 0,
    },
    "open_screen",
    "",
    "Launch"
  );
};
