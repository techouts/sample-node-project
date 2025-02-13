import { render } from "@testing-library/react";
import BeautyShop from "../components/BeautyShopCarousel/BeautyShop";
import { ColorType } from "../utility/ColorType";

const color: ColorType = "#0000";

const data = {
  id: 2,
  __component: "widget.beauty-stop",
  bgColor: color,
  bgPadding: "2% 11%",
  arrowImageUrl: "string",

  title: "THE BEAUTY STOP",
  subText:
    "With SSBeauty, you can now hear makeup advice, tips & tricks, straight from the experts. From articles to video consults, we have it all!",
  imageUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Beautymain_Image_29aea9f8be.png",
  cardTitle:
    "Why it’s important to switch to Earth Friendly Why it’s important to switch to Earth Friendly",
  cardDescription:
    "With SSBeauty, you can now hear makeup advice, tips & tricks, straight from the experts.",
  buttonText: "READ MORE",
  buttonPath: "/blog/home",
  display: null,
  contentType: null,
  viewMore: null,
  beautyButton: null,

  galleryButtonText: "string",
  gallerImageUrl: "",
  componentName: "string",
  position: 1,
  subheading: "string",
  heading: "string",
  galleryItems: [],
  items: [
    {
      id: 4,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Beauty1_59ae38b2ac.png",
      contentType: "video",
      title: "The perfect pre-wedding skincare routine everyday",
      subText:
        "With SSBeauty, you can now hear makeup advice,  tips & tricks, straight from the experts.",
      viewsIcon: null,
      viewsText: null,
      shareText: null,
      shareIcon: null,
      path: null,
    },
  ],
};

describe("Beauty Shop", () => {
  it("renders a beauty shop", () => {
    render(<BeautyShop {...data} />);
  });
});
