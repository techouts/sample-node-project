import { render } from "@testing-library/react";

import { ColorType } from "../utility/ColorType";
import CategoryShop from "../components/CategoryShop/CategoryShop";

const color: ColorType = "#0000";

const categoryShopData = {
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
      number: 1,
      id: 1,
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/shoplook_image1_88b8165a12.png",
      plusImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/plusimage_c556b31299.png",
      circleImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/circleimage_ad012acb93.png",
      identifier: "",
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
          path: "",
          mobileTopPosition: "",
          mobileLeftPosition: "",
        },
      ],
    },
  ],
  position: "27",
};

describe("Category Shop", () => {
  it("renders a category shop  component", () => {
    const { container } = render(<CategoryShop {...categoryShopData} />);
    expect(container).toMatchSnapshot();
  });
});
