import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogCarouselComponent from "../components/BlogCarousel/BlogCarouselComponent";
const color: ColorType = "#0000";
const blogCarouselComponentData = {
  id: 1,
  __component: "blog-widget.blog-carousel",
  title: "EDITOR'S PICKS",
  button: "",
  buttonPath: new URL("/beauty-stop/draw-your-eyebrows"),
  bgColor: color,
  bgPadding: "0 2%",
  keys: null,
  display: null,

  items: [
    {
      id: 5,
      mobileImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Beauty_Editor_Approved_Makeup_Trends_To_Try_This_Season_5888eb0d88.jpg?updated_at=2022-08-22T10:05:45.262Z",
      buttonText: "Makeup",
      noOfViews: "5.2K ",
      heading: "Beauty Editor-Approved Makeup Trends To Try This Season",
      text: "READ MORE",
      subText: "Number three is our favorite",
      shareText: "SHARE",
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Beauty_Editor_Approved_Makeup_Trends_To_Try_This_Season_5888eb0d88.jpg?updated_at=2022-08-22T10:05:45.262Z",
      viewsIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/eye_b1c6870559.png",
      shareIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/share_Icon_895f141a62.png",
      path: new URL(
        "https://maya-uat.ssecom.tech/beauty-stop/latest-beauty-makeup-trends"
      ),
      viewsText: "Views",
      imgPath: new URL(
        "https://maya-uat.ssecom.tech/beauty-stop/latest-beauty-makeup-trends"
      ),
      imageAltText: "",
      Item_name: "product",
      Item_type: "product",
      __component: "",
      componentName: "",
      items: "",
      position: 1,
    },
  ],
  imageUrl: "",
  mobileImageUrl: "",
  buttonText: "",
  noOfViews: "",
  heading: "",
  text: "",
  shareText: "",
  subText: "",
  position: 1,
};

describe("Blog Carousel Component", () => {
  it("renders a blog carousel component component", () => {
    const { container } = render(
      <BlogCarouselComponent {...blogCarouselComponentData} />
    );
    expect(container).toMatchSnapshot();
  });
});

