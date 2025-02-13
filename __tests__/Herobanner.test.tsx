import { render, screen } from "@testing-library/react";
import HeroBanner from "../components/HeroBanner/HeroBanner";

const data = {
  id: 1,
  __component: "widget.hero-banner",
  bgColor: "#ffffff",
  bgPadding: "0% 5%",
  autoPlay: true,
  controlType: "dots",
  display: null,
  items: [
    {
      id: 1,
      imageUrl: "https://ik.imagekit.io/qtkdx44zm/Banner1_ed64c45f0f.png",
      imageUrlMobile:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Hero_Banner_Msite3_23b7e87112.png",
      path: "#homeBanner",
      isNewTab: true,

      Item_name: "string",
      Item_type: "",
      imageName: "",
      __component: "",
      altText: "",
    },
    {
      id: 2,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Banner2_daca19af17.png",
      imageUrlMobile:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Hero_Banner_Msite2_6950754303.png",
      path: "#",
      isNewTab: true,
    },
    {
      id: 3,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Banner3_da8b474a25.png",
      imageUrlMobile:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Herobanner_M_Site1_92a87c6812.png",
      path: "#",
      isNewTab: true,
    },
    {
      id: 47,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Banner2_daca19af17.png",
      imageUrlMobile:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Hero_Banner_Msite2_6950754303.png",
      path: "#",
      isNewTab: true,
    },
  ],
};
describe("Hero", () => {
  it("renders a Hero", () => {
    render(<HeroBanner {...data} />);
  });

  test("Logo must be present", () => {
    render(<HeroBanner {...data} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", data?.items[0]?.imageUrl);
    expect(image).toHaveAttribute("alt", "imageUrl");
  });
});
