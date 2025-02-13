import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogAuthor from "../components/BlogAuthor/BlogAuthor";
const color: ColorType = "#0000";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type LIST_ITEMS = {
  imageUrl: string;
  title: string;
  subTitle: string;
  readMoreText: string;
  chiptext: string;
  viewText: string;
  ReadMorePath: string | URL;
  isSharable: boolean;
  position: boolean;
  isVideo: boolean;
};

export default interface BlogAuthorSchema {
  __component: string;
  id: string;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  title: string;
  position: number;
  items: LIST_ITEMS[];
  viewAllPath: string;
  viewAllText: string | URL;
  sortByBottom: boolean;
  Item_name: any;
  Item_type: any;
}

const blogAuthorData = {
  id: "1",
  __component: "blog-widget.blog-list",
  bgColor: "#FFFFFF",
  bgPadding: "0 5% 70px 5%",
  title: "",
  keys: "",
  viewAllText: "",
  viewAllPath: "",
  display: "",
  isComponent: "",
  desktopColumns: "",
  mobileColumns: "",
  sortByBottom: false,
  items: [
    {
      id: "1",
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/auhtormirror_828c966bc4.png",
      title: "Perfect palettes to light up your summer",
      subTitle:
        "It’s that time of the year when it’s sunny and bright outside, flowers are abloom and colours seem a lot ",
      readMoreText: "READ MORE",
      viewText: "Views",
      chiptext: "Beauty",
      readMorePath: "/beauty-stop/draw-your-eyebrows",
      isSharable: true,
      position: true,
      imgPath: "/beauty-stop/draw-your-eyebrows",
      videoUrl: "",
      imgUrlMobile:
        "https://images-cms.sit.shopper-stop.in/authormirror_image_mobile_10ce4f9c99.png",
      viewsIcon: "",
      shareIcon: "",
      shareText: "",
      views: "",
      isVideo: false,
      imageAltText: "",
      Item_name: "product",
      Item_type: "product",
      playIconUrlWeb: "",
      playIconUrlApp: "",
      ReadMorePath: "",
    },
  ],
  position: 3,

  Item_name: "",
  Item_type: "",
};

describe("Blog Author", () => {
  it("renders a blog author component", () => {
    const { container } = render(<BlogAuthor {...blogAuthorData} />);
    expect(container).toMatchSnapshot();
  });
});
