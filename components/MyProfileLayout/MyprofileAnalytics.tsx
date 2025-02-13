
import triggerGAEvent from "../../utility/GaEvents";

export const callEventMyProfile = (
  data: any,
  dob?:any
) => {
  triggerGAEvent(
    {
      link_text:"MAKE CHANAGES",
      link_url: "na",
      user_mail_id: data?.emailChange,
      gender: data?.gender,
      user_birth_date: dob,
      user_last_name: data?.lastName,
      user_first_name: data?.firstName,
    },
    "save_user_info"
  );
};
