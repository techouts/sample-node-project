import { render } from "@testing-library/react";

import { ColorType } from "../utility/ColorType";
import HOCTitle from "../HOC/Button/SingleButton";

const color: ColorType = "#0000";

const hocTitleData = {
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

describe("HOC Title", () => {
  it("renders a hoc title component", () => {
    const { container } = render(<HOCTitle {...hocTitleData} />);
    expect(container).toMatchSnapshot();
  });
});
