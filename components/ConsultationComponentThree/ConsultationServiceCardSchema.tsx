import { ColorType } from "../../utility/ColorType";

export type SERVICE_ITEMS = {
  title: string;
  subTitle: string;
  imgUrl: string;
  freeText: string;
  selectedItem: string;
  trailText: string;
  identifier?: string;
};

export default interface ConsultationServiceCardSchema {
  title: string;
  position:any;
  bgColor: string | ColorType;
  bgPadding: string;
  items: SERVICE_ITEMS[];
}
