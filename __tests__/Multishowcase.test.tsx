import { render } from "@testing-library/react";
import MultiShowcase from "../components/MulitShowcase/MultiShowcase";

const data = {
  id: 1,
  __component: "widget.multi-show-case",
  bgColor: "#F4F4F4",
  bgPadding: "2% 5%",
  title: "CATEGORY IN FOCUS",
  contentImageUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Olay_Desktop_32eb751974.png",
  contentImageUrlMobile:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/olay_eaa317a9cb.png",
  contentLeft: false,
  display: null,
  zigzag: true,
  textColor: "",
  path: "",
  position: 1,
  items: [
    {
      id: 1,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/olay1large_163dc2b2cb.png",
      text: "Shop Now",
      path: "#",
      isNewTab: null,
      imageMobileUrl: "",
      Item_name: "",
      Item_type: "",
    },
  ],
};

describe("Multi Show Case", () => {
  it("renders a multi show case", () => {
    render(<MultiShowcase {...data} />);
  });
});
