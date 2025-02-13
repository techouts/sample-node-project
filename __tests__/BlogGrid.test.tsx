import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogGrid from "../components/BlogGrid/BlogGrid";
const color: ColorType = "#0000";
const blogGridData = {
  id: 3,
  __component: "blog-widget.blog-grid",
  bgColor: color,
  bgPadding: "0 15%",
  Maintext: "YOU MAY ALSO LIKE",
  keys: null,
  display: null,
  items: [
    {
      id: 9,
      imageUrl:
        "http://images-cms.sit.shopper-stop.in/makeup_kits_image_9d2532530b.png",
      mobileImageUrl:
        "http://images-cms.sit.shopper-stop.in/makeup_kits_image_9d2532530b.png",
      buttonText: "Beauty",
      eyeLogo:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/eye_b1c6870559.png",
      views: "5.2K ",
      viewsText: "Views",
      headText: "The Perfect Pre-Wedding Skincare routine everyday",
      readText: "READ MORE",
      shareLogo:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/share_Icon_895f141a62.png",
      shareText: "SHARE",
      imgPath: "/blog/dreamy-wedding-makeup",
      path: "/blog/dreamy-wedding-makeup",
      imageAltText: null,
      Item_name: null,
      Item_type: null,
    },
  ],
  position: 9,
  imageAltText: "",
};

describe("Blog Grid", () => {
  it("renders a blog grid component", () => {
    const { container } = render(<BlogGrid {...blogGridData} />);
    expect(container).toMatchSnapshot();
  });
});


