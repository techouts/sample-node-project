import { render } from "@testing-library/react";

import { ColorType } from "../utility/ColorType";
import TrendingStories from "../components/TrendingStories/TrendingStories";

const color: ColorType = "#0000";

const trendingStoriesData = {
  id: 1,
  __component: "blog-widget.blog-beauty-stop",
  bgColor: null,
  bgPadding: "0 8%",
  title: "TRENDING STORIES",
  subText: "5.2k",
  imageUrl:
    "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/The_Trending_Eyeliner_Styles_To_Copy_From_Instagram_Right_Now_1_90c7e9060d.jpg?updated_at=2022-08-22T09:37:09.357Z",
  cardTitle: "The Trending Eyeliner Styles To Copy From Instagram Right Now",
  cardDescription: "PS: The Fishtail liner is our favorite!",
  buttonText: "READ MORE",
  buttonPath:
    "https://maya-uat.ssecom.tech/beauty-stop/trending-eyeliner-styles-on-instagram",
  imgPath: "https://maya-uat.ssecom.tech/beauty-stop/hero-blogs",
  keys: null,
  display: null,
  viewMore: null,
  viewMorePath: "/beauty-stop/integrated-video",
  beautyButton: "Makeup",
  flag: false,
  shareIcon:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/share_Icon_895f141a62.png",
  shareText: "SHARE",
  viewIcon:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/eye_b1c6870559.png",
  views: "5.2K",
  viewsText: "Views",
  imageAltText: null,
  items: [
    {
      id: 1,
      title: "How To Use A Flat Iron Without Damaging Your Tresses",
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/How_To_Use_A_Flat_Iron_Without_Damaging_Your_tresses_f83271aacb.jpg?updated_at=2022-08-22T09:42:00.525Z",
      contentType: "Hair",
      subText: "READ MORE",
      viewsIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/eye_b1c6870559.png",
      viewsText: "Views",
      shareText: "SHARE",
      shareIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/eye_b1c6870559.png",
      path: "https://maya-uat.ssecom.tech/beauty-stop/hair-straightening-flat-ironing-tips",
      imgPath:
        "https://maya-uat.ssecom.tech/beauty-stop/hair-straightening-flat-ironing-tips",
      views: "5.2K",
      imageAltText: null,
      Item_name: "product",
      Item_type: "product",
    },
    {
      id: 2,
      title: "The Best Highlighters That You Can Spot From The Moon And Beyond",
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/The_Best_Highlighters_That_You_Can_Spot_From_The_Moon_cd9732cb47.jpg?updated_at=2022-08-22T09:43:22.109Z",
      contentType: "Makeup",
      subText: "READ MORE",
      viewsIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/eye_b1c6870559.png",
      viewsText: "Views",
      shareText: "SHARE",
      shareIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/share_Icon_895f141a62.png",
      path: "https://maya-uat.ssecom.tech/beauty-stop/best-highlighters-for-face",
      imgPath:
        "https://maya-uat.ssecom.tech/beauty-stop/best-highlighters-for-face",
      views: " 5.2K",
      imageAltText: null,
      Item_name: "product",
      Item_type: "product",
    },
    {
      id: 3,
      title: "The Best And The Worst Skin Brightening Ingredients",
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/The_Best_And_The_Worst_Skin_Brighteners_According_To_Dr_Apratim_Goel_cbebc531a0.jpg?updated_at=2022-08-22T09:48:52.622Z",
      contentType: "Skin",
      subText: "READ MORE",
      viewsIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/eye_b1c6870559.png",
      viewsText: "Views",
      shareText: "SHARE",
      shareIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/share_Icon_895f141a62.png",
      path: "https://maya-uat.ssecom.tech/beauty-stop/best-and-worst-skin-brightening-ingredients",
      imgPath:
        "https://maya-uat.ssecom.tech/beauty-stop/best-and-worst-skin-brightening-ingredients",
      views: "5.2K",
      imageAltText: null,
      Item_name: "product",
      Item_type: "product",
    },
  ],
  position: 4,
};

describe("Trending Stories ", () => {
  it("renders a trending stories  component", () => {
    const { container } = render(<TrendingStories {...trendingStoriesData} />);
    expect(container).toMatchSnapshot();
  });
});

