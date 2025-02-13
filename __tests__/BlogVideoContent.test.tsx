import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogVideoContent from "../components/BlogVideos/BlogVideoContent";
const color: ColorType = "#0000";

const blogVideoContentData = {
  id: 1,
  __component: "blog-widget.blog-videos",
  bgColor: "",
  bgPadding: "0 15%",
  isLarge: true,
  keys: null,
  display: null,
  items: [
    {
      text: "",
      imageUrl: "",
      mobileImageUrl: "",
      videoButtonImageUrl: "",
      videoUrl: "",
      ContentText: "",
    },
  ],
  position: 3,
  isLargetype: false,
};

describe("Blog Video Content", () => {
  it("renders a blog video content component", () => {
    const { container } = render(
      <BlogVideoContent {...blogVideoContentData} />
    );
    expect(container).toMatchSnapshot();
  });
});




