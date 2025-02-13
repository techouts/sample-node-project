import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogParagraph from "../components/BlogParagraph/BlogParagraph";
const color: ColorType = "#0000";

const blogParagraphData = {
  id: 2,
  __component: "blog-widget.blog-paragraph",
  bgColor: "#FFFFFF",
  bgPadding: "0 15%",
  title:
    '<h3 style="color:#AD184C;display: inline-block;font-weight:600">Beauty Shop: What’s the one thing all brides must keep in mind before starting their makeup?</h3><div style="font-size: 6px">&nbsp;</div><div style="text-align:justify"><span style="color:#7B7979;font-weight:600">Navya: </span><span style="color:#7B7979">I like to prep the skin before I apply the base with Charlotte’s Magic Cream. It immediately plumps up the skin and makes it ready for makeup. Next, I use the Hollywood Filter as a primer. It’s a beautiful, innovative product that adds a ‘megawatt glow’ to your skin and makes the perfect base for your foundation.  My go-to foundation is the Airbush Flawless foundation. With Charlotte Tilbury’s ‘magic matrix of ingredients’ (that includes Replexium, MossCellTec no. 1, and AirCool,  all patented by CT), this foundation is weightless, and hydrating that makes your skin look fresh and perfect. </span></div>\n',
  keys: "",
  display: "null",
  position: 3,
  viewsText: "",
  flag: false,
  description: [
    {
      id: 1,
      imageUrl: "",
      contentType: "",
      title: "",
      subText: "",
      path: "",
      viewsIcon: "",
      viewsText: "",
      shareText: "",
      shareIcon: "",
      position: 1,
      Item_name: "",
      Item_type: "",
    },
  ],
  data: {
    quote: "",
  },
  subText: "",
  imageUrl: "",
  cardTitle: "",
  cardDescription: "",
  buttonText: "",
  buttonPath: "",
  contentType: "",
  viewMore: "",
  beautyButton: "",
  items: [],
  Item_type: "",
  Item_name: "",
};

describe("Blog Paragraph", () => {
  it("renders a blog paragraph component", () => {
    const { container } = render(<BlogParagraph {...blogParagraphData} />);
    expect(container).toMatchSnapshot();
  });
});

