import { render } from "@testing-library/react";
import FooterPayment from "../components/FooterPayment/index";

import { ColorType } from "../utility/ColorType";

export default interface FooterPaymentInterface {
  id: number;
  __component: string;
  bgColor: ColorType | string;
  bgPadding: string;
  items: List_items[];
}
export interface List_items {
  id: number;
  title: string;
  imageUrl: string | null;
  imagePath: URL | string;
  subText: string;
  subTextMobile: string;
  isNewTab: boolean | null;
  secondImageUrl: string;
  secondImageUrlPath: string;
}

const data = {
  id: 1,
  __component: "widget.footer-payment",
  bgColor: "#F5F5F5",
  bgPadding: "0 5%",
  items: [
    {
      id: 1,
      title: "PAY SECURELY WITH",
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/payment_Visa_00c510afb2.png",
      imagePath: "#",
      subText: "",
      isNewTab: false,
      secondImageUrl: "",
      secondImageUrlPath: "",
      subTextMobile: "",
    },
  ],
};

describe("Footer Payment", () => {
  it("renders a footer payment", () => {
    render(<FooterPayment {...data} />);
  });
});
