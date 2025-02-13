import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import ShopByLuxury from "../components/ShopByLuxury/ShopByLuxury";
const color: ColorType = "#0000";

const shopByLuxuryData = {
  id: 3,
  __component: "widget.shop-by-luxury",
  bgColor: color,
  bgPadding: "3% 5%",
  title: "EXPERIENCE LUXURY",
  titleColor: "#FFFFFF",
  display: null,
  items: [
    {
      id: 9,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Experience_Lux1_4df3d329a8.png",
      text: "Bestseller Starting At Rs 1,540 ",
      path: "/brand/faces-canada",
      isNewTab: false,
      textBgColor: color,
      border: "",
      title: "string",
      position: 12,
      __component: "string",
    },
  ],
  position: 12,
};

describe("Shop By Luxury ", () => {
  it("renders a shop by luxury component", () => {
    const { container } = render(<ShopByLuxury {...shopByLuxuryData} />);
    expect(container).toMatchSnapshot();
  });
});
