import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogLinksComponent from "../components/BlogLinks/BlogLinksComponent";
const color: ColorType = "#0000";

const blogLinksComponentData = {
  id: 2,
  __component: "blog-widget.blog-links",
  title: "HAIR",
  viewMore: "VIEW ALL",
  bgColor: color,
  bgPadding: "0 5%",
  keys: null,
  viewMorePath: "/beauty-stop/integrated-video",
  display: null,
  items: [
    {
      id: 5,
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/How_to_get_a_salon_like_blowout_at_home_53836d3d0a.jpg?updated_at=2022-08-23T05:55:07.650Z",
      mobileImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/How_to_get_a_salon_like_blowout_at_home_53836d3d0a.jpg?updated_at=2022-08-23T05:55:07.650Z",
      buttonText: "Hair",
      noOfViews: "5.2k",
      viewsIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/eye_b1c6870559.png",
      subText: "Perfect Hair Every Day Is Possible",
      text: "How to Do a Salon Blowout at Home Perfectly",
      shareText: "SHARE",
      shareIcon:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/share_Icon_895f141a62.png",
      readMore: "READ MORE",
      viewsText: "Views",
      path: new URL(
        "https://maya-uat.ssecom.tech/beauty-stop/blowout-hair-drying-tips"
      ),
      imgPath: new URL(
        "https://maya-uat.ssecom.tech/beauty-stop/blowout-hair-drying-tips"
      ),
      imageAltText: "",
      Item_name: "product",
      Item_type: "product",
      position: 1,
      __component: "",
      componentName: "",
      itemPosition: "",
      viewMore: "",
    },
  ],
  position: 12,
};

describe("Blog Links Component", () => {
  it("renders a blog links component ", () => {
    const { container } = render(
      <BlogLinksComponent {...blogLinksComponentData} />
    );
    expect(container).toMatchSnapshot();
  });
});


