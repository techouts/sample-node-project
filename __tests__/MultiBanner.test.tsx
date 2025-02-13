import { render } from "@testing-library/react";
import MultiBanner from "../components/MultiBanner/MultiBanner";

const data = {
  id: 1,
  __component: "widget.multi-banner",
  bgColor: "#F7F6F9",
  bgPadding: "2% 5%",
  columns: 2,
  title: "TRENDING STORES",
  display: null,
  ctaLabel: null,
  ctaLabelUrl: "",
  position: 1,
  index: 1,
  items: [
    {
      id: 4,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/We_Love_Make_Up_488f4055b0.png",
      imageUrlMobile:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Makeup_Mobile_091b13f5a3.png",
      path: "#",
      isNewTab: false,
      Item_name: "",
      Item_type: "",
      altText: "",
    },
  ],
};

describe("Multi Banner", () => {
  it("renders a Multi Banner", () => {
    render(<MultiBanner {...data} />);
  });
});
