import { render } from "@testing-library/react";
import FooterSubscribe from "../components/FooterSubscribe/FooterSubscribe";

const data = {
  id: 1,
  __component: "widget.footer-subscribe",
  bgColor: "#F5F5F5",
  bgPadding: "2% 5%",
  facebookIconUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/facebook_0d0e547249.png",
  facebookIconPath: "#",
  twitterIconUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Twitter_Icon_1_160b0a8774.png",
  twitterIconPath: "#",
  instagramIconUrl:
    "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Instagram_Icon_undefined_1_01611cdaf4.png",
  instagramIconPath: "#",
  subscribeText: "SUBSCRIBE TO OUR EMAILS",
  ctaLabel: "SUBSCRIBE",
};

describe("Footer Subscribe", () => {
  it("renders a footer subscribe", () => {
    render(<FooterSubscribe {...data} />);
  });
});
