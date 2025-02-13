import { render } from "@testing-library/react";

import { ColorType } from "../utility/ColorType";
import SingleButton from "../HOC/Button/SingleButton";
const color: ColorType = "#0000";

const singleButtonData = {
  id: 10,
  __component: "widget.button",
  bgColor: color,
  height: "15px",
  display: "web",
  position: 24,
  bgPadding: "",
  btnText: "",
  btnTextColor: color,
  backgroundColor: color,
  path: "",
  btnPosition: "",
  fontSize: "",
  lineHeight: "",
  mobileFontSize: "",
};

describe("Single Button", () => {
  it("renders a single button component", () => {
    const { container } = render(<SingleButton {...singleButtonData} />);
    expect(container).toMatchSnapshot();
  });
});
