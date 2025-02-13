import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogProfile from "../components/BlogProfie/BlogProfile";
const color: ColorType = "#0000";

const blogProfileData = {
  id: 1,
  __component: "blog-widget.blog-profile",
  bgColor: color,
  bgPadding: "0 5%",
  authorName: "Zoya Dadarkar",
  authorImage:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/profile_5ed572a70e.png",
  title: "Zoya Dadarka’s Blog",
  authorDescription:
    "A style and beauty enthusiast, I also love exploring new places, cuisines and cultures. In my free time you will find me watching reruns of Gossip Girl or blogging about anything that catches my eye.",
  keys: null,
  imageAltText: null,
  display: null,
  position: 1,
};

describe("blog profile", () => {
  it("renders a blog profile component", () => {
    const { container } = render(<BlogProfile {...blogProfileData} />);
    expect(container).toMatchSnapshot();
  });
});


