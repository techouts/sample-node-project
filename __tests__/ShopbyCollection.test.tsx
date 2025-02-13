import { render } from "@testing-library/react";
import ShopByCollection from "../components/ShopByCollection/ShopByCollection";

const data = {
  id: 1,
  __component: "widget.quick-links",
  bgColor: "#FFFFFF",
  bgPadding: "5%",
  title: "TOP CATEGORIES FOR YOU",
  display: null,
  items: [
    {
      id: 1,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Clarins_28600236b2.png",
      text: "Best Sellers",
      path: "#",
    },
    {
      id: 2,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/New_Arrivals_Hd_Category_986c7a1913.png",
      text: "New Arrivals",
      path: "#",
    },
    {
      id: 3,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Revlon_18fbf1c936.png",
      text: "Make Up",
      path: "/category/makeup",
    },
    {
      id: 4,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Cream_8cd9cd5ad5.png",
      text: "Skin",
      path: "#",
    },
    {
      id: 5,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Coconut_eb6e0c08e9.png",
      text: "Hair",
      path: "#",
    },
  ],
  mobileItems: [
    {
      id: 7,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Clarins_28600236b2.png",
      text: "Best Sellers",
      path: "#",
    },
    {
      id: 8,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/New_Arrivals_8a07bf8ed7.png",
      text: "New Arrivals",
      path: "#",
    },
    {
      id: 9,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Revlon_18fbf1c936.png",
      text: "Make Up",
      path: "/category/makeup",
    },
    {
      id: 10,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Cream_8cd9cd5ad5.png",
      text: "Skin",
      path: "#",
    },
    {
      id: 11,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Coconut_eb6e0c08e9.png",
      text: "Hair",
      path: "#",
    },
    {
      id: 136,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Natural_90be53a8f5.png",
      text: "Natural",
      path: "#",
    },
  ],
};

describe("Shob By Collection", () => {
  it("renders a shop by collection component", () => {
    render(<ShopByCollection {...data} />);
  });
});
