import { render } from "@testing-library/react";
import QuickLinks from "../components/QuickLinks/QuickLinks";

const quickLinksData = {
  id: 1,
  __component: "widget.quick-links",
  bgColor: "#FFFFFF",
  bgPadding: "0% 5%",
  title: "TOP CATEGORIES FOR YOU",
  display: null,
  items: [
    {
      id: 1,
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/cmsimages.ssbeauty.in/eyeliners_desktop_b975059c2b.jpg?updated_at=2022-10-14T07:00:54.264Z",
      text: "Eyeliners",
      path: "/makeup/eyes/eyeliner/c/5?category_id=25",
      Item_name: "",
      Item_type: "",
      isNewTab: null,
    },
  ],
  mobileItems: [
    {
      id: 7,
      imageUrl:
        "https://s3.ap-south-1.amazonaws.com/cmsimages.ssbeauty.in/eyeliners_app_93915f1b3f.jpg?updated_at=2022-10-14T07:02:41.854Z",
      text: "Eyeliners",
      path: "/makeup/eyes/eyeliner/c/5?category_id=25",
      Item_name: "",
      Item_type: "",
      isNewTab: null,
    },
  ],
  position: 11,
};

describe("Quick Links", () => {
  it("renders Quick Links static page and creates a snapshot of the page", () => {
    const { container } = render(<QuickLinks {...quickLinksData} />);

    expect(container).toMatchSnapshot();
  });
});
