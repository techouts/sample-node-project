import { ColorType } from "../../utility/ColorType";

export default interface ConsultationHeadingSchema {
  title: string;
  subTitle: string;
  bgColor: string | ColorType;
  bgPadding: string;
}
