import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BeautyShots from "../HOC/BeautyShots/BeautyShots";
const color: ColorType = "#0000";

const beautyShotsData = {
  id: 1,
  __component: "blog-widget.blog-beauty-shots",
  bgColor: "#4F4C4D",
  bgPadding: "40px 0px 30px 0px",
  title: "BEAUTY SHOTS",
  buttonText: "View All",
  viewMore: true,
  buttonPath: "/miscs/videos-all",
  keys: "",
  display: "",
  items: [
    {
      id: 2,
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Trend_To_Try_Glazed_Donut_Skin_d4c63e8fa6.jpg?updated_at=2022-09-29T12:24:15.789Z",
      content: "Trend To Try: Glazed Donut Skin",
      videoUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/5_Trend_To_Try_Glazed_Donut_Skin_3f1a2bac40.mov?updated_at=2022-09-13T10:22:16.670Z",
      path: "/beauty-stop/integrated-video",
      imageAltText: "",
      playIconUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/play_Icon_c06161a3b9.png",
      Item_name: "product",
      Item_type: "product",
    },
  ],
  frame: {
    id: 1,
    frameWidth: "521px",
    frameHeight: "525px",
    frameWidthMobile: "328px",
    frameHeightMobile: "330px",
    Item_name: null,
    Item_type: null,
  },
  position: 6,
  imageAltText: "",
};

describe("Beauty Shots", () => {
  it("renders a beauty shots component", () => {
    const { container } = render(<BeautyShots {...beautyShotsData} />);
    expect(container).toMatchSnapshot();
  });
});


