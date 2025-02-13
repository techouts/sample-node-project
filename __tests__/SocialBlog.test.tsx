import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import SocialBlog from "../components/SocialBlog/SocialBlog";
const color: ColorType = "#0000";

const socialBlogData = {
  id: "",
  __component: "blog-widget.blog-benefits",
  title: "",
  bgColor: "#ffffff",
  bgPadding: "0 15%",
  keys: null,
  display: null,
  enableJumplinks: false,
  description: "",
  items: [
    {
      id: 6,
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/Rectangle_3895_430fdac69f.png",
      mobileImageurl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/expert_approved_image3_523aab3b67.png?updated_at=2022-10-31T06:19:19.486Z",
      shadowImage:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/shad_47a43a5868.png",
      subTitle:
        '<h2 style="color:#AD184C">Beauty Shop: What’s your go-to base for a bride?</h2>',
      description:
        '<div style="text-align:justify"><span  style="font-weight:600">Navya: </span>I like to prep the skin before I apply the base with Charlotte’s Magic Cream. It immediately plumps up the skin and makes it ready for makeup. Next, I use the Hollywood Filter as a primer. It’s a beautiful, innovative product that adds a ‘megawatt glow’ to your skin and makes the perfect base for your foundation.  My go-to foundation is the Airbush Flawless foundation. With Charlotte Tilbury’s ‘magic matrix of ingredients’ (that includes Replexium, MossCellTec no. 1, and AirCool, all patented by CT), this foundation is weightless, and hydrating that makes your skin look fresh and perfect.</span></div>',
      imageDirection: false,
      path: "",
      embedText: "",
      showEmbed: false,
      imageAltText: "",
      Item_name: "Product",
      Item_type: "product",
      headingLevel: "",

      title: "",

      enableJumplinks: false,
    },
  ],
  position: 7,

  imageDirection: false,
  headingLevel: "",
  imageUrl: "",
};

describe("Social Blog", () => {
  it("renders a social blog component", () => {
    const { container } = render(<SocialBlog {...socialBlogData} />);
    expect(container).toMatchSnapshot();
  });
});

