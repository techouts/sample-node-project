import { ColorType } from "../../utility/ColorType";

export type LIST_ITEMS = {
  id: number;
  imageUrl: string;
  heading: string;
  subHeading: string;
  readMoreButton: string;
  beautyButton: string;
  shareText: string;
  viewsText: string;
  numberOfViews: string | number;
};
export default interface TrendingStoriesInterface {
  title: string;
  bgColor: string | ColorType;
  bgPadding: string;
  viewAllButton: string;
  listItems: LIST_ITEMS[];
  id: number;
  imageUrl: string;
  heading: string;
  subHeading: string;
  readMoreButton: string;
  beautyButton: string;
  shareText: string;
  viewsText: string;
  numberOfViews: string;
}
