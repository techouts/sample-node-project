import { render } from "@testing-library/react";
import SingleBanner from "../components/SingleBanner/SingleBanner";

const data = {
  id: 1,
  __component: "widget.single-banner",
  bgColor: "#ffffff",
  bgPadding: "0% 5%",
  imageUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Clarins_Single_4079ce56e9.png",
  imageUrlMobile:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Clarins_HD_Mobile_0d6afba1c7.png",
  path: "home",
  isNewTab: true,
  display: null,
  position: 1,
  Item_name: "",
  Item_type: "",
};

describe("Single Banner", () => {
  it("renders a single banner", () => {
    render(<SingleBanner {...data} />);
  });
});
