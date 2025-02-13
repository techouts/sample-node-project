import { render } from "@testing-library/react";

import { ColorType } from "../utility/ColorType";
import CategoryCarousel from "../components/CategoryCarousel/CategoryCarousel";

const color: ColorType = "#0000";

const categoryCarouselData = {
  id: 1,
  __component: "widget.shop-look",
  titleForWeb: "Shop the look",
  titleForMobile: "Shop The Look",
  shopButton: "SHOP ALL MAKEUP",
  shopButtonPath: "/home",
  bgColor: color,
  bgPadding: "3% 5% 2.5%",
  items: [
    {
      title: "",
      subTitle: "",
      imageUrlMobile: "",
      path: "",
      isNewTab: false,
      position: 1,
      id: 1,
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/shoplook_image1_88b8165a12.png",
      plusImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/plusimage_c556b31299.png",
      circleImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/circleimage_ad012acb93.png",
      number: "0",
      identifier: null,
      products: {
        items: [
          {
            sku: "9277945",
            parent_sku: "9277944",
          },
          {
            sku: "206911736",
            parent_sku: "206911736_base",
          },
        ],
      },
      mobileImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/shoplook_image1_88b8165a12.png",
      subItems: [
        {
          id: 1,
          key: "plusOne",
          tooltipMsg: "Forehead",
          tooltipPlacement: "right",
          top: "3.4%",
          left: "9.6%",
          products: '"7866510","206146180"',
          path: null,
          mobileTopPosition: null,
          mobileLeftPosition: null,
        },
        {
          id: 2,
          key: "plusTwo",
          tooltipMsg: "Eyebrows",
          tooltipPlacement: "right",
          top: "8.2%",
          left: "8%",
          products: null,
          path: null,
          mobileTopPosition: null,
          mobileLeftPosition: null,
        },
        {
          id: 3,
          key: "plusThree",
          tooltipMsg: "Cheeks",
          tooltipPlacement: "right",
          top: "10.8%",
          left: "10.2%",
          products: null,
          path: null,
          mobileTopPosition: null,
          mobileLeftPosition: null,
        },
        {
          id: 4,
          key: "plusFour",
          tooltipMsg: "Lips",
          tooltipPlacement: "right",
          top: "12.6%",
          left: "6.6%",
          products: null,
          path: null,
          mobileTopPosition: null,
          mobileLeftPosition: null,
        },
        {
          id: 5,
          key: "plusFive",
          tooltipMsg: "Chin",
          tooltipPlacement: "right",
          top: "15%",
          left: "8%",
          products: null,
          path: null,
          mobileTopPosition: null,
          mobileLeftPosition: null,
        },
      ],
    },
  ],
  position: 27,
  bgpadding: "",
  bgImageUrl: "",
  title: "",
};

describe("Category Carousel ", () => {
  it("renders a category carousel  component", () => {
    const { container } = render(
      <CategoryCarousel {...categoryCarouselData} />
    );
    expect(container).toMatchSnapshot();
  });
});
