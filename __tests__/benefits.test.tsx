import { render } from "@testing-library/react";
import Benefits from "../components/Benefits/Benefits";

const data = {
  id: 3,
  __component: "widget.benefits",
  bgColor: "#F5F5F5",
  bgPadding: "0 5%",
  title: "string",
  backEndItems: [],
  display: null,

  items: [
    {
      id: 9,
      imageUrl:
        "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/easy_exchange_f53f9f32bb.png",
      text: "Easy exchange & return",
      subText: null,
      textColor: "#231F20",
      imageURL: "",
      path: "",
      description: "string",

      icon: "string",
      iconText: "",
    },
  ],
};

describe("Benefits", () => {
  it("renders a benefits component ", () => {
    render(<Benefits {...data} />);
  });
});
