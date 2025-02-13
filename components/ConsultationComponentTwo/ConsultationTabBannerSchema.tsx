import { ColorType } from "../../utility/ColorType";

export type BANNER_ITEMS = {
  id: number;
  icon: string;
  iconText: string;
  mobileIcon: string;
};

export default interface ConsultationTabBannerSchema {
  bgColor: string | ColorType;
  bgPadding: string;
  title: string;
  items: BANNER_ITEMS[];
}
