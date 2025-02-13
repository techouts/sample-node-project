import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BrandsGrid from "../components/BrandsGrid/BrandsGrid";
const color: ColorType = "#0000";

const brandsGridData = {
  id: 3,
  __component: "widget.brands-grid",
  bgColor: color,
  bgPadding: "3% 5%",
  contentImageUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Top_Brands_dcc7dddfe5.png",
  contentImageUrlMobile:
    "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Top_Brands_Mobile_84f472044f.png?updated_at=2022-10-03T14:23:49.866Z",
  contentImagePath: "/brand/faces-canada",
  bgImageUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/lipsticksgroup_12993b9cc1.png",
  bgMobileImageUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Top_Banrdsbg_Image_Msite_66128a17c8.png",
  button: "EXPLORE BRANDS",
  contentImageisNewTab: false,
  display: null,
  title: "",
  buttonPath: "",
  items: [
    {
      id: 19,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Estee_Lauder_b8afab62ba.png",
      imageUrlMobile:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Smashbox_bf109553e7.jpg",
      path: "/brand/faces-canada",
      isNewTab: false,
    },
  ],
  position: 6,
};

describe("Brands Grid", () => {
  it("renders a brands grid component", () => {
    const { container } = render(<BrandsGrid {...brandsGridData} />);
    expect(container).toMatchSnapshot();
  });
});
