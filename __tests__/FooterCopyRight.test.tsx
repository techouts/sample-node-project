import { render } from "@testing-library/react";
import FooterCopyRights from "../components/FooterCopyRights/FooterCopyRights";

const data = {
  id: 1,
  title: "© ShoppersStopBeauty. 2022. All Rights Reserved.",
  bgColor: "#FFFFFF",
  bgPadding: "2% 4% 5% 4%",
  items: [
    {
      id: 1,
      title: "Privacy Policy",
      path: "#",
    },
    {
      id: 2,
      title: "Terms & Conditions",
      path: "#",
    },
    {
      id: 3,
      title: "Disclaimer",
      path: "#",
    },
  ],
};

describe("Footer Copy Rights", () => {
  it("renders a footer copyrights", () => {
    render(<FooterCopyRights {...data} />);
  });
});
