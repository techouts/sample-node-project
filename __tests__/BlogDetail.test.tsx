import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogDetail from "../components/BlogDetail/BlogDetail";
const color: ColorType = "#0000";

const blogDetailData = {
  id: 3,
  __component: "blog-widget.blog-detail",
  button: "Makeup - Skin",
  bgColor: "#FFFFFF",
  bgPadding: "0 15%",
  arrowImageUrl: null,
  galleryButtonText: null,
  galleryImageUrl: null,
  numberOfViews: "5.2K Views",
  heading: "An Expert Approved Guide To Dreamy Wedding Makeup",
  subheading: "It’s that time of the year when it’s sunny and bright outside",
  name: "Zoya Dadarka",
  paragraph:
    '<div style="text-align:justify"><span style="color:#7B7979">Hello brides-to-be! Your much-awaited, most photographed day of your life is right around the corner—capturing everything from the decor and your stunning bridal ensembles to the venue and everything else in this mix. And while your dreamy, romantic wedding unfurls. To make sure we recommend the best from beauty, we spoke to Alok Sharma, trainer for the luxury makeup label Charlotte Tilbury about all the must-haves that every bride must consider for her D-day—whether you’re the bride-to-be or even just part of her brigade.</span></div>',
  keys: null,
  topButtonPath: "/beauty-stop/get-the-look",
  imageAltText: null,
  display: null,
  authorNamePath: null,
  bannerItems: [
    {
      id: 3,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Dreamy_Banner_f64b1f4b60.png",
      mobileImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/expert_approved_image1_8c82a1cecd.png?updated_at=2022-10-31T06:19:18.924Z",
      videoButtonImageUrl: null,
      videoUrl: null,
      arrowCarouselImageUrl: null,
      galleryCarouselButtonText: null,
      imgPath: "/beauty-stop/expert-approved",
      imageAltText: null,
      Item_name: null,
      Item_type: null,
    },
  ],
  galleryItems: [],
  position: 1,
};

describe("Blog Detail", () => {
  it("renders a blog detail component", () => {
    const { container } = render(<BlogDetail {...blogDetailData} />);
    expect(container).toMatchSnapshot();
  });
});
