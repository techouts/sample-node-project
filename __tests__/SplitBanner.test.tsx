import { render } from "@testing-library/react";
import SplitBanner from "../components/SplitBanner/SplitBanner";

const data = {
  id: 1,
  __component: "widget.split-banner",
  bgColor: "#FFFFFF",
  bgPadding: "",
  imageUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/clearane_Hd_New_255aa916ba.png",
  imageUrlMobile:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Clearance_Sale_Mobile_abe2bcf164.png",
  pathLeft: "https://www.google.com/",
  pathRight: "#",
  isNewTab: false,
  display: null,
  position: 1,
  Item_name: "",
  Item_type: "",
};

describe("Split Banner", () => {
  it("renders a split banner", () => {
    render(<SplitBanner {...data} />);
  });
});
