import { render } from "@testing-library/react";
import BuyingGuides from "../components/BuyingGuides/BuyingGuides";
import { ColorType } from "../utility/ColorType";
const color: ColorType = "#0000";

const items = [
  {
    id: 1,
    imageUrl:
      "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Mask_Group_541093de18.png",
    text: "The art of applying eye shadow and choosing the correct color palette",
    textColor: color,
    subText: "",
    subTextColor: color,
    offerBackground: color,
    path: "/category/makeup",
    isNewTab: false,
    videoUrl: "",
    mobileTitle: "Palette and eyeshdow",
    Item_name: "Promotion",
    Item_type: "promotion",
    offerText: "",
    smallText: "",
    isNewtab: false,
  },
];

const buyingGuidesData = {
  id: 1,
  __component: "widget.grid-carousel",
  bgColor: "#FFFFFF",
  bgPadding: "0 5% 3%",
  title: "BUYING GUIDES",
  titleColor: color,
  showTextOnHover: "",
  showGradient: "",
  itemBackgroundSpacing: "",
  itemPaddingBottom: "",
  itemPaddingX: "",
  desktopColumns: 3,
  mobileColumns: 3,
  viewMore: "VIEW ALL",
  viewMoreLink: "/category/makeup",
  topViewMore: "",
  isBgColor: false,
  marginLeft: "",
  display: "",
  carouselDots: "",
  mobileItems: items,
  cardBorder: false,

  items: items,
  position: 21,
};
describe("Buying Guide", () => {
  it("renders Buying Guide static page and creates a snapshot of the page", () => {
    const { container } = render(<BuyingGuides {...buyingGuidesData} />);

    expect(container).toMatchSnapshot();
  });
});
