import { ColorType } from "../../utility/ColorType";

export default interface BreadcrumbNavSchema {
  currentSlug?: string;
  initialSlug?:string;
  baseSlug?: string;
  bgColor?: string | ColorType;
  bgPadding?: string;
}
